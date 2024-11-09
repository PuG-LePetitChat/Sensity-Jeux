import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Users, Trophy, Gamepad2, KeyRound, Shield, TicketIcon } from 'lucide-react';
import GameSelector from './components/GameSelector';
import JoinGame from './components/JoinGame';
import CreateGame from './components/CreateGame';
import DiamondHistory from './components/DiamondHistory';
import AdminPanel from './components/AdminPanel';
import AdminDashboard from './pages/AdminDashboard';
import TicketForm from './components/TicketForm';

function App() {
  const [view, setView] = useState<'join' | 'create' | 'game' | null>(null);
  const [gameCode, setGameCode] = useState<string | null>(null);
  const [showDiamondHistory, setShowDiamondHistory] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div 
                      className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setView(null)}
                    >
                      <Gamepad2 className="w-8 h-8 text-purple-400" />
                      <span className="ml-2 text-xl font-bold text-white">CPZ Game</span>
                    </div>
                    <button
                      onClick={() => setShowAdminPanel(true)}
                      className="ml-4 p-1.5 text-gray-400 hover:text-gray-300 opacity-30 hover:opacity-100 transition-all"
                      title="Administration"
                    >
                      <Shield className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowTicketForm(true)}
                      className="flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      <TicketIcon className="w-5 h-5" />
                      <span>Support</span>
                    </button>
                    <div 
                      className="flex items-center space-x-1 text-purple-300 cursor-pointer hover:text-purple-200 transition-colors"
                      onClick={() => setShowDiamondHistory(true)}
                    >
                      <Trophy className="w-5 h-5" />
                      <span className="hover:scale-110 transition-transform">💎 80</span>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Connexion Discord
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {!view ? (
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div
                    onClick={() => setView('create')}
                    className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <Users className="w-12 h-12 text-purple-400 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Créer une partie</h2>
                    <p className="text-purple-200">Créez votre propre partie et invitez vos amis à vous rejoindre.</p>
                  </div>

                  <div
                    onClick={() => setView('join')}
                    className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <KeyRound className="w-12 h-12 text-purple-400 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Rejoindre une partie</h2>
                    <p className="text-purple-200">Utilisez un code pour rejoindre une partie existante.</p>
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  {view === 'create' && <CreateGame onGameStart={() => setView('game')} />}
                  {view === 'join' && <JoinGame onJoin={(code) => {
                    setGameCode(code);
                    setView('game');
                  }} />}
                  {view === 'game' && <GameSelector />}
                </div>
              )}
            </main>

            {showDiamondHistory && (
              <DiamondHistory onClose={() => setShowDiamondHistory(false)} />
            )}

            {showAdminPanel && (
              <AdminPanel onClose={() => setShowAdminPanel(false)} />
            )}

            {showTicketForm && (
              <TicketForm onClose={() => setShowTicketForm(false)} />
            )}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
