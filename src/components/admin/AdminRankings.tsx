import React, { useState, useEffect } from 'react';
import { Medal } from 'lucide-react';
import { store } from '../../utils/store';

export default function AdminRankings() {
  const [players, setPlayers] = useState(store.getPlayers());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setPlayers(store.getPlayers());
    });
    return unsubscribe;
  }, []);

  // Sort players by diamonds
  const sortedPlayers = [...players].sort((a, b) => b.diamonds - a.diamonds);

  return (
    <div className="space-y-4">
      <div className="bg-black/30 rounded-lg p-4">
        <h3 className="text-xl font-bold text-white mb-4">Classement des joueurs</h3>
        <div className="space-y-2">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  {index < 3 && (
                    <Medal className={`w-6 h-6 ${
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-400' :
                      'text-orange-600'
                    }`} />
                  )}
                </div>
                <span className="text-white font-medium">{player.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-purple-400">{player.diamonds} 💎</span>
                <span className="text-green-400">{player.wins} victoires</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}