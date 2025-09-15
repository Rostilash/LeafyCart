import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { addComment, createLocationEvent, getEvents, type Comment } from "../../../redux/slices/mapSlice";
import { getUserNameFromEmail } from "../../../utils/getUserNameByEmail";
import { MapPin } from "lucide-react";
import { MapModal } from "./MapModal";

const initialPosition: LatLngExpression = [48.61862142508741, 22.264566421508793];

export const MapOrdrers = () => {
  const [position, setPosition] = useState<[number, number]>(initialPosition as [number, number]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const [comment, setComment] = useState("");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { events, loadingMaps, error } = useAppSelector((state) => state.map);
  const iconHtml = renderToStaticMarkup(<MapPin size={32} color="black" strokeWidth={2} />);

  const lucideIcon = L.divIcon({
    html: iconHtml,
    className: "",
    iconSize: [42, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

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
    if (selectedEvent) {
      const event = events.find((ev) => ev.id === selectedEvent);
      if (event) {
        setPosition([event.lat, event.lng]);
      }
    }
  }, [selectedEvent, events]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleAddPoint = async (lat: number, lng: number, text: string) => {
    if (title.trim().length < 1) {
      alert("Поле не має бути порожнім");
      return;
    }
    const result = await dispatch(createLocationEvent({ lat, lng, text }));
    setTitle("");
    setPosition([0, 0]);
    console.log(result);
  };

  const handleAddComment = async (eventId: string, comment: string) => {
    if (!comment.trim()) return;
    const currentUser = user ? getUserNameFromEmail(user) : "Гість";

    const newComment: Comment = {
      author: currentUser || null,
      text: comment,
      createdAt: new Date().toISOString(),
    };

    dispatch(addComment({ eventId, comment: newComment }));
    setComment("");
  };

  return (
    <div className="h-[90vh] w-full">
      <MapContainer
        center={initialPosition}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        minZoom={10}
        maxZoom={18}
        // maxBounds={[
        //   [48.45, 22.2], // SW координата (південь-захід)
        //   [48.6, 22.45], // NE координата (північ-схід)
        // ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler />

        {/* 🔹 events from Firebase */}
        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.lat, event.lng]}
            icon={lucideIcon}
            eventHandlers={{ click: () => setSelectedEvent(event.id) }} // відкриваємо модалку
          />
        ))}

        {/* 🔹 Point where user clicked */}
        {position[0] !== 0 && position[1] !== 0 && (
          <Marker position={position}>
            <Popup>
              <article className="flex flex-col space-y-4">
                <Link to="/admin">На головну</Link>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 rounded border-gray-200 "
                  placeholder="Додати назву події..."
                />
                {error && <span className="text-sm text-red-500">{error}</span>}
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

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-1000" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white p-6 rounded h-screen max-w-7xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              className="mb-4"
              onClick={() => {
                ClickHandler();
                setSelectedEvent(null);
              }}
            >
              Закрити
            </button>
            <MapContainer center={position} zoom={18} style={{ height: "50%", width: "100%" }} minZoom={10} maxZoom={20} maxBoundsViscosity={1.0}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} />
              <MapModal position={position} /> {/* Select the new position */}
            </MapContainer>
            {events
              .filter((ev) => ev.id === selectedEvent)
              .map((event) => {
                return (
                  <div key={event.id}>
                    {loadingMaps && <p>Завантаження...</p>}

                    <h3>{event.text}</h3>
                    {event.comments.length === 0 && <p>Коментарів ще немає...</p>}
                    {event.comments.map((c) => (
                      <div key={c.createdAt} className="border p-2 rounded mb-2">
                        <span>Автор: {c.author}</span>
                        <span>Текст: {c.text}</span>
                        <span>Час: {c.createdAt.slice(0, 10)}</span>
                      </div>
                    ))}
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Додати коментар..."
                    />
                    <button
                      onClick={() => handleAddComment(event.id!, comment)}
                      disabled={comment.trim().length === 0}
                      className="mt-2 border p-2 rounded"
                    >
                      Додати коментар
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
