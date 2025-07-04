
import { Idea, User, IdeaStatus } from '../types.ts';

const users: User[] = [
  { id: 'u1', name: 'Ana Silva', department: 'Engenharia' },
  { id: 'u2', name: 'Bruno Costa', department: 'Marketing' },
  { id: 'u3', name: 'Carlos Dias', department: 'RH' },
  { id: 'u4', name: 'Daniela Rocha', department: 'Vendas' },
];

let ideas: Idea[] = [
  {
    id: 'i1',
    title: 'Gamificação no Onboarding',
    description: 'Criar um sistema de pontos e recompensas para novos funcionários durante o processo de onboarding para aumentar o engajamento.',
    benefits: 'Melhora a experiência do novo colaborador e acelera a integração com a cultura da empresa.',
    submittedBy: 'u1',
    submittedAt: new Date(2023, 10, 15),
    status: IdeaStatus.IMPLEMENTADA,
    baitaCoins: 500,
    committeeNotes: 'Excelente ideia, implementação aprovada e concluída com sucesso.'
  },
  {
    id: 'i2',
    title: 'Café da Manhã Temático Semanal',
    description: 'Toda sexta-feira, ter um café da manhã com um tema diferente (ex: regional, internacional) para promover a integração entre as equipes.',
    benefits: 'Aumenta a socialização e melhora o ambiente de trabalho.',
    submittedBy: 'u2',
    submittedAt: new Date(2024, 0, 20),
    status: IdeaStatus.IMPLEMENTACAO,
    committeeNotes: 'Aprovado. A equipe de RH está organizando o cronograma.'
  },
  {
    id: 'i3',
    title: 'Automatizar Relatório de Vendas',
    description: 'Desenvolver um script para automatizar a geração do relatório semanal de vendas, economizando tempo da equipe.',
    benefits: 'Redução de 3 horas de trabalho manual por semana e diminuição de erros.',
    submittedBy: 'u4',
    submittedAt: new Date(2024, 1, 5),
    status: IdeaStatus.APROVADA,
  },
  {
    id: 'i4',
    title: 'Mentoria Reversa',
    description: 'Criar um programa onde colaboradores mais jovens mentoram os mais experientes em novas tecnologias e mídias sociais.',
    benefits: 'Promove a troca de conhecimento intergeracional e a atualização da equipe.',
    submittedBy: 'u3',
    submittedAt: new Date(2024, 1, 10),
    status: IdeaStatus.ANALISE,
  },
  {
    id: 'i5',
    title: 'Plataforma de Caronas',
    description: 'Um app interno para organizar caronas entre os colaboradores, visando sustentabilidade e economia.',
    benefits: 'Reduz a emissão de carbono, diminui custos de transporte e promove networking.',
    submittedBy: 'u1',
    submittedAt: new Date(2024, 2, 1),
    status: IdeaStatus.NOVA,
  },
  {
    id: 'i6',
    title: 'Instalar uma máquina de sorvete',
    description: 'Colocar uma máquina de sorvete na copa para os dias de calor.',
    benefits: 'Alegria e felicidade geral.',
    submittedBy: 'u2',
    submittedAt: new Date(2024, 2, 5),
    status: IdeaStatus.REJEITADA,
    committeeNotes: 'Custo de manutenção elevado e não alinhado com as prioridades atuais.'
  },
];

const simulateDelay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(JSON.parse(JSON.stringify(data)));
        }, 500);
    });
};

export const getIdeas = async (): Promise<Idea[]> => {
    return simulateDelay(ideas);
};

export const getUsers = async (): Promise<User[]> => {
    return simulateDelay(users);
};

export const addIdea = async (ideaData: Omit<Idea, 'id' | 'submittedAt' | 'status'>): Promise<Idea> => {
    const newIdea: Idea = {
        ...ideaData,
        id: `i${Date.now()}`,
        submittedAt: new Date(),
        status: IdeaStatus.NOVA,
    };
    ideas.unshift(newIdea);
    return simulateDelay(newIdea);
};

export const updateIdea = async (ideaId: string, updates: Partial<Idea>): Promise<Idea> => {
    let updatedIdea: Idea | undefined;
    ideas = ideas.map(idea => {
        if (idea.id === ideaId) {
            updatedIdea = { ...idea, ...updates };
            return updatedIdea;
        }
        return idea;
    });
    if (!updatedIdea) {
        throw new Error("Idea not found");
    }
    return simulateDelay(updatedIdea);
};