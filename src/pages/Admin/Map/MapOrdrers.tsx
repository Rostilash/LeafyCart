import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { createLocationEvent, getEvents } from "../../../redux/slices/mapSlice";

const initialPosition: LatLngExpression = [48.5173326351917, 22.310485839843754];

export const MapOrdrers = () => {
  const [position, setPosition] = useState<[number, number]>(initialPosition as [number, number]);
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { events, loadingMaps, error } = useAppSelector((state) => state.map);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      },
    });
    return null;
  }
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleAddPoint = async (lat: number, lng: number, text: string) => {
    const result = await dispatch(createLocationEvent({ lat, lng, text }));
    setTitle("");
    setPosition([0, 0]);
    console.log(result);
  };

  return (
    <div className="h-[90vh] w-full">
      <MapContainer center={initialPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler />

        {/* 🔹 Відображаємо всі івенти з Firestore */}
        {events.map((event) => (
          <Marker position={[event.lat, event.lng]} key={event.lat + event.lng}>
            {loadingMaps && <p key={event.lat + event.lng}>Завантаження</p>}
            <Popup>
              <article className="flex flex-col space-y-4">
                <Link to="/admin">На головну</Link>
                <h3>{event.text}</h3>
                {event.comments.length < 1 && <p className="text-xs text-gray-400">Коментарів ще немає...</p>}
                {event.comments.map((coment) => (
                  <p>{coment.author}</p>
                ))}
                <button className="border  text-gray-200 rounded-2xl cursor-pointer p-2 hover:text-black">Додати коментар</button>
              </article>
            </Popup>
          </Marker>
        ))}

        {/* 🔹 Точка, яку користувач клікнув */}
        {position[0] !== 0 && position[1] !== 0 && (
          <Marker position={position}>
            <Popup>
              <article className="flex flex-col space-y-4">
                <Link to="/admin">На головну</Link>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 rounded border-gray-200"
                  placeholder="Додати назву події..."
                />
                <button
                  className="border text-gray-200 rounded-2xl cursor-pointer p-2 hover:text-black"
                  onClick={() => handleAddPoint(position[0], position[1], title)}
                >
                  + Створити розповідь
                </button>
              </article>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
