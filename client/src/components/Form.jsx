import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/state";
import { useState } from "react";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const signupSchema = yup.object({
  firstName: yup.string("Enter First Name").required("required"),
  lastName: yup.string("Enter Last Name").required("required"),
  location: yup.string("Enter Location"),
  occupation: yup.string("Enter Occupation"),
  picture: yup.mixed().nullable(), // keep optional unless you want required
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Form = ({ pageType, setPageType }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const loginHandler = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }

      const res = await response.json();

      if (res?.user && res?.token) {
        dispatch(setLogin({ user: res.user, token: res.token }));
        navigate("/home");
      } else {
        console.error("Unexpected login response:", res);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const registerHandler = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      if (values.picture) {
        formData.append("picturePath", values.picture.name);
        delete values.picture;
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }

      const res = await response.json();
      onSubmitProps.resetForm();

      if (res) {
        setPageType("login");
      } else {
        console.error("Unexpected register response:", res);
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      location: "",
      occupation: "",
      picture: "",
    },
    validationSchema: pageType === "signup" ? signupSchema : loginSchema,
    onSubmit: (values, onSubmitProps) => {
      if (pageType === "login") {
        loginHandler(values);
      } else {
        registerHandler(values, onSubmitProps);
      }
    },
  });
  return (
    <Box>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,minmax(0px,1fr)",
          gap: "1rem",
        }}
      >
        {pageType === "signup" && (
          <>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              id="occupation"
              name="occupation"
              label="Occupation"
              value={formik.values.occupation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.occupation && Boolean(formik.errors.occupation)
              }
              helperText={formik.touched.occupation && formik.errors.occupation}
              sx={{ gridColumn: "span 4" }}
            />
            <Dropzone
              onDrop={(acceptedFiles) => {
                if (acceptedFiles && acceptedFiles[0]) {
                  formik.setFieldValue("picture", acceptedFiles[0]);
                  formik.setFieldTouched("picture", true, false);
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
                    {formik.values.picture
                      ? formik.values.picture.name
                      : "Select file"}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {isDragActive
                      ? "Drop to upload"
                      : "Drag & drop an image here, or click to browse"}
                  </Typography>
                  {formik.touched.picture && formik.errors.picture && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.75 }}
                    >
                      {formik.errors.picture}
                    </Typography>
                  )}
                </Box>
              )}
            </Dropzone>
          </>
        )}
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ gridColumn: "span 4" }}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ gridColumn: "span 4" }}
        >
          Submit
        </Button>
        {pageType === "login" ? (
          <Typography
            onClick={() => setPageType("signup")}
            color={theme.palette.primary.main}
            sx={{ cursor: "pointer" }}
          >
            Dont have an account signup here
          </Typography>
        ) : (
          <Typography
            onClick={() => setPageType("login")}
            color={theme.palette.primary.main}
            sx={{ cursor: "pointer" }}
          >
            Have an account login here
          </Typography>
        )}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="button"
          onClick={() => {
            loginHandler({
              email: "khushimuskaan1999@gmail.com",
              password: "Taekook1@",
            });
          }}
          sx={{ gridColumn: "span 4" }}
        >
          Guest Login
        </Button>
      </form>
    </Box>
  );
};

export default Form;
