import React, { useEffect } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import UserWidget from "../../shared/Widgets/UserWidget";
import { useDispatch, useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import CreatePostWidget from "../../shared/Widgets/CreatePostWidget";
import PostsWidget from "../../shared/Widgets/PostsWidget";
import AdvertWidget from "../../shared/Widgets/AdvertWidget";
import FriendsWidget from "../../shared/Widgets/FriendsWidget";
import { setFriends } from "../../state/state";
const Homepage = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${user?._id}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const friends = await response.json();
    console.log(friends);
    dispatch(setFriends({ friends: friends }));
  };

  useEffect(() => {
    getFriends();
  }, []);
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
          {user && <UserWidget id={user._id} picturePath={user.picturePath} />}
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
          {user?.friends !== "undefined" && user?.friends !== null && (
            <PostsWidget isUserPost={false} />
          )}
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
          {user?.friends !== "undefined" && user?.friends !== null && (
            <FriendsWidget userId={user?._id} />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Homepage;
