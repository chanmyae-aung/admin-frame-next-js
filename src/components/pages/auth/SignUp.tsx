"use client";
import Button from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Checkbox from "@/components/ui/inputs/Checkbox";
import TextField from "@/components/ui/inputs/TextField";
import { SignUpForm, signupSchema } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const SignUp = () => {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
  });

  const submit = async (data: SignUpForm) => {};

  return (
    <Form {...form}>
      <form className="flex-1" onSubmit={form.handleSubmit(submit)}>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Form>
  );
};

export default SignUp;
