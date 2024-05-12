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
export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contact, thunkAPI) => {
    try {
      const OPTIONS = {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      };
      const response = await fetch(BASE_URL + 'contacts', OPTIONS);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const OPTIONS = {
        method: 'DELETE',
      };
      const response = await fetch(BASE_URL + `contacts/${contactId}`, OPTIONS);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
