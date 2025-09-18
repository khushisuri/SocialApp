import React, { useEffect } from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isUserPost, userId }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state);

  const getAllPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    isUserPost ? getUserPosts() : getAllPosts();
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <PostWidget
            key={post._id}
            postId={post._id}
            description={post.description}
            userPicturePath={post.userPicturePath}
            postPicturePath={post.picturePath}
            fullname={`${post.firstName} ${post.lastName}`}
            location={post.location}
            likes={Object.keys(post.likes)}
            comments={post.comments}
            friendId={post.userId}
          />
        );
      })}
    </>
  );
};

export default PostsWidget;
