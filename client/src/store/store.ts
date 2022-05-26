import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';
import postViewReducer from './view-post';
import userReducer from './user-slice';
import usersReducer from './users-slice';
import postsReducer from './posts-slice';
import viewUserProfileReducer from './view-user-profile';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    user: userReducer,
    userProfile: viewUserProfileReducer,
    users: usersReducer,
    posts: postsReducer,
    postView: postViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
