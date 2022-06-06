import { reduxStore } from "../redux";

export interface AuthSliceState {
  value: {
    accessToken: string | null;
  };
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
