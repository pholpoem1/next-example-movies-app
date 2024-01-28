"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { login } from "./action";
import { useRouter } from "next/navigation";

export interface IFormData {
  username: string;
  password: string;
}

const SignIn = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
  });

  const methods = useForm<IFormData>({
    resolver: joiResolver(schema)
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = async (data: IFormData) => {
    try {
      setIsLoading(true);

      await login(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error :>> ", error);
      setLoginError(`เกิดข้อผิดพลาดในการเข้าสู่ระบบ`);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            {...register("username", { required: "กรุณากรอก Username" })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            error={!!errors.password}
            autoComplete="current-password"
            {...register("password", { required: "กรุณากรอก Password" })}
          />
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
