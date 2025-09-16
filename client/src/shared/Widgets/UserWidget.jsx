import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserImage from "../../components/UserImage";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import FlexBetween from "../../components/FlexBetween";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

const UserWidget = ({ id, picturePath }) => {
  const { token } = useSelector((state) => state);
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const fullname = `${user?.firstName} ${user?.lastName}`;
  const getUser = async () => {
    const user = await fetch(`http://localhost:3001/user/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await user.json();
    setUser(response);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    user && (
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        sx={{
          width: "300px",
          backgroundColor: theme.palette.background.paper,
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <FlexBetween>
          <Box display={"flex"} alignItems={"center"} gap="0.5rem">
            <UserImage picturePath={picturePath} />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="h4">{fullname}</Typography>
              <Typography variant="p">{`${user.friends.length} friends`}</Typography>
            </Box>
          </Box>
          <GroupAddOutlinedIcon sx={{cursor:"pointer"}}/>
        </FlexBetween>
        <Divider />
        <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
          <Box display={"flex"} justifyContent={"flex-start"} gap={"1rem"}>
            <PlaceOutlinedIcon />
            <Typography variant="p">{user.location}</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"flex-start"} gap={"1rem"}>
            <WorkOutlineOutlinedIcon />
            <Typography variant="p" sx={{ textTransform: "capitalize" }}>
              {user.occupation}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={"0.5rem"}>
          <FlexBetween>
            <Typography variant="p">who's viewed your profile</Typography>
            <Typography variant="p" fontWeight={"600"}>
              {user.viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography variant="p">impressions of your post</Typography>
            <Typography variant="p" fontWeight={"600"}>
              {user.impressions}
            </Typography>
          </FlexBetween>
        </Box>
        <Divider />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap="0.5rem"
        >
          <Typography>Social Profiles</Typography>
          <FlexBetween width={"100%"}>
            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <XIcon />
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
              >
                <Typography variant="h5">Twitter</Typography>
                <Typography variant="p">Social Network</Typography>
              </Box>
            </Box>
            <EditIcon sx={{cursor:"pointer"}}/>
          </FlexBetween>
          <FlexBetween width={"100%"}>
            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <LinkedInIcon />
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
              >
                <Typography variant="h5">LinkedN</Typography>
                <Typography variant="p">Network Platform</Typography>
              </Box>
            </Box>
            <EditIcon sx={{cursor:"pointer"}}/>
          </FlexBetween>
        </Box>
      </Box>
    )
  );
};

export default UserWidget;
