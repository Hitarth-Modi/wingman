import "server-only";
import { getProblemTag } from "@/lib/problem-tags.mjs";
import type { IndustryKey } from "@/types/playbook";
import {
  industryLabels,
  problemPlaybooks,
} from "@/data/problemPlaybooks";
import {
  CallPilotContent,
  parseCallPilotSheetPayload,
} from "@/data/sheetPlaybook";

const DEFAULT_SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbz6kYdAnPN15_Kt74eSWhEPWKGZ2XaNWPU8yZY7trXVZMATLey900NEa8ZJjIc0OE1E9w/exec";
const CACHE_MS = 10_000;
const FETCH_TIMEOUT_MS = 12_000;

type CacheEntry = {
  expiresAt: number;
  content: CallPilotContent;
};

let cache: CacheEntry | null = null;

export async function getCallPilotContent(): Promise<CallPilotContent> {
  const fallbackContent = getFallbackContent();
  const token = readEnv("CALLPILOT_SHEET_TOKEN");
  const sheetApiUrl = readEnv("CALLPILOT_SHEET_API_URL") || DEFAULT_SHEET_API_URL;

  if (!token) {
    return fallbackContent;
  }

  if (cache && cache.expiresAt > Date.now()) {
    return cache.content;
  }

  try {
    const content = await fetchSheetContent(sheetApiUrl, token);
    cache = {
      content,
      expiresAt: Date.now() + CACHE_MS,
    };
    return content;
  } catch {
    console.warn("wingman sheet content unavailable; using fallback.");
    return fallbackContent;
  }
}

function getFallbackContent(): CallPilotContent {
  const playbooks = { ...problemPlaybooks };
  for (const industry of Object.keys(playbooks) as IndustryKey[]) {
    playbooks[industry] = {
      ...playbooks[industry],
      problems: playbooks[industry].problems.map((problem) => ({
        ...problem,
        tag: getProblemTag(problem.id),
      })),
    };
  }
  return {
    industryLabels,
    playbooks,
  };
}

async function fetchSheetContent(
  sheetApiUrl: string,
  token: string,
): Promise<CallPilotContent> {
  const url = new URL(sheetApiUrl);
  url.searchParams.set("token", token);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Sheet API returned ${response.status}.`);
    }

    const payload = await response.json();
    if (payload?.error) {
      throw new Error(String(payload.error));
    }

    return parseCallPilotSheetPayload(payload);
  } finally {
    clearTimeout(timeout);
  }
}

function readEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}
