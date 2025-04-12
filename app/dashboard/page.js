import React from "react";
import db from "@/utils/db";
export default async function Dashboard() {
  await db();
  return (
    <div>
      <h1>kina protect vayo tailwindcss</h1>
    </div>
  );
}
