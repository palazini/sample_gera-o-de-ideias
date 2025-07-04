
import React from 'react';
import { PlusIcon, LightBulbIcon } from './Icons.tsx';

interface HeaderProps {
  onNewIdeaClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewIdeaClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
             <LightBulbIcon className="h-8 w-8 text-brand-primary"/>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark">
              Geração de Ideias
            </h1>
          </div>
          <button
            onClick={onNewIdeaClick}
            className="flex items-center space-x-2 bg-brand-primary hover:bg-brand-dark text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Submeter Nova Ideia</span>
            <span className="sm:hidden">Nova Ideia</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;