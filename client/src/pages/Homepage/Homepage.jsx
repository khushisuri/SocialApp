import React from "react";
import Navbar from "../../shared/Navbar/Navbar";
import UserWidget from "../../shared/Widgets/UserWidget";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
const Homepage = () => {
  const user = useSelector((state) => state.user);
  console.log(user)
  return (
    <div>
      <Navbar />

      <Box padding="0rem 5rem">
        {user && <UserWidget id={user._id} picturePath={user.picturePath} />}
      </Box>
    </div>
  );
};

export default Homepage;
