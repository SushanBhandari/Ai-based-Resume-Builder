import React from "react";

export default function Summary({ resume }) {
  return <p className="text-xs">{resume.summary}</p>;
}
