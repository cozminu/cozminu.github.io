import React, { useEffect, useState } from "react";

interface Repo {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  pushed_at: string;
}

const GITHUB_USERNAME = "cozminu";

export default function GitHubStats() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=3`
    )
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="rounded-xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md shadow p-4 flex flex-col gap-2 min-w-[220px]">
      <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-300 mb-2">
        Latest GitHub Activity
      </h4>
      {loading ? (
        <div className="text-xs text-zinc-500">Loading...</div>
      ) : (
        repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
          >
            <div className="font-semibold text-xs text-zinc-800 dark:text-zinc-100">
              {repo.name}
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
              {repo.description || "No description"}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-1">
              ⭐ {repo.stargazers_count} &middot; Last push:{" "}
              {new Date(repo.pushed_at).toLocaleDateString()}
            </div>
          </a>
        ))
      )}
    </div>
  );
}
