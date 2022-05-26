import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [{}],
  reducers: {
    putUserOnList(state, action) {
      state.push({
        id: action.payload.id,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        username: action.payload.username,
        email: action.payload.email,
        birthdate: action.payload.birthdate,
        registerdate: action.payload.registerdate,
        role: action.payload.role,
        status: action.payload.status,
        numberOfPublications: action.payload.numberOfPublications,
        numberOfReactions: action.payload.numberOfReactions,
        numberOfComments: action.payload.numberOfComments,
      });
    },
  },
});

export const usersSliceActions = usersSlice.actions;

export default usersSlice.reducer;
