"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function StepOneCreate() {
  const { resume, setResume, saveResume } = useResume();
  const { isSignedIn } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveResume();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedResume = { ...resume, [name]: value };

    setResume(updatedResume);
    if (isSignedIn) {
      localStorage.setItem("resume", JSON.stringify(updatedResume));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-5 shadow-lg border-t-4 border-border rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold">Personal Information</h2>

      <Input
        name="name"
        value={resume.name}
        onChange={handleChange}
        placeholder="Your full name"
        type="text"
        required
        autoFocus
      />
      <Input
        name="job"
        value={resume.job}
        onChange={handleChange}
        placeholder="Job title"
        type="text"
        required
      />
      <Input
        name="address"
        value={resume.address}
        onChange={handleChange}
        placeholder="Address"
        type="text"
        required
      />
      <Input
        name="phone"
        value={resume.phone}
        onChange={handleChange}
        placeholder="Phone number"
        type="tel"
        required
      />
      <Input
        name="email"
        value={resume.email}
        onChange={handleChange}
        placeholder="Email address"
        type="email"
        required
      />

      <div className="flex justify-end pt-4">
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <Button variant="default">Sign in to save</Button>
          </SignInButton>
        ) : (
          <Button type="submit" variant="default">
            Save & Continue
          </Button>
        )}
      </div>
    </form>
  );
}
