import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useResume } from "@/context/resume";

export default function DownloadPage({ params }) {
  const { resume } = useResume();
  const [currentResume, setCurrentResume] = React.useState(null);

  React.useEffect(() => {});
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h2 className="font-bold text-2xl mb-2 text-gray-800">
          Congrats! Your AI-based Resume is ready!
        </h2>
        <p className="text-gray-600">
          You can now download, print, or share it with anyone.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-10 mt-16">
          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/1091/1091007.png"
              width={50}
              height={50}
              alt="Download Icon"
            />
            <Button className="my-2">Download</Button>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/3003/3003232.png"
              width={50}
              height={50}
              alt="Print Icon"
            />
            <Button className="my-2">Print</Button>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/10309/10309262.png"
              width={50}
              height={50}
              alt="Share Icon"
            />
            <Button className="my-2">Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
