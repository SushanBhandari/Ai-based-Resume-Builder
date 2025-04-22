import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build Stunning Resumes Instantly with{" "}
            <span className="text-yellow-300">AI</span>
          </h1>
          <p className="text-lg md:text-xl">
            Generate, customize, and share professional resumes powered by AI.
            Just focus on your career, we handle the design.
          </p>
          <div className="space-x-6">
            <Link href="/resume/create">
              <Button
                size="xl"
                className="bg-yellow-400 hover:bg-yellow-300 text-black text-lg px-40 py-8"
              >
                Get Started
              </Button>
            </Link>
            {/* <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-6"
            >
              See Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button> */}
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <Image
            src="/landing-resume-preview.png"
            alt="Resume Preview"
            width={500}
            height={400}
            className="rounded-xl shadow-2xl"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "1. Input Details",
              desc: "Fill in your info or import directly from LinkedIn.",
            },
            {
              title: "2. Generate Resume",
              desc: "Our AI crafts a resume tailored to your profile.",
            },
            {
              title: "3. Customize & Share",
              desc: "Edit as you like, download or share instantly.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="text-4xl font-bold text-indigo-500 mb-4">
                {step.title}
              </div>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "AI Powered Writing", icon: "🤖" },
            { title: "Easy Customization", icon: "🎨" },
            { title: "LinkedIn Import", icon: "🔗" },
            { title: "1-Click Share", icon: "📤" },
          ].map((feat, i) => (
            <div key={i} className="bg-indigo-100 p-6 rounded-xl text-center">
              <div className="text-5xl mb-4">{feat.icon}</div>
              <h3 className="text-xl font-semibold">{feat.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-20 bg-indigo-600 text-white text-center rounded-t-3xl">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Create Your Resume?
        </h2>
        <p className="mb-8 text-lg">
          Start building your dream career with a stunning resume. It’s free and
          takes less than 2 minutes.
        </p>
        <Link href="/resume/create">
          <Button
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-black text-lg px-8 py-6"
          >
            Create My Resume
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-20 bg-gray-100 text-gray-600 text-sm text-center">
        &copy; {new Date().getFullYear()} ResumeGen AI. All rights reserved.
      </footer>
    </div>
  );
}
