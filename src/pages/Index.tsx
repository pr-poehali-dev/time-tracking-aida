import { useState } from 'react';
import Timer from '@/components/Timer';
import History from '@/components/History';
import Settings from '@/components/Settings';
import Instructions from '@/components/Instructions';
import Icon from '@/components/ui/icon';

interface DiveSession {
  id: string;
  date: Date;
  duration: number;
  depth: number;
  discipline: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'timer' | 'history' | 'settings' | 'instructions'>('timer');
  const [sessions, setSessions] = useState<DiveSession[]>([]);

  const addSession = (session: Omit<DiveSession, 'id'>) => {
    setSessions([...sessions, { ...session, id: Date.now().toString() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-deep via-ocean-mid to-ocean-surface">
      <div className="fixed inset-0 bg-water-texture opacity-10 pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="bg-ocean-deep/80 backdrop-blur-md border-b border-ocean-light/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-coral to-ocean-light rounded-full flex items-center justify-center">
                <Icon name="Waves" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">AIDA Timer</h1>
            </div>
            <div className="text-sm text-ocean-light">Freediving Competition</div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'timer' && <Timer onSessionComplete={addSession} />}
            {activeTab === 'history' && <History sessions={sessions} />}
            {activeTab === 'settings' && <Settings />}
            {activeTab === 'instructions' && <Instructions />}
          </div>
        </main>

        <nav className="bg-ocean-deep/80 backdrop-blur-md border-t border-ocean-light/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-around">
            {[
              { id: 'timer' as const, icon: 'Timer', label: 'Таймер' },
              { id: 'history' as const, icon: 'History', label: 'История' },
              { id: 'settings' as const, icon: 'Settings', label: 'Настройки' },
              { id: 'instructions' as const, icon: 'BookOpen', label: 'Правила' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-ocean-light/20 text-white scale-105'
                    : 'text-ocean-light hover:text-white hover:bg-ocean-light/10'
                }`}
              >
                <Icon name={tab.icon} size={24} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Index;