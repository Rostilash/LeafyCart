import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function MapModal({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom()); // Change center of map
  }, [position, map]);

  return null;
}
