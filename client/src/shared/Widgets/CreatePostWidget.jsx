import {
  Box,
  Button,
  Divider,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import UserImage from "../../components/UserImage";
import Dropzone from "react-dropzone";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/state";

const CreatePostWidget = ({ picturePath }) => {
  const theme = useTheme();
  const [post, setPost] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const submitHandler = async () => {
    const formData = new FormData();

    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };
  return (
    <Box
      padding={"1rem"}
      width={"100%"}
      display="flex"
      flexDirection="column"
      gap="1rem"
    >
      <Box display="flex" alignItems="center" gap="1rem">
        <UserImage picturePath={picturePath} />
        <InputBase
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="whats on your mind..."
          sx={{
            padding: "1rem 2rem",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.grey[600],
            borderRadius: "10px",
            width: "-webkit-fill-available",
          }}
        ></InputBase>
      </Box>

      {isImage && (
        <Dropzone
          onDrop={(acceptedFiles) => {
            if (acceptedFiles && acceptedFiles[0]) {
              setImage(acceptedFiles[0]);
            }
          }}
          multiple={false}
          accept={{ "image/*": [] }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <Box
              {...getRootProps()}
              sx={{
                gridColumn: "span 4",
                border: "2px dashed",
                borderColor: theme.palette.primary.main, // dashed border color
                color: theme.palette.primary.main, // text color
                borderRadius: 2,
                p: 2.5,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: isDragActive ? "action.hover" : "transparent",
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                {image ? image.name : "Select file"}
              </Typography>
              <Typography variant="caption" display="block">
                {isDragActive
                  ? "Drop to upload"
                  : "Drag & drop an image here, or click to browse"}
              </Typography>
            </Box>
          )}
        </Dropzone>
      )}
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flex-wrap="wrap"
      >
        <FlexBetween
          gap="0.25rem"
          onClick={() => setIsImage(!isImage)}
          sx={{
            cursor: "pointer",
            justifyContent: isNonMobileScreens ? "space-between" : "flex-start",
            gap: "0.5rem",
          }}
        >
          <ImageOutlinedIcon />
          <Typography>Image</Typography>
        </FlexBetween>
        <FlexBetween gap="0.25rem" sx={{ cursor: "pointer" }}>
          <VideocamOutlinedIcon />
          <Typography>Clip</Typography>
        </FlexBetween>
        <FlexBetween gap="0.25rem" sx={{ cursor: "pointer" }}>
          <AttachmentOutlinedIcon />
          <Typography>Attachment</Typography>
        </FlexBetween>
        <FlexBetween gap="0.25rem" sx={{ cursor: "pointer" }}>
          <AudiotrackOutlinedIcon />
          <Typography>Audio</Typography>
        </FlexBetween>
        <Button
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: "10px",
            color: theme.palette.primary.light,
          }}
          onClick={() => submitHandler()}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePostWidget;
