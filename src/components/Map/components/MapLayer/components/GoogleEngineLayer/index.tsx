import { capitalize, find, head, isEmpty, sortBy } from "lodash";
import React, { useMemo, useRef } from "react";
import { GeoJSON, LayerGroup, LayersControl, Popup, TileLayer, Tooltip } from "react-leaflet";
import { useBoundaryData } from "../BoundaryLayer/hooks/useBoundaryData";
import useGoogleEngineLayer from "./hooks";
import { MapOrgUnit } from "../../../../interfaces";
import { highlightFeature, resetHighlight } from "../../../../utils/map";
import { defaultStyle, highlightStyle } from "../BoundaryLayer";
import { useQuery } from "react-query";
import { CenteredContent, CircularLoader, Divider } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { CustomGoogleEngineLayer } from "../../interfaces";

function formatValues(value: number): string {
  return Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(value);
}

function getUnit(unit?: string) {
  console.log(unit);
  if (unit === "percentage") {
    return "%";
  }
}

function Legend({
  header,
  legends,
  value,
  unit,
}: {
  header: number;
  legends: { id: number | string; color: string; name: string }[];
  value: number;
  unit?: string;
}) {
  const legend = find(legends, ["id", header]);

  return (
    <div className="row gap-8 space-between">
      <div className="row gap-8">
        <div className="legend-item-color" style={{ backgroundColor: legend?.color }} />
        <div>{legend?.name}</div>
      </div>
      <span>
        {formatValues(value)}
        {getUnit(unit)}
      </span>
    </div>
  );
}

function AggregationView({ header, value }: { header: string; value: number }) {
  return (
    <div className="row space-between">
      <span>{capitalize(header.toString())}</span>
      <span>{formatValues(value)}</span>
    </div>
  );
}

function EarthEnginePopup({ layer, orgUnit, loading, error }: { layer?: CustomGoogleEngineLayer; orgUnit: MapOrgUnit; loading: boolean; error?: string }) {
  const engine = layer?.engine;
  const legends = layer?.engine?.options?.legend?.items;
  const data = engine?.getAggregation(orgUnit)?.data;
  const unit = layer?.engine?.options?.unit ?? head(layer?.engine?.options.aggregations);

  const aggregations = useMemo(() => {
    if (!isEmpty(legends)) {
      return sortBy(
        Object.keys(data ?? {}).map((key) => {
          return {
            id: parseInt(key),
            value: data[key],
          };
        }),
        ["value"]
      ).reverse();
    }

    return data ?? {};
  }, [data]);

  if (loading) {
    return (
      <div style={{ width: 200, height: 200 }}>
        <CenteredContent>
          <CircularLoader extrasmall />
        </CenteredContent>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3 style={{ margin: "0" }}>{orgUnit.name}</h3>
        <Divider margin={"0"} />
        <div className="column gap-8">
          <div className="column">
            <b>{layer?.options?.name}</b>
            <div>{layer?.options?.unit}</div>
          </div>
          <div className="column">
            <p>{i18n.t("Could not get aggregate data")}</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ margin: "0" }}>{orgUnit.name}</h3>
      <Divider margin={"0"} />
      <div className="column gap-8">
        <div className="column">
          <b>{layer?.options?.name}</b>
          <div>{layer?.options?.unit ?? unit}</div>
        </div>
        {data && (
          <div className="column">
            {Array.isArray(aggregations)
              ? aggregations?.map(({ id, value }) => <Legend legends={legends ?? []} value={value} header={id} unit={unit} />)
              : Object.keys(aggregations)?.map((key) => <AggregationView header={key} value={aggregations[key]} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function EarthEngineArea({ area, layer, loading, error }: { area: MapOrgUnit; layer?: CustomGoogleEngineLayer; loading: boolean; error?: string }) {
  const ref = useRef<any>();

  return (
    <GeoJSON
      ref={ref}
      data={area.geoJSON}
      interactive
      eventHandlers={{
        mouseover: (e) => highlightFeature(e, highlightStyle),
        mouseout: (e) => resetHighlight(e, defaultStyle),
      }}
      key={`${area.id}-polygon`}
      pathOptions={defaultStyle}>
      <Tooltip>{area.name}</Tooltip>
      <Popup minWidth={100}>
        <EarthEnginePopup error={error} layer={layer} orgUnit={area} loading={loading} />
      </Popup>
    </GeoJSON>
  );
}

export default function GoogleEngineLayer({ layerId }: { layerId: string }) {
  const layer = useGoogleEngineLayer(layerId);
  const { name, type, enabled, url, options, engine } = layer ?? {};
  const { isLoading: loadingAggregateData, error } = useQuery([engine], async () => engine?.getAggregations(), {
    suspense: false,
  });
  const orgUnits = useBoundaryData();

  if (!url) return null;

  return (
    <LayersControl.Overlay checked={enabled} name={name ?? capitalize(type)}>
      <LayerGroup>
        <TileLayer id={options?.id} url={url} />
        {orgUnits?.map((area: MapOrgUnit) => {
          return (
            <EarthEngineArea
              error={(error as any)?.toString() as string | undefined}
              loading={loadingAggregateData}
              key={`${area.id}-polygon`}
              area={area}
              layer={layer}
            />
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
