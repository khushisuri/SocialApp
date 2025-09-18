import {
  Box,
  FormControl,
  Icon,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { setLogout, setMode } from "../../state/state";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const mode = useSelector((state) => state.mode);
  const user = useSelector((state) => state.user);
  const isMobileScreen = useMediaQuery("(max-width:900px)");
  const fullname = user ? `${user.firstName} ${user.lastName}` : "Guest User";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  return (
    <Box
      padding={isMobileScreen ? "2rem" : "2rem 5rem"}
      justifyContent={"space-between"}
    >
      <FlexBetween>
        <Box gap={"2rem"} display={"flex"} alignItems={"center"}>
          <Typography
            sx={{ fontSize: "clamp(1rem,2rem,3rem)", cursor: "pointer" }}
            color={theme.palette.primary.main}
            fontWeight={600}
            onClick={() => navigate("/home")}
          >
            Sociopedia
          </Typography>
          {!isMobileScreen && (
            <Box
              sx={{
                backgroundColor: theme.palette.neutral.light,
                borderRadius: "10px",
                padding: "0px 10px",
              }}
            >
              <InputBase placeholder="Search" />
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        {!isMobileScreen ? (
          <Box>
            <IconButton
              onClick={() =>
                mode === "light"
                  ? dispatch(setMode("dark"))
                  : dispatch(setMode("light"))
              }
            >
              {mode !== "light" ? (
                <LightModeOutlinedIcon fontSize="25px" />
              ) : (
                <BedtimeOutlinedIcon fontSize="25px" />
              )}
            </IconButton>
            <IconButton>
              <MessageOutlinedIcon fontSize="25px" />
            </IconButton>
            <IconButton>
              <NotificationsNoneOutlinedIcon fontSize="25px" />
            </IconButton>
            <IconButton>
              <HelpOutlinedIcon fontSize="25px" />
            </IconButton>
            <FormControl variant="standard" sx={{ minWidth: 150 }}>
              <Select
                value={fullname}
                disableUnderline
                sx={{
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  backgroundColor: "background.paper",
                  "& .MuiSelect-select:focus": {
                    backgroundColor: "background.paper",
                  },
                }}
                onChange={(e) => {
                  if (e.target.value === "logout") {
                    dispatch(setLogout());
                    navigate("/");
                  }
                }}
              >
                <MenuItem value={fullname}>
                  <Typography>{fullname}</Typography>
                </MenuItem>
                <MenuItem value="logout">Logout</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box position={"relative"}>
            <Box>
              <IconButton
                onClick={() => setIsMobileSubMenuOpen((prevVal) => !prevVal)}
              >
                <MenuOutlinedIcon fontSize="25px" />
              </IconButton>
            </Box>
            {isMobileSubMenuOpen && (
              <Box
                display="flex"
                flexDirection="column"
                sx={{ position: "absolute", top: "50px", right: "0px" }}
                backgroundColor={theme.palette.background.paper}
                boxShadow={`1px 1px 6px 0.2px ${
                  mode === "light"
                    ? theme.palette.neutral.medium
                    : theme.palette.background.default
                }`}
              >
                <IconButton
                  onClick={() =>
                    mode === "light"
                      ? dispatch(setMode("dark"))
                      : dispatch(setMode("light"))
                  }
                >
                  {mode !== "light" ? (
                    <LightModeOutlinedIcon fontSize="25px" />
                  ) : (
                    <BedtimeOutlinedIcon fontSize="25px" />
                  )}
                </IconButton>
                <IconButton>
                  <MessageOutlinedIcon fontSize="25px" />
                </IconButton>
                <IconButton>
                  <NotificationsNoneOutlinedIcon fontSize="25px" />
                </IconButton>
                <IconButton>
                  <HelpOutlinedIcon fontSize="25px" />
                </IconButton>
                <FormControl variant="standard" sx={{ minWidth: 150 }}>
                  <Select
                    value={fullname}
                    disableUnderline
                    sx={{
                      borderRadius: "0.25rem",
                      p: "0.25rem 1rem",
                      backgroundColor: "background.paper",
                      "& .MuiSelect-select:focus": {
                        backgroundColor: "background.paper",
                      },
                    }}
                    onChange={(e) => {
                      if (e.target.value === "logout") {
                        dispatch(setLogout());
                        navigate("/");
                      }
                    }}
                  >
                    <MenuItem value={fullname}>
                      <Typography>{fullname}</Typography>
                    </MenuItem>
                    <MenuItem value="logout">Logout</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        )}
      </FlexBetween>
    </Box>
  );
};

export default Navbar;
