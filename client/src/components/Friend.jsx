import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, Typography } from "@mui/material";
import UserImage from "./UserImage";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state/state";
import { useNavigate } from "react-router-dom";

const Friend = ({ userPicturePath, fullname, location, friendId }) => {
  const userId = useSelector((state) => state.user._id);
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);
  const addRemoveFriend = async () => {
    const id = userId;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`addRemoveFriend failed: ${response.status} ${text}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error("Unexpected friends payload:", data);
        return;
      }

      dispatch(setFriends({ friends: data }));
    } catch (err) {
      console.error("addRemoveFriend error:", err);
    }
  };
  return (
    <FlexBetween>
      <Box display={"flex"} alignItems={"center"} gap="0.5rem">
        <UserImage picturePath={userPicturePath} />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography
            variant="h4"
            onClick={() => navigate(`/profile/${friendId}`)}
            sx={{ cursor: "pointer" }}
          >
            {fullname}
          </Typography>
          <Typography variant="p">{location}</Typography>
        </Box>
      </Box>
      {isFriend ? (
        <PersonRemoveOutlinedIcon
          onClick={addRemoveFriend}
          sx={{ cursor: "pointer" }}
        />
      ) : (
        <PersonAddOutlinedIcon
          onClick={addRemoveFriend}
          sx={{ cursor: "pointer" }}
        />
      )}
    </FlexBetween>
  );
};

export default Friend;
