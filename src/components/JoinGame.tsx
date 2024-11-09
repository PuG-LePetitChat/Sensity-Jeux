import React, { useState } from 'react';

export default function JoinGame({ onJoin }: { onJoin: (code: string) => void }) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onJoin(code);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Rejoindre une partie</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="code" className="block text-sm text-purple-300 mb-2">
            Code de la partie
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={6}
            className="w-full bg-black/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Entrez le code à 6 caractères"
          />
        </div>

        <button
          type="submit"
          disabled={code.length !== 6}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white py-3 rounded-lg transition-colors"
        >
          Rejoindre la partie
        </button>
      </form>
    </div>
  );
}