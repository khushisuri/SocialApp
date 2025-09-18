import React from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";

const AdvertWidget = () => {
  return (
    <WidgetWrapper
      maxWidth="400px"
      display="flex"
      flexDirection={"column"}
      gap={"1rem"}
    >
      <FlexBetween>
        <Typography>Sponsored</Typography>
        <Typography>Create Ad</Typography>
      </FlexBetween>
      <img
        src={`http://localhost:3001/assets/pexels-polina-tankilevitch-3735172.jpg`}
        alt="profile-picture"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      ></img>

      <FlexBetween>
        <Typography>lush cosmetics</Typography>
        <Typography>lushcosmetics.com</Typography>
      </FlexBetween>
      <Typography>
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
