import React, { useEffect } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import UserWidget from "../../shared/Widgets/UserWidget";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CreatePostWidget from "../../shared/Widgets/CreatePostWidget";
import PostsWidget from "../../shared/Widgets/PostsWidget";
import AdvertWidget from "../../shared/Widgets/AdvertWidget";
import FriendsWidget from "../../shared/Widgets/FriendsWidget";
import { setFriends } from "../../state/state";
const Homepage = () => {
  const user = useSelector((state) => state.user);

  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  console.log(user);
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
          width={"500px"}
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
