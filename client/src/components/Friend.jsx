import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, Typography } from "@mui/material";
import UserImage from "./UserImage";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

const Friend = ({
  userPicturePath,
  fullname,
  location,
  addRemoveFriend,
  isFriend,
}) => {
  return (
    <FlexBetween>
      <Box display={"flex"} alignItems={"center"} gap="0.5rem">
        <UserImage picturePath={userPicturePath} />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="h4">{fullname}</Typography>
          <Typography variant="p">{location}</Typography>
        </Box>
      </Box>
      {isFriend ? (
        <PersonRemoveOutlinedIcon onClick={addRemoveFriend} sx={{cursor:"pointer"}}/>
      ) : (
        <PersonAddOutlinedIcon onClick={addRemoveFriend} sx={{cursor:"pointer"}}/>
      )}
    </FlexBetween>
  );
};

export default Friend;
