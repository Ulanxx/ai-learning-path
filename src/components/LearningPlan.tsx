import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Link as LinkIcon, Medal, Download, ArrowRight } from 'lucide-react';
import { generateMockPlan } from '../data/mockPlans';
import LearningProgress from './LearningProgress';

export default function LearningPlan() {
  const { t } = useTranslation();
  const location = useLocation();
  const formData = location.state;
  const [showProgress, setShowProgress] = useState(false);

  if (!formData) {
    return <Navigate to="/" replace />;
  }

  const plan = generateMockPlan(
    formData.learningGoal,
    formData.currentLevel,
    parseFloat(formData.dailyHours)
  );

  if (showProgress) {
    return <LearningProgress plan={plan} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('plan.title')}</h1>
            <p className="text-gray-600">
              {t('plan.basedOn')} {plan.goal}
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              {t('plan.export')}
            </button>
            <button
              onClick={() => setShowProgress(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t('plan.startPlan')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {plan.days.map((day) => (
            <div
              key={day.day}
              className={`p-6 rounded-xl ${
                day.isMilestone
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t('plan.day')} {day.day}
                  </h3>
                  {day.isMilestone && (
                    <div className="ml-3 flex items-center">
                      <Medal className="w-5 h-5 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-yellow-600">
                        {t('plan.milestone')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">{day.content}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2 text-indigo-600" />
                    {t('plan.resources')}
                  </h4>
                  <ul className="space-y-1">
                    {day.resources.map((resource, index) => (
                      <li key={index}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 hover:underline"
                        >
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}