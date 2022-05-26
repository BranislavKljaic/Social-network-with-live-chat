import { createSlice } from '@reduxjs/toolkit';

const postViewSlice = createSlice({
  name: 'postView',
  initialState: {
    id: undefined,
    owner: undefined,
    tags: [],
    accesibillity: undefined,
    date: undefined,
    description: undefined,
    name: undefined,
    place: undefined,
    type: undefined,
  },
  reducers: {
    setViewPostInformation(state, action) {
      state.id = action.payload.id;
      state.owner = action.payload.owner;
      state.tags = action.payload.tags;
      state.accesibillity = action.payload.accesibillity;
      state.date = action.payload.date;
      state.description = action.payload.description;
      state.name = action.payload.name;
      state.place = action.payload.place;
      state.type = action.payload.type;
    },
  },
});

export const postViewSliceActions = postViewSlice.actions;

export default postViewSlice.reducer;
