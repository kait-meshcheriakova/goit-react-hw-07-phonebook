import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    [deleteContact.rejected]: handleRejected,
  },

  // extraReducers: builder =>
  //   builder
  //     .addCase(fetchContacts.pending, state => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchContacts.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.items = action.payload;
  //     })
  //     .addCase(fetchContacts.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     })

  //     .addCase(addContact.pending, state => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(addContact.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.items.unshift(action.payload);
  //     })
  //     .addCase(addContact.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     })

  //     .addCase(deleteContact.pending, state => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(deleteContact.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.items = state.items.filter(item => item.id !== action.payload.id);
  //     })
  //     .addCase(deleteContact.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     }),
});

export const contactReducer = contactsSlice.reducer;
