import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Async thunk to fetch user profile data
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/single`, {
        params: { id },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Async thunk to update user profile
export  const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { getState }) => {
    try {
      // Retrieve user ID from the state (auth slice)
      const { user } = getState().auth;
      // Perform the patch request using the user ID and user data
      const response = await axiosInstance.patch(`/users/${user._id}`, userData);
      console.log("Profile --------------update successful", response);
      return response.data; // Return updated data
    } catch (error) {
      console.error("Error updating profile", error);
      
    }
  }
);

const userSlice = createSlice({
  name: "userprofile",
  initialState: {
    userprofile: null, // Stores user profile
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userprofile = action.payload; // Store the fetched user profile
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userprofile = action.payload.user
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors
      });
  },
});

export default userSlice.reducer;
