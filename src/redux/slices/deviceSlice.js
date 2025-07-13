import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/conflig";

// ✅ Async thunk for creating a device
export const createDevice = createAsyncThunk(
  "device/createDevice",
  async (deviceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/device`,
        deviceData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating device");
    }
  }
);

// ✅ Async thunk for fetching all devices
export const fetchDevices = createAsyncThunk(
  "device/fetchDevices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/device`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching devices");
    }
  }
);

// ✅ Async thunk for deleting a device
export const deleteDevice = createAsyncThunk(
  "device/deleteDevice",
  async (deviceId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/device/${deviceId}`);
      return deviceId; // Return the deleted device ID to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting device");
    }
  }
);

export const updateDevice = createAsyncThunk(
  "device/updateDevice",
  async ({ deviceId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${apiUrl}/device/${deviceId}`, // ✅ Ensure deviceId is valid
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating device");
    }
  }
);

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    devices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Create Device
      .addCase(createDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.devices.push(action.payload);
      })
      .addCase(createDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Devices
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Device
      .addCase(deleteDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = state.devices.filter(
          (device) => device._id !== action.payload
        );
      })
      .addCase(deleteDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Device
      .addCase(updateDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = state.devices.map((device) =>
          device._id === action.payload._id ? action.payload : device
        );
      })
      .addCase(updateDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deviceSlice.reducer;
