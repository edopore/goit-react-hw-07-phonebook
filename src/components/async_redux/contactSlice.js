import { createSlice } from '@reduxjs/toolkit';
import {
  createContact,
  deleteContact,
  fetchContacts,
} from './contactOperators';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    base: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    filterContact: (state, action) => {
      state.filter = action.payload;
      const items = [...state.base];
      const result = items.filter(word =>
        word.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      if (action.payload === '') {
        state.contacts = [...items];
        return;
      } else {
        state.contacts = [...result];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = [...action.payload];
        state.base = [...state.contacts];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      })
      .addCase(createContact.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.base = [...state.contacts];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createContact.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      })
      .addCase(deleteContact.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        console.log(action.payload);
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
        state.base = [...state.contacts];
        state.filter = '';
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export const { filterContact } = contactSlice.actions;

export const contactsReducer = contactSlice.reducer;
