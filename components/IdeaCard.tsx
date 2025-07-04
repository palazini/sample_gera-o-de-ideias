
import React from 'react';
import { Idea, User } from '../types.ts';
import { UserCircleIcon, CalendarIcon } from './Icons.tsx';

interface IdeaCardProps {
  idea: Idea;
  user?: User;
  onSelect: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, user, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg cursor-pointer transition-shadow border border-gray-200"
    >
      <h4 className="font-bold text-gray-800 mb-2 truncate">{idea.title}</h4>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{idea.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2 truncate">
          <UserCircleIcon className="h-4 w-4 text-gray-400" />
          <span className="truncate">{user?.name || 'Desconhecido'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <CalendarIcon className="h-4 w-4 text-gray-400" />
          <span>{idea.submittedAt.toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;