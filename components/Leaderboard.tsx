
import React, { useMemo } from 'react';
import { Idea, User, IdeaStatus } from '../types.ts';
import { TrophyIcon, StarIcon } from './Icons.tsx';

interface LeaderboardProps {
  ideas: Idea[];
  users: User[];
}

interface LeaderboardEntry {
  user: User;
  score: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ ideas, users }) => {
  const leaderboardData = useMemo<LeaderboardEntry[]>(() => {
    const scores = new Map<string, number>();

    ideas.forEach(idea => {
      if (idea.status === IdeaStatus.IMPLEMENTADA && idea.baitaCoins) {
        const currentScore = scores.get(idea.submittedBy) || 0;
        scores.set(idea.submittedBy, currentScore + idea.baitaCoins);
      }
    });

    return Array.from(scores.entries())
      .map(([userId, score]) => ({
        user: users.find(u => u.id === userId)!,
        score,
      }))
      .filter(entry => entry.user) // Filter out entries where user might not be found
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Top 10
  }, [ideas, users]);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <TrophyIcon className="w-6 h-6 text-yellow-400" />;
    if (rank === 1) return <TrophyIcon className="w-6 h-6 text-gray-400" />;
    if (rank === 2) return <TrophyIcon className="w-6 h-6 text-yellow-600" />;
    return <span className="text-gray-500 font-bold w-6 text-center">{rank + 1}</span>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-700 mb-1 flex items-center">
        <StarIcon className="h-6 w-6 mr-2 text-yellow-500" />
        Top Inovadores
      </h2>
      <p className="text-sm text-gray-500 mb-6">Ranking por Baita Coins</p>

      {leaderboardData.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
            <p>Ainda não há ideias bonificadas.</p>
            <p className="text-sm">Seja o primeiro a aparecer aqui!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {leaderboardData.map((entry, index) => (
            <li key={entry.user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getRankIcon(index)}
                <div>
                  <p className="font-semibold text-gray-800">{entry.user.name}</p>
                  <p className="text-sm text-gray-500">{entry.user.department}</p>
                </div>
              </div>
              <div className="flex items-center font-bold text-brand-primary">
                <TrophyIcon className="h-4 w-4 mr-1 text-yellow-500"/>
                {entry.score}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;