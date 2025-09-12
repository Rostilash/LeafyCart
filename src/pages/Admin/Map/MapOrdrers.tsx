import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
// import { useAppSelector } from "../../../redux/reduxTypeHook";

const initialPosition: LatLngExpression = [48.5173326351917, 22.310485839843754];
// const initialPosition2: LatLngExpression = [48.60952250197608, 22.27752685546875];

export const MapOrdrers = () => {
  const [position, setPosition] = useState<LatLngExpression>(initialPosition);
  // const [position2, setPosition2] = useState<LatLngExpression>(initialPosition2);
  // const { user } = useAppSelector((state) => state.auth);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      },
    });
    return null;
  }

  return (
    <div className="h-[90vh] w-full">
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler />

        <Marker position={position}>
          <Popup>
            <article className="flex flex-col space-y-4">
              <span>В цьому місці Зелені шляпи</span>
              <Link to="/admin"> Долучитися до розмови</Link>
            </article>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
