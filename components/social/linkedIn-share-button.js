"use client";

import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

export default function LinkedInShareButton({ resumeId }) {
  if (!resumeId) return null; // Prevent error if resumeId is undefined

  const resumeLink = `${window.location.origin}/resume/${resumeId}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    resumeLink
  )}`;

  const handleShare = () => {
    window.open(linkedInShareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button onClick={handleShare} variant="outline">
      <Linkedin className="mr-2" /> Share on LinkedIn
    </Button>
  );
}
