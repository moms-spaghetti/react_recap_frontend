import React from "react";
import { Link } from "react-router-dom";

export default function ContentManagementButton() {
  return (
    <Link
      className="header-bar-links"
      to="/cms"
      style={{ color: "#000", userSelect: "none" }}
    >
      CMS
    </Link>
  );
}
