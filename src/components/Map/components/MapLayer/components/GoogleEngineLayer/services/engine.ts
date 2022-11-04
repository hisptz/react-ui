import ee from "@google/earthengine";
import L from "leaflet";

const getZIndex = (index: number) => 200 + index * 10;

const googleEngineKeyQuery = {
  token: {
    resource: "tokens/google",
  },
};

export interface EarthEngineOptions {
  id: string;
  url: string;
  legend: any;
  tokenType: "Bearer";
  aggregation: "sum" | "mean" | "mosaic";
  popup: string;
  engine: any;
}

export const EarthEngine = L.LayerGroup.extend({
  createPane(map: L.Map) {
    const { pane } = this.options;

    if (pane && !map.getPane(pane)) {
      map.createPane(pane);
    }
  },

  setIndex(index: number) {
    this.getPane().style.zIndex = getZIndex(index);
    this.options.index = index;
  },

  setVisibility(isVisible: boolean) {
    if (this._map) {
      const pane = this._map.getPane(this.options.pane);

      if (isVisible) {
        pane.style.display = "block";
        this._map.addLayer(this);
      } else {
        pane.style.display = "none";
      }
    }

    this.options.isVisible = isVisible;
  },
  options: {
    url: "https://earthengine.googleapis.com/map/{mapid}/{z}/{x}/{y}?token={token}",
    tokenType: "Bearer",
    aggregation: "none",
    popup: "{name}: {value} {unit}",
  },
  initialize(options: EarthEngineOptions) {
    L.setOptions(this, { ...options, pane: options.id });
    this._layers = {};
    this._legend = options.legend || this.createLegend();
  },

  onAdd() {
    this.setAuthToken();
  },

  onRemove(map: L.Map) {
    if (this._popup) {
      map.closePopup(this._popup);
    }
    L.GeoJSON.prototype.onRemove.call(this, map);
  },

  // Configures client-side authentication of EE API calls by providing a OAuth2 token to use.
  async setAuthToken() {
    const { accessToken, tokenType } = this.options;

    if (accessToken) {
      const token = await accessToken;

      if (token) {
        const { access_token, client_id, expires_in } = token;

        ee.data.setAuthToken(client_id, tokenType, access_token, expires_in);
        ee.data.setAuthTokenRefresher(this.refreshAccessToken.bind(this));
        ee.initialize(null, null, this.createImage.bind(this));
      }
    }
  },

  // Refresh OAuth2 token when expired
  refreshAccessToken(authArgs: { scope: any }, callback: (args: any) => void) {
    const { tokenType } = this.options;

    this.getAuthToken((token: { access_token: string; expires_in: string }) => {
      callback({
        token_type: tokenType,
        access_token: token.access_token,
        state: authArgs.scope,
        expires_in: token.expires_in,
      });
    });
  },

  getAuthToken(callback: (token: { access_token: string; expires_in: string }) => void) {
    const engine = this.options.engine;
    engine.query(googleEngineKeyQuery).then(({ token }: { token: { access_token: string; expires_in: string } }) => {
      callback(token);
    });
  },

  // Create EE tile layer from params (override for each layer type)
  createImage() {
    // eslint-disable-line
    const options = this.options;

    let eeCollection;
    let eeImage;

    if (options.filter) {
      // Image collection
      eeCollection = ee.ImageCollection(options.datasetId); // eslint-disable-line

      eeCollection = this.applyFilter(eeCollection);

      if (options.aggregation === "mosaic") {
        this.eeCollection = eeCollection;
        eeImage = eeCollection.mosaic();
      } else {
        eeImage = ee.Image(eeCollection.first()); // eslint-disable-line
      }
    } else {
      // Single image
      eeImage = ee.Image(options.datasetId); // eslint-disable-line
    }

    if (options.band) {
      eeImage = eeImage.select(options.band);
    }

    if (options.mask) {
      // Mask out 0-values
      eeImage = eeImage.updateMask(eeImage.gt(0));
    }

    // Run methods on image
    eeImage = this.runMethods(eeImage);

    this.eeImage = eeImage;

    // Classify image
    if (!options.legend) {
      // Don't classify if legend is provided
      eeImage = this.classifyImage(eeImage);
    }

    this.addLayer(this.visualize(eeImage));
  },

  // Add EE image to map as TileLayer
  addLayer(eeImage: any) {
    eeImage.getMap(null, (eeMap: { token: any; mapid: any }) => {
      const layer = L.tileLayer(
        this.options.url,
        L.extend(
          {
            token: eeMap.token,
            mapid: eeMap.mapid,
          },
          this.options
        )
      );

      L.LayerGroup.prototype.addLayer.call(this, layer);

      this.setIndex(this.options.index);
    });
  },

  applyFilter(collection: any[], filterOpt: any) {
    const filter = filterOpt || this.options.filter;

    if (filter) {
      filter.forEach((item: { type: string | number; arguments: any }) => {
        collection = collection.filter(ee.Filter[item.type].apply(this, item.arguments)); // eslint-disable-line
      });
    }

    return collection;
  },

  // Run methods on image
  // https://code.earthengine.google.com/a19f5cec73720aba049b457d55672cee
  // https://code.earthengine.google.com/37e4e9cc4436a22e5c3e0f63acb4c0bc
  runMethods(image: any) {
    const methods = this.options.methods;
    let eeImage = image;

    if (methods) {
      Object.keys(methods).forEach((method) => {
        if (eeImage[method]) {
          // Make sure method exist
          eeImage = eeImage[method].apply(eeImage, methods[method]); // eslint-disable-line
        }
      });
    }

    return eeImage;
  },

  // Classify image according to legend
  classifyImage(eeImage: { gt: (arg0: any) => any }) {
    const legend = this._legend;
    let zones;

    for (let i = 0, item; i < legend.length - 1; i++) {
      item = legend[i];
      if (!zones) {
        zones = eeImage.gt(item.to);
      } else {
        zones = zones.add(eeImage.gt(item.to));
      }
    }

    return zones;
  },

  // Visualize image (turn into RGB)
  visualize(eeImage: { visualize: (arg0: any) => any }) {
    const options = this.options;

    return eeImage.visualize(
      options.legend
        ? options.params
        : {
            min: 0,
            max: this._legend.length - 1,
            palette: options.params.palette,
          }
    );
  },

  createLegend() {
    const params = this.options.params;
    const min = params.min;
    const max = params.max;
    const palette = params.palette.split(",");
    const step = (params.max - min) / (palette.length - (min > 0 ? 2 : 1));

    let from = min;
    let to = Math.round(min + step);

    return palette.map((color: any, index: number) => {
      const item = { color, from: 0, to: 0, name: "" };

      if (index === 0 && min > 0) {
        // Less than min
        item.from = 0;
        item.to = min;
        item.name = "< " + item.to;
        to = min;
      } else if (from < max) {
        item.from = from;
        item.to = to;
        item.name = item.from + " - " + item.to;
      } else {
        // Higher than max
        item.from = from;
        item.name = "> " + item.from;
      }

      from = to;
      to = Math.round(min + step * (index + (min > 0 ? 1 : 2)));

      return item;
    });
  },

  setOpacity(opacity: any) {
    this.options.opacity = opacity;
    this.invoke("setOpacity", opacity);
  },

  // Returns value at location in a callback
  getValue(latlng: { lng: number; lat: number }, callback: (arg0: any) => void) {
    const point = ee.Geometry.Point(latlng.lng, latlng.lat); // eslint-disable-line
    const options = this.options;
    let dictionary;

    if (options.aggregation === "mosaic") {
      dictionary = this.eeImage.reduceRegion(ee.Reducer.mean(), point, options.resolution, options.projection); // eslint-disable-line
    } else {
      dictionary = this.eeImage.reduceRegion(ee.Reducer.mean(), point); // eslint-disable-line
    }

    dictionary.getInfo((valueObj: { [x: string]: any }) => {
      const band = options.band || Object.keys(valueObj)[0];
      let value = valueObj[band];

      if (options.legend && options.legend[value]) {
        value = options.legend[value].name;
      } else if (options.value) {
        // Needs calculation
        value = options.value(value);
      }

      callback(value);
    });
  },

  // Shows the value at location (popup)
  showValue(latlng: { lng: number; lat: number }) {
    const options = this.options;
    this.getValue(latlng, (value: any) => {
      this._popup = L.popup()
        .setLatLng(latlng)
        .setContent(L.Util.template(options.popup, L.extend({}, options, { value })))
        .openOn(this._map);
    });
  },
});
