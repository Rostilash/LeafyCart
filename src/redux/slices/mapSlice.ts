import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, query, where, doc, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../fireBase/config";

// ---------------- TYPES ----------------
interface Comment {
  author: string;
  text: string;
  createdAt: string;
}

interface LocationEvent {
  id?: string;
  lat: number;
  lng: number;
  text: string;
  comments: Comment[];
}

interface MapSliceProps {
  events: LocationEvent[];
  loadingMaps: boolean;
  error: string | null;
}

// ---------------- INITIAL STATE ----------------
const initialState: MapSliceProps = {
  events: [],
  loadingMaps: false,
  error: null,
};

// ---------------- THUNKS ----------------

export const createLocationEvent = createAsyncThunk(
  "map/createEvent",
  async ({ lat, lng, text }: { lat: number; lng: number; text: string }, { rejectWithValue }) => {
    try {
      const q = query(collection(db, "events"), where("lat", "==", lat), where("lng", "==", lng));

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        return rejectWithValue("Подія з такими координатами вже існує 🚫");
      }

      const docRef = await addDoc(collection(db, "events"), {
        lat,
        lng,
        text,
        comments: [],
        createdAt: new Date().toISOString(),
      });
      getEvents();

      return {
        id: docRef.id,
        lat,
        lng,
        text,
        comments: [],
      } as LocationEvent;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getEvents = createAsyncThunk<LocationEvent[]>("map/events", async (_, { rejectWithValue }) => {
  try {
    const snapshot = await getDocs(collection(db, "events"));

    const events: LocationEvent[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<LocationEvent, "id">),
    }));

    return events;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ---------------- SLICE ----------------
const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // --- createLocationPost ---
      .addCase(createLocationEvent.pending, (state) => {
        state.loadingMaps = true;
        state.error = null;
      })
      .addCase(createLocationEvent.fulfilled, (state, action: PayloadAction<LocationEvent>) => {
        state.loadingMaps = false;
        state.events.push(action.payload);
      })
      .addCase(createLocationEvent.rejected, (state, action) => {
        state.loadingMaps = false;
        state.error = action.payload as string;
      })
      // --- getEvents ---
      .addCase(getEvents.pending, (state) => {
        state.loadingMaps = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action: PayloadAction<LocationEvent[]>) => {
        state.loadingMaps = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loadingMaps = false;
        state.error = action.payload as string;
      });
  },
});

export default mapSlice.reducer;
