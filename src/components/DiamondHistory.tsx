import React from 'react';
import { X } from 'lucide-react';

interface DiamondTransaction {
  amount: number;
  date: string;
  from: string;
  gameType: string;
}

export default function DiamondHistory({ onClose }: { onClose: () => void }) {
  // Exemple de transactions (à remplacer par des données réelles)
  const transactions: DiamondTransaction[] = [
    {
      amount: 1000,
      date: '2024-03-15',
      from: 'GameMaster123',
      gameType: 'Quiz'
    },
    {
      amount: 2000,
      date: '2024-03-14',
      from: 'HostPro',
      gameType: 'Speed Clicker'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Historique des Diamants</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-300" />
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 rounded-lg border border-white/10"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-purple-300">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                <span className="text-emerald-400 font-bold">
                  +{transaction.amount} 💎
                </span>
              </div>
              <div className="text-white text-sm">
                De: {transaction.from}
              </div>
              <div className="text-purple-300 text-sm">
                Jeu: {transaction.gameType}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex justify-between items-center text-white">
            <span className="font-medium">Total des diamants:</span>
            <span className="text-xl font-bold">80 💎</span>
          </div>
        </div>
      </div>
    </div>
  );
}