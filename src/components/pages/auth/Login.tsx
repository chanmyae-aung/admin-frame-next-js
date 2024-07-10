"use client";
import React, { startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Box, Typography } from "@mui/material";
import TextField from "@/components/ui/inputs/TextField";
import { loginSchema } from "@/components/shared/schema";
import { useLogin } from "@/services/login";
import { useSessionLogin } from "@/lib/session";
import { LoginForm } from "@/types/login";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  SEVERITY,
  useSnackbar,
} from "@/components/ui/snackbar/SnackbarContext";

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Use "onChange" to validate on input change
  });
  const { showMessage } = useSnackbar();
  const { trigger: loginTrigger, isMutating } = useLogin();
  const { trigger: triggerSessionLogin, isMutating: sessionMutating } =
    useSessionLogin();

  const onSubmit = async (data: LoginForm) => {
    await loginTrigger(
      { ...data },
      {
        onSuccess: async (res) => {
          router.refresh();
          const { token } = res.data;
          const decoded = jwtDecode(token);
          const tokenExpired = decoded?.exp ?? 1;
          await triggerSessionLogin({ ...data, tokenExpired });
          startTransition(() => {
            router.push("/dashboard");
          });
        },
        onError: (err) => {
          const message = err.response.data.message;
          showMessage({ message, severity: SEVERITY.ERROR });
          startTransition(() => {
            router.push("/login");
          });
        },
      }
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        margin: "auto",
        marginTop: 5,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        // label="Email"
        margin="normal"
        placeholder="example@gmail.com"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
      />
      <TextField
        // label="Password"
        type="password"
        margin="normal"
        placeholder="********"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
        sx={{ marginTop: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
