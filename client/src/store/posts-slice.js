import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [{
    id: undefined,
    name: undefined,
    date: undefined,
    accesibillity: undefined,
    description: undefined,
    owner: undefined,
    place: undefined,
    tags: [],
    type: undefined,
  }],
  reducers: {
    putPostOnList(state, action) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        date: action.payload.date,
        accesibillity: action.payload.accesibillity,
        description: action.payload.description,
        owner: action.payload.owner,
        place: action.payload.place,
        tags: action.payload.tags,
        type: action.payload.type,
      });
    },
  },
});

export const postsSliceActions = postsSlice.actions;

export default postsSlice.reducer;
