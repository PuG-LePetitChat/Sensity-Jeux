import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, CheckCircle2, XCircle, Send } from 'lucide-react';
import { store } from '../../utils/store';

export default function AdminTickets() {
  const [tickets, setTickets] = useState(store.getTickets());
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTickets(store.getTickets());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedTicket, tickets]);

  const handleStatusChange = (ticketId: string, status: 'open' | 'closed') => {
    store.updateTicketStatus(ticketId, status);
  };

  const handleSendMessage = (ticketId: string) => {
    if (!message.trim()) return;
    store.addMessage(ticketId, message, true, 'Admin');
    setMessage('');
  };

  const selectedTicketData = tickets.find(t => t.id === selectedTicket);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Tickets</h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {tickets.map(ticket => (
            <div
              key={ticket.id}
              className={`bg-gray-800/50 rounded-lg p-4 space-y-2 cursor-pointer transition-colors ${
                selectedTicket === ticket.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedTicket(ticket.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">{ticket.username}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(ticket.timestamp).toLocaleString()}
                </span>
              </div>
              
              <div>
                <h4 className="text-white font-medium">{ticket.subject}</h4>
                <p className="text-gray-300 mt-1 line-clamp-2">{ticket.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  ticket.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {ticket.status === 'open' ? 'Ouvert' : 'Fermé'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(ticket.id, 'open');
                    }}
                    className={`p-1 rounded-lg transition-colors ${
                      ticket.status === 'open' ? 'text-green-400 bg-green-400/20' : 'text-gray-400 hover:text-green-400'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(ticket.id, 'closed');
                    }}
                    className={`p-1 rounded-lg transition-colors ${
                      ticket.status === 'closed' ? 'text-red-400 bg-red-400/20' : 'text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTicketData && (
        <div className="bg-black/30 rounded-lg p-4 flex flex-col h-[600px]">
          <h3 className="text-xl font-bold text-white mb-4">Chat en direct</h3>
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{selectedTicketData.username}</span>
                <span className="text-sm text-gray-400">
                  {new Date(selectedTicketData.timestamp).toLocaleString()}
                </span>
              </div>
              <h4 className="text-white font-medium">{selectedTicketData.subject}</h4>
              <p className="text-gray-300 mt-2">{selectedTicketData.message}</p>
            </div>

            {selectedTicketData.messages.map(msg => (
              <div
                key={msg.id}
                className={`p-4 rounded-lg ${
                  msg.isAdmin
                    ? 'bg-purple-600/20 ml-4'
                    : 'bg-gray-800/50 mr-4'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">
                    {msg.isAdmin ? 'Admin' : msg.authorName}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-300">{msg.content}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(selectedTicketData.id);
                }
              }}
              placeholder="Votre message..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
            <button
              onClick={() => handleSendMessage(selectedTicketData.id)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Envoyer</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}