"use client";

import React from "react";
import { useResume } from "@/context/resume";
import SkeletonCard from "@/components/cards/skeleton-cards";
import ResumeCard from "@/components/cards/resume-card";

export default function Dashboard() {
  const { resumes } = useResume();

  const isLoading = !resumes?.length;

  return (
    <div className="min-h-screen px-5 py-10">
      {isLoading ? (
        <>
          <p className="text-center text-muted-foreground mb-6 text-sm">
            Fetching your resumes...
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {resumes.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
}
