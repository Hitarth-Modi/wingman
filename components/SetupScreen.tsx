"use client";

import { FormEvent, useState } from "react";
import type { Prospect } from "@/types/conversation";
import { GumletLogo } from "./GumletLogo";

type SetupScreenProps = {
  initialProspect: Prospect;
  onStartCall: (prospect: Prospect) => void;
};

const industries = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "edtech", label: "EdTech" },
  { value: "consumer_apps", label: "B2C / Consumer Apps" },
];

const jobTitles = [
  "Founder / CEO",
  "CTO",
  "VP Engineering",
  "Engineering Manager",
  "Product",
  "Marketing",
  "Growth",
  "Other",
];

const companySizes = ["1-50", "51-200", "201-500", "501-1,000", "1,000+"];

export function SetupScreen({ initialProspect, onStartCall }: SetupScreenProps) {
  const [prospect, setProspect] = useState(initialProspect);
  const unsupportedIndustry = prospect.industry && prospect.industry !== "ecommerce";
  const canStart = prospect.industry === "ecommerce" && Boolean(prospect.jobTitle);

  function updateProspect(field: keyof Prospect, value: string) {
    setProspect((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (canStart) {
      onStartCall(prospect);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7fb] px-5 py-6 text-[#17121f] sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-center">
        <div className="mb-8">
          <GumletLogo />
          <h1 className="mt-2 text-4xl font-semibold tracking-normal text-[#17121f] sm:text-5xl">
            Gumlet CallPilot
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-[#615a6b]">
            Your live guide for first sales calls.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-lg border border-[#dedbe7] bg-white p-5 shadow-[0_12px_40px_rgba(33,24,55,0.08)] sm:p-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[#332a42]">
              Industry
              <select
                className="h-12 rounded-md border border-[#d8d4e2] bg-white px-3 text-base text-[#17121f] outline-none transition focus:border-[#6d35c7] focus:ring-4 focus:ring-[#6d35c7]/10"
                value={prospect.industry}
                onChange={(event) => updateProspect("industry", event.target.value)}
                required
              >
                <option value="">Select industry</option>
                {industries.map((industry) => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#332a42]">
              Prospect Job Title
              <select
                className="h-12 rounded-md border border-[#d8d4e2] bg-white px-3 text-base text-[#17121f] outline-none transition focus:border-[#6d35c7] focus:ring-4 focus:ring-[#6d35c7]/10"
                value={prospect.jobTitle}
                onChange={(event) => updateProspect("jobTitle", event.target.value)}
                required
              >
                <option value="">Select job title</option>
                {jobTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#332a42]">
              Company Size
              <select
                className="h-12 rounded-md border border-[#d8d4e2] bg-white px-3 text-base text-[#17121f] outline-none transition focus:border-[#6d35c7] focus:ring-4 focus:ring-[#6d35c7]/10"
                value={prospect.companySize}
                onChange={(event) => updateProspect("companySize", event.target.value)}
              >
                <option value="">Select company size</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#332a42]">
              Prospect Company Name
              <input
                className="h-12 rounded-md border border-[#d8d4e2] bg-white px-3 text-base text-[#17121f] outline-none transition placeholder:text-[#9a94a7] focus:border-[#6d35c7] focus:ring-4 focus:ring-[#6d35c7]/10"
                value={prospect.company}
                onChange={(event) => updateProspect("company", event.target.value)}
                placeholder="Acme Inc."
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#332a42] sm:col-span-2">
              Prospect Name
              <input
                className="h-12 rounded-md border border-[#d8d4e2] bg-white px-3 text-base text-[#17121f] outline-none transition placeholder:text-[#9a94a7] focus:border-[#6d35c7] focus:ring-4 focus:ring-[#6d35c7]/10"
                value={prospect.name}
                onChange={(event) => updateProspect("name", event.target.value)}
                placeholder="Optional"
              />
            </label>
          </div>

          <aside className="flex flex-col justify-between rounded-md border border-[#ebe8f1] bg-[#fbfafc] p-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6d35c7]">
                V1 flow
              </p>
              <p className="mt-3 text-2xl font-semibold text-[#20172f]">
                Read. Say. Listen. Click.
              </p>
              <p className="mt-3 text-sm leading-6 text-[#615a6b]">
                The first working version uses a local e-commerce branching flow.
                EdTech and consumer app playbooks are placeholders until approved
                content is added.
              </p>
              {unsupportedIndustry ? (
                <p className="mt-4 rounded-md border border-[#eadcc4] bg-[#fff8ed] px-3 py-2 text-sm font-medium text-[#77501b]">
                  Conversation flow coming soon for this industry.
                </p>
              ) : null}
            </div>

            <button
              className="mt-6 h-12 rounded-md bg-[#6d35c7] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_22px_rgba(109,53,199,0.25)] transition hover:bg-[#5c2bad] focus:outline-none focus:ring-4 focus:ring-[#6d35c7]/20 disabled:cursor-not-allowed disabled:bg-[#b9adc9] disabled:shadow-none"
              disabled={!canStart}
              type="submit"
            >
              Start Call
            </button>
          </aside>
        </form>
      </section>
    </main>
  );
}
