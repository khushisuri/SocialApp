import { Box } from "@mui/material";
import React from "react";

const UserImage = ({ picturePath }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: "50%",
        height: "60px",
        width: "60px",
      }}
    >
      <img
        src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
        alt="profile-picture"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      ></img>
    </Box>
  );
};

export default UserImage;
