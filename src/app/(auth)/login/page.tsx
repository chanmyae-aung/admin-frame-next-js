import AuthLayout from "@/components/layout/AuthLayout";
import Login from "@/components/pages/auth/Login";
import { NextPage } from "next";
import React from "react";

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title="Sign In">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
