import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { Award, CheckCircle, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    question: 'What is the primary objective of PACS Computerization under the Ministry of Cooperation roadmap?',
    options: [
      'Replace all local cooperative societies with private commercial banks',
      'Standardize accounting, improve transparency, and connect PACS directly to DCCBs and NABARD ERP',
      'Eliminate member voting meetings',
      'Shift all agricultural lending to non-banking finance entities'
    ],
    correctAnswer: 1,
    explanation: 'PACS computerization brings ERP standardization, transparent accounting, and direct linkage with District Central Cooperative Banks and NABARD.'
  },
  {
    id: 2,
    question: 'Which cybersecurity measure is essential for preventing unauthorized financial modifications in PACS software?',
    options: [
      'Sharing a single administrator password among all clerks',
      'Role-based access control (RBAC) with dual-authorization and daily automated cryptographic backups',
      'Disabling system firewalls for higher speed',
      'Storing passwords in plain text notebooks'
    ],
    correctAnswer: 1,
    explanation: 'Role-based access control with dual authorization ensures no single user can alter financial ledgers without managerial sign-off.'
  },
  {
    id: 3,
    question: 'What is the standard interval for statutory audit compliance in Cooperative Credit Societies?',
    options: [
      'Every 5 years',
      'Annual Statutory Audit within prescribed financial year closure',
      'Only upon loan defaults',
      'Audits are not mandatory for cooperatives'
    ],
    correctAnswer: 1,
    explanation: 'State and multi-state cooperative acts mandate annual statutory audit and submission of audited balance sheets.'
  }
];

export const CourseAssessmentModal = ({ isOpen, onClose, course, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { addToast } = useNotification();

  const questions = course?.assessmentQuestions?.length > 0 ? course.assessmentQuestions : DEFAULT_QUESTIONS;

  const handleSelectOption = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    if (calculatedScore >= 65) {
      addToast({
        title: 'Assessment Passed! 🎉',
        message: `Congratulations! You scored ${calculatedScore}%. Your NCCT Digital Certificate is now unlocked and verified.`,
        type: 'success'
      });
      if (onComplete) {
        onComplete({ score: calculatedScore, passed: true });
      }
    } else {
      addToast({
        title: 'Assessment Incomplete',
        message: `You scored ${calculatedScore}%. A minimum passing score of 65% is required. Please review course modules and retry.`,
        type: 'warning'
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${course?.title || 'Course'} – Skill Assessment`}
      subtitle="Complete the qualifying examination to earn your verified NCCT Digital Certificate"
      maxWidth="max-w-3xl"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmitQuiz} className="space-y-6 text-xs">
          <div className="bg-[#EAF5FB] border border-[#1976D2]/20 p-4 rounded-xl text-[#0B2A4A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#1976D2]" />
              <span className="font-semibold">Answer all {questions.length} questions. Passing score: 65%</span>
            </div>
            <span className="font-mono text-slate-500 font-medium">3 Questions • 10 Marks Each</span>
          </div>

          <div className="space-y-5">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-sm text-[#0B2A4A] mb-3">
                  <span className="text-[#1976D2] mr-1.5">Q{idx + 1}.</span>
                  {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <label
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                        selectedAnswers[q.id] === optIdx
                          ? 'bg-blue-50 border-[#1976D2] text-[#0B2A4A] font-semibold'
                          : 'bg-white border-slate-200 hover:bg-slate-100/80 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={selectedAnswers[q.id] === optIdx}
                        onChange={() => {}}
                        className="mt-0.5 text-[#1976D2] focus:ring-[#1976D2]"
                      />
                      <span className="leading-relaxed">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button type="button" onClick={onClose} className="btn-outline">
              Exit
            </button>
            <button
              type="submit"
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="btn-accent px-6 py-2.5 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit & Calculate Score
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6 text-center py-4">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg ${
            score >= 65 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
          }`}>
            {score >= 65 ? <Award className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
          </div>

          <div>
            <h3 className="text-2xl font-black text-[#0B2A4A]">
              {score >= 65 ? 'Congratulations! You Passed!' : 'Assessment Attempt Recorded'}
            </h3>
            <p className="text-sm font-bold text-[#1976D2] mt-1">
              Final Evaluation Score: {score}%
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              {score >= 65
                ? 'Your completion record has been transmitted to the NCCT Central Certificate Registry. You can now view and download your verified credential.'
                : 'You need at least 65% to qualify for certification. Review the course syllabus and attempt again.'}
            </p>
          </div>

          {/* Question Explanations */}
          <div className="text-left space-y-3 max-h-64 overflow-y-auto pr-1">
            {questions.map((q, idx) => {
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-lg border text-xs ${
                    isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <p className="font-bold mb-1">
                    Q{idx + 1}: {q.question}
                  </p>
                  <p className="text-[11px] mb-1">
                    Your Answer: <strong>{q.options[selectedAnswers[q.id]] || 'Not answered'}</strong> {isCorrect ? '✓' : '✗'}
                  </p>
                  {!isCorrect && (
                    <p className="text-[11px] font-semibold text-emerald-700">
                      Correct: {q.options[q.correctAnswer]}
                    </p>
                  )}
                  {q.explanation && (
                    <p className="text-[11px] text-slate-600 mt-1 italic">{q.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-center gap-3">
            {score < 65 ? (
              <button onClick={handleReset} className="btn-accent px-6">
                Retake Assessment
              </button>
            ) : (
              <button onClick={onClose} className="btn-primary px-8">
                View My Verified Certificate
              </button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CourseAssessmentModal;
