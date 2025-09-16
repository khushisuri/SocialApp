import React from "react";
import Navbar from "../../shared/Navbar/Navbar";
import UserWidget from "../../shared/Widgets/UserWidget";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import CreatePostWidget from "../../shared/Widgets/CreatePostWidget";
import PostsWidget from "../../shared/Widgets/PostsWidget";
const Homepage = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      <Navbar />

      <Box padding="0rem 5rem" display="flex" alignItems="start" gap={"2rem"}>
        {user && <UserWidget id={user._id} picturePath={user.picturePath} />}
        <Box
          padding="0rem 1rem"
          display="flex"
          alignItems="start"
          gap={"2rem"}
          flexDirection={"column"}
          width={"500px"}
        >
          {user && <CreatePostWidget picturePath={user.picturePath} />}
          <PostsWidget isUserPost={false} />
        </Box>
      </Box>
    </div>
  );
};

export default Homepage;
