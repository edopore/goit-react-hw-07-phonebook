import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://663979bf1ae792804bebdebc.mockapi.io/api/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL + 'contacts');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
