"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@/components/ui/inputs/TextField";
import Button from "@/components/ui/button";
import { IconButton, InputAdornment, Paper } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordResetSimple() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
  };

  return (
    <Container component="main" maxWidth="sm" className="h-screen">
      <Grid container className="p-4">
        <Paper className="p-6 items-center justify-center w-full">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Password Reset
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              className="w-full"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="Confirm password"
                autoComplete="password"
                // endAdornment={
                //   <InputAdornment position="end">
                //     <IconButton
                //       aria-label="toggle password visibility"
                //       onClick={handleClickShowPassword}
                //       onMouseDown={handleMouseDownPassword}
                //       edge="end"
                //     >
                //       {showPassword ? <VisibilityOff /> : <Visibility />}
                //     </IconButton>
                //   </InputAdornment>
                // }
              />

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
        </Paper>
      </Grid>
    </Container>
  );
}
