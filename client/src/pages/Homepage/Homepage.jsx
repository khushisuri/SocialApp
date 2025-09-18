import React, { useEffect } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import UserWidget from "../../shared/Widgets/UserWidget";
import { useDispatch, useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import CreatePostWidget from "../../shared/Widgets/CreatePostWidget";
import PostsWidget from "../../shared/Widgets/PostsWidget";
import AdvertWidget from "../../shared/Widgets/AdvertWidget";
import FriendsWidget from "../../shared/Widgets/FriendsWidget";
const Homepage = () => {
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <div>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="0.5rem"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent={isNonMobileScreens ? "space-between" : "center"}
      >
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          display="flex"
          justifyContent="center"
        >
          {user && (
            <UserWidget id={user?._id} picturePath={user?.picturePath} />
          )}
        </Box>

        <Box
          padding="0rem 1rem"
          display="flex"
          alignItems="start"
          gap={"2rem"}
          flexDirection={"column"}
          width={isNonMobileScreens ? "500px" : "100%"}
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {user && <CreatePostWidget picturePath={user.picturePath} />}
          {user && <PostsWidget isUserPost={false} />}
        </Box>
        <Box
          padding="0rem 1rem"
          display="flex"
          alignItems="start"
          gap={"2rem"}
          flexDirection={"column"}
          width={isNonMobileScreens ? "500px" : "100%"}
          flexBasis="26%"
        >
          <AdvertWidget />
          {user && <FriendsWidget userId={user?._id} />}
        </Box>
      </Box>
    </div>
  );
};

export default Homepage;
