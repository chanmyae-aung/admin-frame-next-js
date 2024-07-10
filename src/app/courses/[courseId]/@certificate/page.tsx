"use client";
import dynamic from "next/dynamic";
import Loading from "./loading";

const ContentCertificate = dynamic(
  () => import("@/components/pages/courses/Content"),
  { loading: () => <Loading />, ssr: false }
);
export default function CertificatePage() {
  return <ContentCertificate />;
}
