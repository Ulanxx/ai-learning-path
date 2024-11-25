import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import { LearningPlan } from '../data/mockPlans';

interface CertificateProps {
  plan: LearningPlan;
  onBack: () => void;
}

export default function Certificate({ plan, onBack }: CertificateProps) {
  const { t } = useTranslation();
  const date = new Date().toLocaleDateString();

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Progress
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-12 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t('plan.certificate.name')}
          </h1>
          <p className="text-gray-600">{t('plan.certificate.description')}</p>
        </div>

        <div className="max-w-2xl mx-auto border-8 border-double border-indigo-100 p-8 rounded-lg bg-gradient-to-br from-white to-indigo-50">
          <div className="text-center">
            <div className="text-2xl font-serif text-gray-800 mb-8">
              {t('plan.certificate.awarded')}
            </div>
            
            <div className="text-4xl font-bold text-indigo-600 mb-8">
              {plan.userId || "Anonymous Learner"}
            </div>

            <div className="text-xl text-gray-700 mb-8">
              {t('plan.certificate.completion')}
              <div className="font-bold mt-2">{plan.goal}</div>
            </div>

            <div className="text-gray-600 mb-8">
              {t('plan.certificate.date')}: {date}
            </div>

            <div className="w-48 h-1 bg-indigo-600 mx-auto mb-8"></div>

            <div className="italic text-gray-600">
              LearnPath AI Certification
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            {t('plan.certificate.download')}
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Share2 className="w-5 h-5 mr-2" />
            {t('plan.certificate.share')}
          </button>
        </div>
      </div>
    </div>
  );
}