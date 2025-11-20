import { Card } from './ui/card';
import Icon from './ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DiveSession {
  id: string;
  date: Date;
  duration: number;
  depth: number;
  discipline: string;
}

interface HistoryProps {
  sessions: DiveSession[];
}

export default function History({ sessions }: HistoryProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const chartData = sessions.slice(-10).map((session, index) => ({
    name: `#${index + 1}`,
    duration: session.duration,
    depth: session.depth,
  }));

  const avgDuration = sessions.length > 0 
    ? Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length)
    : 0;
  
  const maxDepth = sessions.length > 0
    ? Math.max(...sessions.map(s => s.depth))
    : 0;

  const totalDives = sessions.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-ocean-light to-emerald-500 rounded-xl flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-ocean-light text-sm">Среднее время</div>
              <div className="text-3xl font-bold text-white">{formatTime(avgDuration)}</div>
            </div>
          </div>
        </Card>

        <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Icon name="ArrowDown" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-ocean-light text-sm">Макс. глубина</div>
              <div className="text-3xl font-bold text-white">{maxDepth}м</div>
            </div>
          </div>
        </Card>

        <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-ocean-light text-sm">Всего погружений</div>
              <div className="text-3xl font-bold text-white">{totalDives}</div>
            </div>
          </div>
        </Card>
      </div>

      {sessions.length > 0 && (
        <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
          <h3 className="text-white font-semibold text-lg mb-6">Прогресс последних 10 погружений</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94C9D8" />
              <YAxis stroke="#94C9D8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(10, 35, 66, 0.9)', 
                  border: '1px solid rgba(148, 201, 216, 0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="duration" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Время (сек)"
                dot={{ fill: '#10B981', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="depth" 
                stroke="#06B6D4" 
                strokeWidth={3}
                name="Глубина (м)"
                dot={{ fill: '#06B6D4', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
        <h3 className="text-white font-semibold text-lg mb-4">История погружений</h3>
        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Waves" size={48} className="text-ocean-light/50 mx-auto mb-4" />
            <p className="text-ocean-light">Пока нет записей о погружениях</p>
            <p className="text-ocean-light/70 text-sm mt-2">Начните первую тренировку!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...sessions].reverse().map((session) => (
              <div
                key={session.id}
                className="bg-ocean-mid/30 backdrop-blur-sm rounded-lg p-4 hover:bg-ocean-mid/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-ocean-light/20 rounded-lg flex items-center justify-center">
                      <Icon name="Droplet" size={24} className="text-ocean-light" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{session.discipline}</div>
                      <div className="text-ocean-light text-sm">
                        {new Date(session.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 text-right">
                    <div>
                      <div className="text-ocean-light text-xs">Время</div>
                      <div className="text-white font-semibold">{formatTime(session.duration)}</div>
                    </div>
                    <div>
                      <div className="text-ocean-light text-xs">Глубина</div>
                      <div className="text-white font-semibold">{session.depth}м</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
