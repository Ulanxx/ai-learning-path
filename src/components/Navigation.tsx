import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, BookOpen } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Navigation() {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">{t('nav.title')}</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <Github className="h-5 w-5 mr-2" />
              <span>{t('nav.login')}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}