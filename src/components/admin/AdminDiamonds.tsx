import React, { useState, useEffect } from 'react';
import { Plus, Minus, RefreshCw } from 'lucide-react';
import { store } from '../../utils/store';

interface DiamondAction {
  username: string;
  amount: number;
  timestamp: Date;
  type: 'add' | 'remove';
}

export default function AdminDiamonds() {
  const [players, setPlayers] = useState(store.getPlayers());
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState<DiamondAction[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setPlayers(store.getPlayers());
    });
    return unsubscribe;
  }, []);

  const handleDiamondAction = (type: 'add' | 'remove') => {
    if (!selectedPlayer || !amount) return;

    const player = players.find(p => p.id === selectedPlayer);
    if (!player) return;

    const amountNum = parseInt(amount);
    store.updatePlayerDiamonds(selectedPlayer, type === 'add' ? amountNum : -amountNum);

    const newAction: DiamondAction = {
      username: player.name,
      amount: amountNum,
      timestamp: new Date(),
      type
    };

    setHistory([newAction, ...history]);
    setAmount('');
  };

  const refreshDiamonds = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPlayers(store.getPlayers());
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Gestion des Diamants</h3>
        <button
          onClick={refreshDiamonds}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Actualiser</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-black/30 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-4">Modifier les diamants</h4>
            <div className="space-y-4">
              <select
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Sélectionner un joueur</option>
                {players.map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name} ({player.diamonds} 💎)
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Montant"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDiamondAction('add')}
                  disabled={!selectedPlayer || !amount}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ajouter</span>
                </button>
                <button
                  onClick={() => handleDiamondAction('remove')}
                  disabled={!selectedPlayer || !amount}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                >
                  <Minus className="w-5 h-5" />
                  <span>Retirer</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-4">Joueurs actifs</h4>
            <div className="space-y-2">
              {players.map(player => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg"
                >
                  <span className="text-white">{player.name}</span>
                  <span className="text-purple-400">{player.diamonds} 💎</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-4">Historique des actions</h4>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {history.map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg"
              >
                <div>
                  <span className="text-white">{action.username}</span>
                  <span className="text-sm text-gray-400 block">
                    {action.timestamp.toLocaleString()}
                  </span>
                </div>
                <span className={`font-bold ${
                  action.type === 'add' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {action.type === 'add' ? '+' : '-'}{action.amount} 💎
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}