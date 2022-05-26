import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: undefined,
    firstname: undefined,
    lastname: undefined,
    username: undefined,
    email: undefined,
    birthdate: undefined,
    registerdate: undefined,
    role: undefined,
    status: undefined,
    numberOfPublications: 0,
    numberOfReactions: 0,
    numberOfComments: 0,
  },
  reducers: {
    setActiveUserInformation(state, action) {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.birthdate = action.payload.birthdate;
      state.registerdate = action.payload.registerdate;
      state.role = action.payload.role;
      state.status = action.payload.status;
      state.numberOfPublications = action.payload.numberOfPublications;
      state.numberOfReactions = action.payload.numberOfReactions;
      state.numberOfComments = action.payload.numberOfComments;
    },
    logOffUserFromSocialNetwork(state) {
      state.id = undefined;
      state.firstname = undefined;
      state.lastname = undefined;
      state.username = undefined;
      state.email = undefined;
      state.birthdate = undefined;
      state.registerdate = undefined;
      state.role = undefined;
      state.status = undefined;
      state.numberOfPublications = undefined;
      state.numberOfReactions = undefined;
      state.numberOfComments = undefined;
    },
    increaseNumberOfPublications(state) {
      state.numberOfPublications += 1;
    },
    decreaseNumberOfPublications(state) {
      state.numberOfPublications -= 1;
    },
    increaseNumberOfReactions(state) {
      state.numberOfReactions += 1;
    },
    decreaseNumberOfReactions(state) {
      state.numberOfReactions -= 1;
    },
    increaseNumberOfComments(state) {
      state.numberOfComments += 1;
    },
    decreaseNumberOfComments(state) {
      state.numberOfComments -= 1;
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
