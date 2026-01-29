import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../constants';
import { CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';

const QuizModule: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(nextQuestion);
      setIsAnswered(false);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in duration-500">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border-4 border-dino-amber/30">
          <Trophy size={64} className="text-yellow-500 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-heading text-dino-dark mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 mb-6">You really know your dinosaurs!</p>
          
          <div className="text-6xl font-heading text-dino-green mb-8">
            {score} / {QUIZ_QUESTIONS.length}
          </div>

          <button 
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 w-full py-4 bg-dino-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            <RefreshCw size={20} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 h-full flex flex-col justify-center">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2">
          <div 
            className="bg-dino-green h-2 transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-dino-amber uppercase tracking-wider">
              Question {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}
            </span>
            <span className="text-sm font-bold text-gray-400">Score: {score}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-dino-dark mb-8 min-h-[4rem]">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = "border-2 border-gray-100 hover:border-dino-amber hover:bg-orange-50";
              let icon = null;

              if (isAnswered) {
                if (index === currentQuestion.correctAnswer) {
                  buttonStyle = "bg-green-100 border-green-500 text-green-800";
                  icon = <CheckCircle size={20} />;
                } else if (index === selectedAnswer) {
                  buttonStyle = "bg-red-100 border-red-500 text-red-800";
                  icon = <XCircle size={20} />;
                } else {
                  buttonStyle = "opacity-50 border-gray-100";
                }
              } else if (selectedAnswer === index) {
                buttonStyle = "border-dino-amber bg-orange-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all flex justify-between items-center ${buttonStyle}`}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-bottom-2 fade-in">
              <p className="text-sm text-gray-600 italic mb-4">
                <span className="font-bold text-dino-dark not-italic">Did you know? </span>
                {currentQuestion.explanation}
              </p>
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 bg-dino-dark text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                {currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModule;
