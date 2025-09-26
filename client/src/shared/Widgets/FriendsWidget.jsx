import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/state";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import { Box, useMediaQuery } from "@mui/material";

const FriendsWidget = ({ userId }) => {
  const friends = useSelector((state) =>
    state.user.friends ? state.user.friends : []
  );
 const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();

  const getFriends = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const friends = await response.json();
    dispatch(setFriends({ friends: friends }));
  };

  useEffect(() => {
    getFriends();
  }, []);
  return (
    <>
      {friends.length > 0 && (
        <WidgetWrapper sx={{ minWidth: isNonMobileScreens ? "400px" : "100%"}}>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            {friends.map((friend) => (
              <Friend
                userPicturePath={friend.picturePath}
                fullname={`${friend.firstName} ${friend.lastName}`}
                location={friend.location}
                isFriend={true}
                friendId={friend._id}
              />
            ))}
          </Box>
        </WidgetWrapper>
      )}
    </>
  );
};

export default FriendsWidget;
