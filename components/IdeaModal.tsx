
import React, { useState } from 'react';
import { Idea, User, IdeaStatus } from '../types.ts';
import { XMarkIcon, UserCircleIcon, CalendarIcon, ChatBubbleLeftRightIcon, TrophyIcon } from './Icons.tsx';

interface IdeaModalProps {
  idea: Idea;
  user?: User;
  onClose: () => void;
  onUpdate: (ideaId: string, updates: Partial<Idea>) => Promise<void>;
}

const statusConfig: Record<IdeaStatus, { text: string; bg: string; text_color: string }> = {
    [IdeaStatus.NOVA]: { text: 'Nova', bg: 'bg-status-new/20', text_color: 'text-yellow-700' },
    [IdeaStatus.ANALISE]: { text: 'Em Análise', bg: 'bg-status-analysis/20', text_color: 'text-blue-700' },
    [IdeaStatus.APROVADA]: { text: 'Aprovada', bg: 'bg-status-approved/20', text_color: 'text-emerald-700' },
    [IdeaStatus.REJEITADA]: { text: 'Rejeitada', bg: 'bg-status-rejected/20', text_color: 'text-red-700' },
    [IdeaStatus.IMPLEMENTACAO]: { text: 'Em Implementação', bg: 'bg-status-implementation/20', text_color: 'text-violet-700' },
    [IdeaStatus.IMPLEMENTADA]: { text: 'Implementada', bg: 'bg-status-implemented/20', text_color: 'text-green-700' },
};


const IdeaModal: React.FC<IdeaModalProps> = ({ idea, user, onClose, onUpdate }) => {
    const [committeeNotes, setCommitteeNotes] = useState(idea.committeeNotes || '');
    const [baitaCoins, setBaitaCoins] = useState(idea.baitaCoins || 0);

    const handleStatusChange = (newStatus: IdeaStatus) => {
        const updates: Partial<Idea> = { status: newStatus, committeeNotes };
        if(newStatus === IdeaStatus.IMPLEMENTADA) {
            updates.baitaCoins = baitaCoins;
        }
        onUpdate(idea.id, updates).then(onClose);
    }
    
    const renderActions = () => {
        switch (idea.status) {
            case IdeaStatus.NOVA:
                return (
                    <button onClick={() => handleStatusChange(IdeaStatus.ANALISE)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition">Iniciar Análise</button>
                );
            case IdeaStatus.ANALISE:
                return (
                    <div className="flex space-x-2">
                        <button onClick={() => handleStatusChange(IdeaStatus.APROVADA)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition">Aprovar</button>
                        <button onClick={() => handleStatusChange(IdeaStatus.REJEITADA)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition">Rejeitar</button>
                    </div>
                );
            case IdeaStatus.APROVADA:
                return (
                    <button onClick={() => handleStatusChange(IdeaStatus.IMPLEMENTACAO)} className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-lg transition">Iniciar Implementação</button>
                );
            case IdeaStatus.IMPLEMENTACAO:
                return (
                    <button onClick={() => handleStatusChange(IdeaStatus.IMPLEMENTADA)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition" disabled={baitaCoins <= 0}>Concluir e Bonificar</button>
                );
            default:
                return null;
        }
    }
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-full flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
            <div>
                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusConfig[idea.status].bg} ${statusConfig[idea.status].text_color}`}>
                    {statusConfig[idea.status].text}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">{idea.title}</h2>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mt-2">
                    <div className="flex items-center space-x-2">
                        <UserCircleIcon className="h-5 w-5"/> <span>{user?.name || 'Desconhecido'} ({user?.department || 'N/A'})</span>
                    </div>
                     <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5"/> <span>{idea.submittedAt.toLocaleDateString('pt-BR')}</span>
                    </div>
                </div>
            </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
             <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">Descrição da Ideia</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{idea.description}</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">Potenciais Benefícios</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{idea.benefits}</p>
            </div>
             <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center"><ChatBubbleLeftRightIcon className="h-5 w-5 mr-2"/>Anotações do Comitê</h3>
                <textarea
                    rows={3}
                    value={committeeNotes}
                    onChange={(e) => setCommitteeNotes(e.target.value)}
                    placeholder="Adicione notas sobre a análise, aprovação ou rejeição..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
                    disabled={idea.status === IdeaStatus.IMPLEMENTADA || idea.status === IdeaStatus.REJEITADA}
                />
            </div>
            {(idea.status === IdeaStatus.IMPLEMENTACAO || idea.status === IdeaStatus.IMPLEMENTADA) && (
                 <div>
                    <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center"><TrophyIcon className="h-5 w-5 mr-2 text-yellow-500"/>Baita Coins</h3>
                    <input
                        type="number"
                        value={baitaCoins}
                        onChange={(e) => setBaitaCoins(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
                        disabled={idea.status === IdeaStatus.IMPLEMENTADA}
                    />
                </div>
            )}
        </div>
        
        <div className="p-6 bg-gray-50 rounded-b-xl flex justify-end">
            {renderActions()}
        </div>
      </div>
    </div>
  );
};

export default IdeaModal;