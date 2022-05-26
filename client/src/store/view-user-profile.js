import { createSlice } from '@reduxjs/toolkit';

const viewUserProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    firstname: undefined,
    lastname: undefined,
    username: undefined,
    email: undefined,
    birthdate: undefined,
    role: undefined,
    numberOfPublications: undefined,
    numberOfReactions: undefined,
    numberOfComments: undefined,
  },
  reducers: {
    setUserProfileInformation(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.birthdate = action.payload.birthdate;
      state.role = action.payload.role;
      state.numberOfPublications = action.payload.numberOfPublications;
      state.numberOfReactions = action.payload.numberOfReactions;
      state.numberOfComments = action.payload.numberOfComments;
    },
  },
});

export const viewUserProfileSliceActions = viewUserProfileSlice.actions;

export default viewUserProfileSlice.reducer;
