import React, { useState } from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Box, Typography } from "@mui/material";
import Friend from "../../components/Friend";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { setFriends, setPost } from "../../state/state";

const PostWidget = ({
  postId,
  description,
  userPicturePath,
  postPicturePath,
  fullname,
  location,
  likes,
  comments,
  friendId,
  isFriend,
}) => {
  const userId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes.filter((id) => userId === id).length > 0);
  const token = useSelector((state) => state.token);
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();

  const likePost = async () => {
  try {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`likePost failed: ${response.status} ${text}`);
    }

    const updatedPost = await response.json();
    dispatch(setPost({ id: updatedPost._id, post: updatedPost }));
  } catch (err) {
    console.error("likePost error:", err);
  }
};

const addRemoveFriend = async () => {
    const id = userId
    try {
    const response = await fetch(
      `http://localhost:3001/user/${id}/${friendId}`,
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
    console.log(data);

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
    <WidgetWrapper>
      <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
        <Friend
          userPicturePath={userPicturePath}
          fullname={fullname}
          location={location}
          addRemoveFriend={addRemoveFriend}
          isFriend={isFriend}
        />
        <Typography variant="p">{description}</Typography>
        <img
          src={`http://localhost:3001/assets/${postPicturePath}`}
          alt="profile-picture"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            padding: "0.5rem 0rem",
            borderRadius: "24px",
          }}
        ></img>
      </Box>
      <FlexBetween padding={"0.5rem 0rem"}>
        <Box display={"flex"} alignItems="flex-start" gap={"1rem"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"0.5rem"}
            onClick={likePost}
          >
            {isLiked ? (
              <FavoriteOutlinedIcon sx={{ cursor: "pointer" }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ cursor: "pointer" }} />
            )}
            <Typography>{likes?.length}</Typography>
          </Box>
          <Box
            onClick={() => setIsComments(!isComments)}
            display={"flex"}
            alignItems={"center"}
            gap={"0.5rem"}
          >
            <ModeCommentOutlinedIcon sx={{ cursor: "pointer" }} />
            <Typography>{comments?.length}</Typography>
          </Box>
        </Box>
        <ShareOutlinedIcon />
      </FlexBetween>
      {isComments && (
        <Box display="flex" flexDirection="column">
          {comments.map((comment) => (
            <>
              <Typography padding="0.5rem 0rem">{comment}</Typography>
              <Divider />
            </>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
