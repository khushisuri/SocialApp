import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";

const LoginPage = () => {
  const [pageType, setPageType] = useState("login");
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="2rem 0px"
      borderRadius="10px"
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Box width="60%"></Box>
    </Box>
  );
};

export default LoginPage;
