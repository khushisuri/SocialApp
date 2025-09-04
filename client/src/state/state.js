import { createSlice } from "@reduxjs/toolkit";

const state = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  initialState: state,
  name: "auth",
  reducers: {
    setMode: (state) => (state.mode == "light" ? "dark" : "light"),
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id == action.payload.id) {
          return action.payload.post;
        } else return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer