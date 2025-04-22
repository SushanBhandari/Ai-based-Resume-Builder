import React from "react";
import { useResume } from "@/context/resume";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function ResumeCreateNav() {
  const { step, setStep } = useResume();
  const pathname = usePathname();
  const isEditPage = pathname.includes("/edit/");

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "Summary" },
    { id: 3, label: "Experience" },
    { id: 4, label: "Education" },
    { id: 5, label: "Skills" },
  ];

  return (
    <nav className="flex justify-center w-full py-4">
      <div className="flex space-x-4">
        {steps.map(({ id, label }) => {
          const isActive = step === id;
          const isDisabled = !isEditPage && step < id;

          return (
            <Button
              key={id}
              onClick={() => setStep(id)}
              disabled={isDisabled}
              aria-current={isActive ? "step" : undefined}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition 
                ${
                  isActive
                    ? "bg-primary text-white dark:text-slate-800"
                    : "bg-secondary text-gray-700 dark:text-gray-400"
                }
                ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary hover:text-white dark:hover:text-slate-800"
                }
              `}
              title={label} // Optional Tooltip
            >
              {id}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
