"use client";
import Button from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Checkbox from "@/components/ui/inputs/Checkbox";
import TextField from "@/components/ui/inputs/TextField";
import {
  PasswordRestForm,
  SignUpForm,
  passwordRestSchema,
  signupSchema,
} from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const PasswordReset = () => {
  const form = useForm<PasswordRestForm>({
    resolver: zodResolver(passwordRestSchema),
  });

  const submit = async (data: PasswordRestForm) => {};

  return (
    <Form {...form}>
      <form className="flex-1" onSubmit={form.handleSubmit(submit)}>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirm-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </form>
    </Form>
  );
};

export default PasswordReset;
