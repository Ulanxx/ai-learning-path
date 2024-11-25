import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Target, Clock, BookOpen } from 'lucide-react';

export default function LearningPlanForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentLevel: '',
    learningGoal: '',
    dailyHours: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/plan', { state: formData });
  };

  const features = [
    {
      icon: <Target className="w-6 h-6 text-indigo-600" />,
      title: t('features.personalizedPath.title'),
      description: t('features.personalizedPath.description')
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: t('features.timeManagement.title'),
      description: t('features.timeManagement.description')
    },
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      title: t('features.trackProgress.title'),
      description: t('features.trackProgress.description')
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('form.title')}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                {t('form.currentLevel.label')}
              </label>
              <input
                type="text"
                placeholder={t('form.currentLevel.placeholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.currentLevel}
                onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
              />
            </div>

            <div>
              <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                <Target className="w-5 h-5 mr-2 text-indigo-600" />
                {t('form.learningGoal.label')}
              </label>
              <textarea
                placeholder={t('form.learningGoal.placeholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                value={formData.learningGoal}
                onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                {t('form.dailyHours.label')}
              </label>
              <input
                type="number"
                min="0.5"
                max="24"
                step="0.5"
                placeholder={t('form.dailyHours.placeholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.dailyHours}
                onChange={(e) => setFormData({ ...formData, dailyHours: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
          >
            {t('form.submit')}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              {feature.icon}
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}