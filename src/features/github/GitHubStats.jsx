import React, { useEffect, useState } from 'react';
import { Star, GitFork, Activity } from 'lucide-react';

const Github = ({size=20}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.2 5.2 0 0 0-1.45-3.8 4.9 4.9 0 0 0-.16-3.7s-1.13-.36-3.68 1.36a12.5 12.5 0 0 0-6.6 0C6.13 2 5 2 5 2a4.9 4.9 0 0 0-.16 3.7A5.2 5.2 0 0 0 3.39 9.5c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8.89 19.7v4.3"/><path d="M8 19c-3 1-4-1-5-1"/></svg>
);

export default function GitHubStats({ username }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
        ]);

        if (userRes.ok && reposRes.ok) {
          const user = await userRes.json();
          const repos = await reposRes.json();
          
          setStats({ user, repos });
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHub();
  }, [username]);

  if (loading || !stats) return null;

  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-surface p-6 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6">
        <Github className="text-accent-light" size={24} />
        <h3 className="text-xl font-bold text-white">Live GitHub Activity</h3>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 border-r border-white/10 pr-6">
           <img src={stats.user.avatar_url} alt="GitHub Avatar" className="w-16 h-16 rounded-full border border-accent" />
           <div>
             <h4 className="text-white font-bold">{stats.user.name || username}</h4>
             <p className="text-sm text-muted">{stats.user.public_repos} Public Repos</p>
             <p className="text-sm text-muted">{stats.user.followers} Followers</p>
           </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-mono text-accent-light">Recently Updated</h4>
          {stats.repos.map(repo => (
            <a 
              key={repo.id} 
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer"
              className="group block rounded-lg border border-white/5 bg-white/5 p-3 transition-colors hover:border-accent-light/50 hover:bg-white/10"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium group-hover:text-accent-light transition-colors">{repo.name}</span>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                </div>
              </div>
              <p className="text-xs text-muted truncate">{repo.description || 'No description provided.'}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
