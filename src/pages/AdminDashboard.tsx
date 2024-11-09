import React, { useState } from 'react';
import { Trophy, Diamond, MessageCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminRankings from '../components/admin/AdminRankings';
import AdminDiamonds from '../components/admin/AdminDiamonds';
import AdminTickets from '../components/admin/AdminTickets';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'rankings' | 'diamonds' | 'tickets'>('rankings');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour au jeu</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Tableau de bord administrateur</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              onClick={() => setActiveTab('rankings')}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'rankings'
                  ? 'bg-purple-600/20 border-purple-500'
                  : 'bg-black/30 border-gray-800 hover:bg-purple-600/10'
              }`}
            >
              <Trophy className={`w-8 h-8 mb-2 ${
                activeTab === 'rankings' ? 'text-purple-400' : 'text-gray-400'
              }`} />
              <h3 className="text-lg font-medium text-white">Classement</h3>
              <p className="text-gray-400 text-sm">Gérer le classement des joueurs</p>
            </div>

            <div
              onClick={() => setActiveTab('diamonds')}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'diamonds'
                  ? 'bg-purple-600/20 border-purple-500'
                  : 'bg-black/30 border-gray-800 hover:bg-purple-600/10'
              }`}
            >
              <Diamond className={`w-8 h-8 mb-2 ${
                activeTab === 'diamonds' ? 'text-purple-400' : 'text-gray-400'
              }`} />
              <h3 className="text-lg font-medium text-white">Diamants</h3>
              <p className="text-gray-400 text-sm">Gérer les diamants des joueurs</p>
            </div>

            <div
              onClick={() => setActiveTab('tickets')}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'tickets'
                  ? 'bg-purple-600/20 border-purple-500'
                  : 'bg-black/30 border-gray-800 hover:bg-purple-600/10'
              }`}
            >
              <MessageCircle className={`w-8 h-8 mb-2 ${
                activeTab === 'tickets' ? 'text-purple-400' : 'text-gray-400'
              }`} />
              <h3 className="text-lg font-medium text-white">Tickets</h3>
              <p className="text-gray-400 text-sm">Gérer les tickets de support</p>
            </div>
          </div>

          <div className="bg-black/30 rounded-xl p-6">
            {activeTab === 'rankings' && <AdminRankings />}
            {activeTab === 'diamonds' && <AdminDiamonds />}
            {activeTab === 'tickets' && <AdminTickets />}
          </div>
        </div>
      </div>
    </div>
  );
}