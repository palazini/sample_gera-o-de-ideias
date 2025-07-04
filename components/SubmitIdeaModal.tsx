
import React, { useState } from 'react';
import { Idea, User } from '../types.ts';
import { XMarkIcon } from './Icons.tsx';

interface SubmitIdeaModalProps {
  onClose: () => void;
  onSubmit: (ideaData: Omit<Idea, 'id' | 'submittedAt' | 'status'>) => Promise<void>;
  users: User[];
}

const SubmitIdeaModal: React.FC<SubmitIdeaModalProps> = ({ onClose, onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [submittedBy, setSubmittedBy] = useState<string>(users.length > 0 ? users[0].id : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = title && description && benefits && submittedBy;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setError('');
    try {
      await onSubmit({ title, description, benefits, submittedBy });
    } catch (err) {
      setError('Falha ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Compartilhe sua Baita Ideia!</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="submittedBy" className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
              <select
                id="submittedBy"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
              >
                {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título da Ideia</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Gamificação no Onboarding"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descreva sua Ideia</label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalhe como a ideia funcionaria na prática."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">Potenciais Benefícios</label>
              <textarea
                id="benefits"
                rows={3}
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="Quais os ganhos esperados? (Ex: economia de tempo, melhoria de processos, etc.)"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition hover:bg-brand-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Ideia'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitIdeaModal;