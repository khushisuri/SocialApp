import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import Form from "../../components/Form";

const LoginPage = () => {
  const [pageType, setPageType] = useState("login");
  const theme = useTheme();
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: theme.palette.background.paper }}
        padding="1rem 0px"
      >
        <Typography
          sx={{ fontSize: "24px", cursor: "pointer" }}
          color={theme.palette.primary.main}
          fontWeight={600}
        >
          Sociopedia
        </Typography>
      </Box>
      <Box
        width="60%"
        display="flex"
        justifyContent="center"
        borderRadius="10px"
        backgroundColor={theme.palette.background.paper}
        margin="24px auto"
        flexDirection={"column"}
        gap="1rem"
        padding="20px"
      >
        <Typography
          sx={{ fontSize: "16px", cursor: "pointer" }}
          color={theme.palette.primary.main}
          fontWeight={600}
        >
          Welcome to Sociopedia, the social media app for sociopaths
        </Typography>
        <Form pageType={pageType} setPageType={setPageType}/>
      </Box>
    </Box>
  );
};

export default LoginPage;
