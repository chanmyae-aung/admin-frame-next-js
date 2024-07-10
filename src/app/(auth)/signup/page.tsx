import AuthLayout from "@/components/layout/AuthLayout";
import Login from "@/components/pages/auth/Login";
import SignUp from "@/components/pages/auth/SignUp";
import { NextPage } from "next";
import React from "react";

const SignUpPage: NextPage = () => {
  return (
    <AuthLayout title="Sign Up">
      <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;
