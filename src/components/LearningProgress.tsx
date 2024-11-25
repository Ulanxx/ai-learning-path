import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar as CalendarIcon, CheckCircle, Circle, Trophy } from 'lucide-react';
import { LearningPlan, DayPlan } from '../data/mockPlans';
import Certificate from './Certificate';

interface ProgressDay extends DayPlan {
  isChecked: boolean;
  notes: string;
}

export default function LearningProgress({ plan }: { plan: LearningPlan }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<ProgressDay[]>(
    plan.days.map(day => ({ ...day, isChecked: false, notes: '' }))
  );
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentDay, setCurrentDay] = useState<ProgressDay | null>(null);

  const completedDays = progress.filter(day => day.isChecked).length;
  const isCompleted = completedDays === progress.length;

  const handleCheckIn = (day: ProgressDay) => {
    setProgress(prev =>
      prev.map(d =>
        d.day === day.day ? { ...d, isChecked: true } : d
      )
    );
    setCurrentDay(day);
  };

  const handleSaveNotes = (notes: string) => {
    if (!currentDay) return;
    setProgress(prev =>
      prev.map(d =>
        d.day === currentDay.day ? { ...d, notes } : d
      )
    );
    setCurrentDay(null);
  };

  if (showCertificate) {
    return <Certificate plan={plan} onBack={() => setShowCertificate(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{t('plan.progress.title')}</h2>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{completedDays}</div>
              <div className="text-sm text-gray-600">{t('plan.progress.completed')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">{progress.length - completedDays}</div>
              <div className="text-sm text-gray-600">{t('plan.progress.remaining')}</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {progress.map((day) => (
            <div
              key={day.day}
              className={`p-6 rounded-xl ${
                day.isChecked
                  ? 'bg-green-50 border border-green-100'
                  : day.isMilestone
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t('plan.day')} {day.day}
                  </h3>
                  {day.isMilestone && (
                    <Trophy className="w-5 h-5 text-yellow-500 ml-2" />
                  )}
                </div>
                <button
                  onClick={() => handleCheckIn(day)}
                  disabled={day.isChecked}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    day.isChecked
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {day.isChecked ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {t('plan.progress.checked')}
                    </>
                  ) : (
                    <>
                      <Circle className="w-5 h-5 mr-2" />
                      {t('plan.progress.checkIn')}
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4">
                <p className="text-gray-700">{day.content}</p>
                {day.notes && (
                  <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-600">{day.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {isCompleted && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowCertificate(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              <Trophy className="w-6 h-6 mr-2" />
              {t('plan.certificate.title')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}