"use client";
import { cn } from "@/utils/cn";
import { Typography, TypographyProps, styled, Skeleton } from "@mui/material";
import React, { PropsWithChildren } from "react";

type Props = TypographyProps & PropsWithChildren;
interface TextProps extends Props {
  loading?: boolean;
}

const TypographyStyled = styled(Typography)<TextProps>(({ theme }) => ({}));

const Text: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <TypographyStyled className={cn(rest.className)} {...rest}>
      {rest.loading ? <Skeleton variant="text" /> : children}
    </TypographyStyled>
  );
};

export default Text;
