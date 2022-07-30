/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import service from './service';

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const getMovie = createAsyncThunk('movie/get-movie', async (arg, thunkAPI) => {
  try {
    return service.getMovies(arg);
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const slice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.movie;
        state.genre = action.payload.genre;
      })
      .addCase(getMovie.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default slice.reducer;
