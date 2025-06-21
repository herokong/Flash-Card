import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  EyeOff,
  Shuffle,
} from "lucide-react";
import Words from "./components/500Words";

function FrenchFlashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [displayOrder, setDisplayOrder] = useState([]);

  const words = Words;

  useEffect(() => {
    const indices = Array.from({ length: words.length }, (_, i) => i);
    setDisplayOrder(indices);
  }, []);

  const getCurrentWord = () => {
    if (displayOrder.length === 0) return words[0];
    const actualIndex = shuffled ? displayOrder[currentIndex] : currentIndex;
    return words[actualIndex];
  };

  const nextCard = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % (shuffled ? displayOrder.length : words.length)
    );
    setShowTranslation(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? shuffled
          ? displayOrder.length - 1
          : words.length - 1
        : prev - 1
    );
    setShowTranslation(false);
  };

  const shuffleCards = () => {
    const indices = Array.from({ length: words.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setDisplayOrder(indices);
    setShuffled(true);
    setCurrentIndex(0);
    setShowTranslation(false);
  };

  const resetOrder = () => {
    setShuffled(false);
    setCurrentIndex(0);
    setShowTranslation(false);
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const currentWord = getCurrentWord();
  const totalCards = shuffled ? displayOrder.length : words.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          French Flashcards
        </h1>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={shuffleCards}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Shuffle size={20} />
            Shuffle
          </button>
          <button
            onClick={resetOrder}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={20} />
            Reset Order
          </button>
        </div>

        {/* Card Counter */}
        <div className="text-center mb-6">
          <span className="text-lg text-gray-600">
            Card {currentIndex + 1} of {totalCards}
          </span>
          {shuffled && (
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
              Shuffled
            </span>
          )}
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 min-h-[300px] flex flex-col justify-center items-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-6">
              {currentWord.french}
            </div>

            {showTranslation && (
              <div className="text-2xl text-gray-700 mt-4 p-4 bg-gray-50 rounded-lg">
                {currentWord.english}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={prevCard}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <button
            onClick={toggleTranslation}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {showTranslation ? <EyeOff size={20} /> : <Eye size={20} />}
            {showTranslation ? "Hide" : "Show"} Translation
          </button>

          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default FrenchFlashcards;
