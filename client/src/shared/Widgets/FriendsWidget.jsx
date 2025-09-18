import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/state";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import { Box } from "@mui/material";

const FriendsWidget = ({ userId }) => {
  const friends = useSelector((state) =>
    state.user.friends ? state.user.friends : []
  );


  return (
    <>
      {friends.length > 0 && (
        <WidgetWrapper sx={{ minWidth: "400px" }}>
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
