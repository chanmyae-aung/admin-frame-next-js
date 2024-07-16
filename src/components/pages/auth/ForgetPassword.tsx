"use client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@/components/ui/inputs/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@/components/ui/button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgetPassword = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (data: LoginForm) => {};

  return (
    <Form {...form}>
      <form className="flex-1" onSubmit={form.handleSubmit(submit)}>
        <Box>
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="text"
                id="email"
              />
            )}
          />

          <Box sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </form>
    </Form>
  );
};

export default ForgetPassword;
