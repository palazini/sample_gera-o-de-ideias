
export enum IdeaStatus {
  NOVA = 'Nova',
  ANALISE = 'Em Análise',
  APROVADA = 'Aprovada',
  REJEITADA = 'Rejeitada',
  IMPLEMENTACAO = 'Em Implementação',
  IMPLEMENTADA = 'Implementada',
}

export interface User {
  id: string;
  name: string;
  department: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  benefits: string;
  submittedBy: string; // User ID
  submittedAt: Date;
  status: IdeaStatus;
  committeeNotes?: string;
  baitaCoins?: number;
}
