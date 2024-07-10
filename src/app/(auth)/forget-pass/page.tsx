import AuthLayout from "@/components/layout/AuthLayout";
import ForgetPassword from "@/components/pages/auth/ForgetPassword";
import Login from "@/components/pages/auth/Login";
import { NextPage } from "next";
import React from "react";

const ForgetPasswordPage: NextPage = () => {
  return (
    <AuthLayout title="Forget Password">
      <ForgetPassword />
    </AuthLayout>
  );
};

export default ForgetPasswordPage;
