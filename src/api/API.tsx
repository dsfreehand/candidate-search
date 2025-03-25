import type { Candidate } from "../interfaces/Candidate.interface";

const BASE_URL = "https://api.github.com";
const apiKey = import.meta.env.VITE_GITHUB_API_KEY; // ✅ Ensure this matches GitHub Secrets & .env.local

const getHeaders = () => ({
  Authorization: apiKey ? `Bearer ${apiKey}` : "",
  Accept: "application/vnd.github.v3+json",
});

const searchGithub = async (): Promise<Candidate[]> => {
  try {
    if (!apiKey) {
      console.warn(
        "⚠️ GitHub API key is missing. Using unauthenticated requests (Rate-limited)."
      );
    }

    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`${BASE_URL}/users?since=${start}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("GitHub API error:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    if (!apiKey) {
      console.warn(
        "⚠️ GitHub API key is missing. Using unauthenticated requests (Rate-limited)."
      );
    }

    const response = await fetch(`${BASE_URL}/users/${username}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("GitHub API error:", err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
