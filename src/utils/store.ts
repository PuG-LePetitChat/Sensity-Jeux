// Simple in-memory store for demo purposes
// In production, this would be replaced with a proper database

interface Player {
  id: string;
  name: string;
  diamonds: number;
  wins: number;
}

interface Message {
  id: string;
  ticketId: string;
  content: string;
  isAdmin: boolean;
  timestamp: Date;
  authorName: string;
}

interface Ticket {
  id: string;
  username: string;
  subject: string;
  message: string;
  status: 'open' | 'closed';
  timestamp: Date;
  messages: Message[];
}

class Store {
  private players: Player[] = [
    { id: '1', name: 'Player1', diamonds: 1500, wins: 12 },
    { id: '2', name: 'Player2', diamonds: 1200, wins: 8 },
    { id: '3', name: 'Player3', diamonds: 800, wins: 5 },
  ];

  private tickets: Ticket[] = [];
  private subscribers: Set<() => void> = new Set();

  // Player methods
  getPlayers(): Player[] {
    return [...this.players];
  }

  updatePlayerDiamonds(playerId: string, amount: number): void {
    this.players = this.players.map(player => {
      if (player.id === playerId) {
        return { ...player, diamonds: player.diamonds + amount };
      }
      return player;
    });
    this.notifySubscribers();
  }

  // Ticket methods
  getTickets(): Ticket[] {
    return [...this.tickets];
  }

  addTicket(ticket: Omit<Ticket, 'id' | 'timestamp' | 'messages'>): void {
    const newTicket: Ticket = {
      ...ticket,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      messages: [],
    };
    this.tickets.push(newTicket);
    this.notifySubscribers();
  }

  addMessage(ticketId: string, content: string, isAdmin: boolean, authorName: string): void {
    const ticket = this.tickets.find(t => t.id === ticketId);
    if (ticket) {
      const message: Message = {
        id: Math.random().toString(36).substr(2, 9),
        ticketId,
        content,
        isAdmin,
        timestamp: new Date(),
        authorName,
      };
      ticket.messages.push(message);
      this.notifySubscribers();
    }
  }

  updateTicketStatus(ticketId: string, status: 'open' | 'closed'): void {
    this.tickets = this.tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status } : ticket
    );
    this.notifySubscribers();
  }

  // Subscription system
  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback());
  }
}

export const store = new Store();