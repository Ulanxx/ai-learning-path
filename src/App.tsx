import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Github, BookOpen, Clock, Target } from 'lucide-react';
import LearningPlanForm from './components/LearningPlanForm';
import LearningPlan from './components/LearningPlan';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LearningPlanForm />} />
            <Route path="/plan" element={<LearningPlan />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;