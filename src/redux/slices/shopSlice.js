import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/conflig';
import axiosInstance from '../../utils/axiosInstance';

// API URLs

const SINGLE_SHOP_URL = (id) => `${apiUrl}/shop/${id}`;

// Initial state
const initialState = {
  shops: [],
  singleShop: null,
  loading: false,
  error: null,
  shopAdded: false,
};

// ✅ Thunks

// Get all shops
export const getAllShops = createAsyncThunk('shops/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/shop`);
    console.log('Fetched shops:', response.data.shops);
    return response.data.shops || [];
  } catch (error) {
    console.log(error)
    const errorMessage = error.response?.data?.message || error.message || 'Failed to load shops.';
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// Add a new shop
export const addShop = createAsyncThunk('shops/add', async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}/shop`, formData);

    if (response.status === 200) {
      toast.success(response.data?.message || 'Shop added successfully!');
      return response.data.shop;  // ✅ Pass shop data to reducer
    }

  
  } catch (error) {
    const status = error.response?.status;

    if (status === 400) {
      toast.error('Shop already exists. Please use a different name or email.');
      return rejectWithValue('Shop already exists');
    } else if (status === 500) {
      toast.error('Something went wrong. Please try again later.');
      return rejectWithValue('Server error');
    } else {
      const errorMessage = error.response?.data?.message || 'Failed to add shop.';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
});

// Update an existing shop
export const updateShop = createAsyncThunk('shops/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(SINGLE_SHOP_URL(id), formData);
    toast.success('Shop updated successfully!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update shop.';
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// Delete a shop
export const deleteShop = createAsyncThunk('shops/delete', async (shopId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(SINGLE_SHOP_URL(shopId));
    console.log('Delete response:', response.data);
    toast.success('Shop deleted successfully!');
    return shopId; // Return the deleted shop's ID
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete shop.';
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// ✅ Shop slice
const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},


  extraReducers: (builder) => {
    // Get all shops
    builder.addCase(getAllShops.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllShops.fulfilled, (state, action) => {
      state.loading = false;
      state.shops = Array.isArray(action.payload) ? action.payload : [];
      state.error = null;
    });
    builder.addCase(getAllShops.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add a shop
    builder.addCase(addShop.pending, (state) => {
      state.loading = true;
      state.shopAdded = false;  // Reset in case it's stale
    })
    builder.addCase(addShop.fulfilled, (state, action) => {
      state.loading = false;
      state.shops.push(action.payload);  // ✅ Add to shop list
      state.shopAdded = true;  // ✅ Trigger navigation
      state.error = null;
    })
    builder.addCase(addShop.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.shopAdded = false;  // Ensure no auto navigation
    });
    // Update a shop
    builder.addCase(updateShop.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateShop.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.shops.findIndex(shop => shop._id === action.payload._id);
      if (index !== -1) {
        state.shops[index] = action.payload;
      }
      state.error = null;
    });
    builder.addCase(updateShop.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete a shop
    builder.addCase(deleteShop.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteShop.fulfilled, (state, action) => {
      state.shops = state.shops.filter(shop => shop._id !== action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteShop.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default shopSlice.reducer;