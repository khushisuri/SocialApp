import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import UserWidget from "../../shared/Widgets/UserWidget";
import CreatePostWidget from "../../shared/Widgets/CreatePostWidget";
import PostsWidget from "../../shared/Widgets/PostsWidget";
import AdvertWidget from "../../shared/Widgets/AdvertWidget";
import FriendsWidget from "../../shared/Widgets/FriendsWidget";

const ProfilePage = () => {
  const { userId } = useParams();
  const { token } = useSelector((state) => state);
  const [user, setUser] = useState(null);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    console.log(user);
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
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
        justifyContent={"center"}
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
          {user && <PostsWidget isUserPost={true} userId={user._id} />}
        </Box>
      </Box>
    </div>
  );
};

export default ProfilePage;
