
import React from 'react';
import { Idea, IdeaStatus, User } from '../types.ts';
import KanbanColumn from './KanbanColumn.tsx';

interface KanbanBoardProps {
  ideas: Idea[];
  users: User[];
  onSelectIdea: (idea: Idea) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ ideas, users, onSelectIdea }) => {
  const columns: IdeaStatus[] = [
    IdeaStatus.NOVA,
    IdeaStatus.ANALISE,
    IdeaStatus.APROVADA,
    IdeaStatus.IMPLEMENTACAO,
    IdeaStatus.IMPLEMENTADA,
    IdeaStatus.REJEITADA,
  ];

  const getIdeasForColumn = (status: IdeaStatus) => {
    return ideas
      .filter(idea => idea.status === status)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  };

  return (
    <div>
       <h2 className="text-2xl font-bold text-gray-700 mb-6">Fluxo de Ideias</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {columns.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            ideas={getIdeasForColumn(status)}
            users={users}
            onSelectIdea={onSelectIdea}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;