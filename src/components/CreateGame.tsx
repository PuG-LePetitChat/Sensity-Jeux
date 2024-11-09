import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function CreateGame({ onGameStart }: { onGameStart: () => void }) {
  const [gameCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  
  return (
    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Créer une nouvelle partie</h2>
      
      <div className="bg-black/30 p-4 rounded-lg mb-6">
        <div className="text-sm text-purple-300 mb-2">Code de la partie:</div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-mono text-white">{gameCode}</div>
          <button
            onClick={() => navigator.clipboard.writeText(gameCode)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Copy className="w-5 h-5 text-purple-400" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-purple-300 mb-2">Joueurs connectés:</div>
        <div className="text-white">En attente de joueurs...</div>
      </div>

      <button
        onClick={onGameStart}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors"
      >
        Lancer la partie
      </button>
    </div>
  );
}