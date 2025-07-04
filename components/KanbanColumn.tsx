
import React from 'react';
import { Idea, IdeaStatus, User } from '../types.ts';
import IdeaCard from './IdeaCard.tsx';

interface KanbanColumnProps {
  status: IdeaStatus;
  ideas: Idea[];
  users: User[];
  onSelectIdea: (idea: Idea) => void;
}

const statusConfig = {
    [IdeaStatus.NOVA]: { title: 'Novas Ideias', color: 'bg-status-new' },
    [IdeaStatus.ANALISE]: { title: 'Em Análise', color: 'bg-status-analysis' },
    [IdeaStatus.APROVADA]: { title: 'Aprovadas', color: 'bg-status-approved' },
    [IdeaStatus.REJEITADA]: { title: 'Rejeitadas', color: 'bg-status-rejected' },
    [IdeaStatus.IMPLEMENTACAO]: { title: 'Em Implementação', color: 'bg-status-implementation' },
    [IdeaStatus.IMPLEMENTADA]: { title: 'Implementadas', color: 'bg-status-implemented' },
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, ideas, users, onSelectIdea }) => {
  const config = statusConfig[status];

  return (
    <div className="bg-slate-100 rounded-xl p-4 flex flex-col min-h-[200px]">
        <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center space-x-2`}>
                <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                <h3 className="font-bold text-gray-700 text-lg">{config.title}</h3>
            </div>
            <span className="bg-slate-200 text-slate-600 font-bold text-sm px-2.5 py-1 rounded-full">
                {ideas.length}
            </span>
        </div>
        <div className="space-y-4 overflow-y-auto flex-grow">
            {ideas.length === 0 ? (
                <div className="text-center text-gray-500 pt-10">
                    <p>Nenhuma ideia aqui.</p>
                </div>
            ) : (
                ideas.map(idea => (
                    <IdeaCard
                        key={idea.id}
                        idea={idea}
                        user={users.find(u => u.id === idea.submittedBy)}
                        onSelect={() => onSelectIdea(idea)}
                    />
                ))
            )}
        </div>
    </div>
  );
};

export default KanbanColumn;