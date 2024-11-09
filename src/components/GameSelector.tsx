import React, { useState, useEffect } from 'react';
import { Dices } from 'lucide-react';

const games = [
  { id: 'quiz', name: 'Quiz', icon: '❓' },
  { id: 'building', name: 'Reconnaître le bâtiment', icon: '🏛️' },
  { id: 'wheel', name: 'Roue de la chance', icon: '🎡' },
  { id: 'clicker', name: 'Speed Clicker', icon: '👆' },
];

export default function GameSelector() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    if (isSpinning) {
      const duration = 3000; // 3 seconds
      const intervals = 100; // Update every 100ms
      let elapsed = 0;

      const interval = setInterval(() => {
        elapsed += intervals;
        setSelectedGame(Math.floor(Math.random() * games.length));

        if (elapsed >= duration) {
          setIsSpinning(false);
          clearInterval(interval);
        }
      }, intervals);

      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  return (
    <div className="text-center">
      <div className="inline-block">
        <Dices className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-bounce" />
        <h2 className="text-2xl font-bold text-white mb-8">Sélection du mini-jeu</h2>
        
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                selectedGame === index
                  ? 'bg-purple-600 border-white scale-110'
                  : 'bg-white/10 border-transparent scale-100'
              }`}
            >
              <div className="text-4xl mb-2">{game.icon}</div>
              <div className="text-white font-medium">{game.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}