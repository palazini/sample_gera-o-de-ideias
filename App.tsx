
import React, { useState, useEffect, useCallback } from 'react';
import { Idea, User, IdeaStatus } from './types.ts';
import { getIdeas, getUsers, addIdea, updateIdea } from './services/mockService.ts';
import Header from './components/Header.tsx';
import KanbanBoard from './components/KanbanBoard.tsx';
import Leaderboard from './components/Leaderboard.tsx';
import SubmitIdeaModal from './components/SubmitIdeaModal.tsx';
import IdeaModal from './components/IdeaModal.tsx';
import { LoadingSpinner } from './components/Icons.tsx';

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [ideasData, usersData] = await Promise.all([getIdeas(), getUsers()]);
      // Convert date strings back to Date objects
      const parsedIdeas = ideasData.map(idea => ({...idea, submittedAt: new Date(idea.submittedAt)}));
      setIdeas(parsedIdeas);
      setUsers(usersData);
    } catch (e) {
      setError('Falha ao carregar os dados. Tente novamente mais tarde.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleAddIdea = async (ideaData: Omit<Idea, 'id' | 'submittedAt' | 'status'>) => {
    try {
      const newIdea = await addIdea(ideaData);
      setIdeas(prev => [{...newIdea, submittedAt: new Date(newIdea.submittedAt)}, ...prev]);
      setIsSubmitModalOpen(false);
    } catch (e) {
      console.error('Failed to add idea:', e);
      setError('Não foi possível enviar a sua ideia. Tente novamente.');
    }
  };

  const handleUpdateIdea = async (ideaId: string, updates: Partial<Idea>) => {
    try {
      const updatedIdea = await updateIdea(ideaId, updates);
      setIdeas(prev => prev.map(i => (i.id === ideaId ? {...updatedIdea, submittedAt: new Date(updatedIdea.submittedAt)} : i)));
      if (selectedIdea?.id === ideaId) {
        setSelectedIdea({...selectedIdea, ...updates});
      }
    } catch (e) {
      console.error('Failed to update idea:', e);
      setError('Não foi possível atualizar a ideia. Tente novamente.');
    }
  };
  
  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header onNewIdeaClick={() => setIsSubmitModalOpen(true)} />
      <main className="p-4 sm:p-6 lg:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner className="w-12 h-12 text-brand-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <KanbanBoard 
                ideas={ideas} 
                onSelectIdea={setSelectedIdea} 
                users={users}
              />
            </div>
            <div className="lg:col-span-1">
              <Leaderboard ideas={ideas} users={users} />
            </div>
          </div>
        )}
      </main>

      {isSubmitModalOpen && (
        <SubmitIdeaModal
          onClose={() => setIsSubmitModalOpen(false)}
          onSubmit={handleAddIdea}
          users={users}
        />
      )}
      
      {selectedIdea && (
        <IdeaModal
          idea={selectedIdea}
          user={getUserById(selectedIdea.submittedBy)}
          onClose={() => setSelectedIdea(null)}
          onUpdate={handleUpdateIdea}
        />
      )}
    </div>
  );
};

export default App;