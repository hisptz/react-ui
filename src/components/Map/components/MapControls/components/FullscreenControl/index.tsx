import { createControlComponent } from "@react-leaflet/core";
import { control } from "leaflet";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

const FullscreenControl = createControlComponent((props) => (control as any).fullscreen(props));
export default FullscreenControl;
