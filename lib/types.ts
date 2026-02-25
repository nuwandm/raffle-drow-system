export type Participant = {
  id: string;
  name: string;
  location: string;
};

export type DrawHistoryEntry = {
  timestamp: string;
  winner: Participant;
};

export type DrawState = 'idle' | 'shuffling' | 'revealed';
