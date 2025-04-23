"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";
import { useUser, SignInButton } from "@clerk/nextjs";
import { HexColorPicker } from "react-colorful";

export default function StepOne() {
  const { resume, setResume, updateResume, setStep } = useResume();
  const { isSignedIn } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume();
    setStep(2); // Move to the next step
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedResume = { ...resume, [name]: value };
    setResume(updatedResume);

    // Only save to localStorage if signed in
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
        placeholder="Your name"
        type="text"
        autoFocus
        required
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
        placeholder="Email"
        type="email"
        required
      />

      {/* Color Picker */}
      <div className="pt-4 space-y-2">
        <label className="block text-sm font-medium">Select Theme Color</label>
        <div className="border border-muted rounded-lg p-4">
          <HexColorPicker
            color={resume.themeColor}
            onChange={(themeColor) => setResume({ ...resume, themeColor })}
          />
        </div>
      </div>

      {/* Save or Sign in */}
      <div className="flex justify-end pt-4">
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <Button type="button">Sign in to save</Button>
          </SignInButton>
        ) : (
          <Button type="submit">Save & Continue</Button>
        )}
      </div>
    </form>
  );
}
