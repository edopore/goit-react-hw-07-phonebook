import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    base: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
      state.base = [...state.contacts];
    },
    deleteContact: (state, action) => {
      const items = [...state.base];
      const index = items.findIndex(contact => contact.id === action.payload);
      state.base.splice(index, 1);
      state.contacts = [...state.base];
      state.filter = '';
    },
    filterContact: (state, action) => {
      state.filter = action.payload;
      const items = [...state.base];
      const result = items.filter(word =>
        word.name.toLowerCase().includes(action.payload)
      );
      if (action.payload === '') {
        state.contacts = [...items];
        return;
      } else {
        state.contacts = [...result];
      }
    },
  },
});

export const { addContact, deleteContact, filterContact } =
  contactSlice.actions;
