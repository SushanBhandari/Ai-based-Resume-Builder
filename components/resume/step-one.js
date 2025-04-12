import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";

function StepOne() {
  const { resume, setResume } = useResume();
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(resume);
    //save resume to moongoose
    //go to next steps
  };
  return (
    <div className="w-full lg:w-1/2 p=5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>
      <form onSubmit={handelSubmit}>
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, name: e.target.value })}
          value={resume.name}
          placeholder="your name"
          type="text"
          autoFocus
          required
        />
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, job: e.target.value })}
          value={resume.job}
          placeholder="Job title"
          type="text"
          required
        />
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, address: e.target.value })}
          value={resume.address}
          placeholder="Address"
          type="text"
          required
        />
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, phone: e.target.value })}
          value={resume.phone}
          placeholder="Phone number"
          type="number"
          required
        />
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, email: e.target.value })}
          value={resume.email}
          placeholder="Email"
          type="email"
          required
        />
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
}

export default StepOne;
