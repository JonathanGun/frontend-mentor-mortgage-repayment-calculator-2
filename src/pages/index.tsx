import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import "../styles/global.css";

const IndexPage: React.FC<PageProps> = ({ location }) => {
  return <div>tmp</div>;
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Frontend Mentor | Mortgage Repayment Calculator</title>
);
