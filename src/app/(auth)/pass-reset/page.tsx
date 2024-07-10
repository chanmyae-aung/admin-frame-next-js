import AuthLayout from "@/components/layout/AuthLayout";
import Login from "@/components/pages/auth/Login";
import PasswordReset from "@/components/pages/auth/PasswordReset";
import { NextPage } from "next";
import React from "react";

const PasswordResetPage: NextPage = () => {
  return (
    <AuthLayout title="Reset Password">
      <PasswordReset />
    </AuthLayout>
  );
};

export default PasswordResetPage;
