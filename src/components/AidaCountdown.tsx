import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Icon from './ui/icon';

type Phase = 'ready' | 'countdown' | 'diving' | 'finished';

export default function AidaCountdown() {
  const [phase, setPhase] = useState<Phase>('ready');
  const [countdown, setCountdown] = useState(60);
  const [diveTime, setDiveTime] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => audioContextRef.current?.close();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (phase === 'countdown' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          const next = prev - 1;
          
          if (next === 30) {
            speak('30 секунд');
            playBeep(880);
          } else if (next === 10) {
            speak('10 секунд');
            playBeep(880);
          } else if (next <= 5 && next > 0) {
            speak(next.toString());
            playBeep(1320);
          } else if (next === 0) {
            speak('Старт');
            playLongBeep();
            setPhase('diving');
            return 0;
          }
          
          return next;
        });
      }, 1000);
    } else if (phase === 'diving') {
      interval = setInterval(() => {
        setDiveTime((prev) => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [phase, countdown]);

  const playBeep = (frequency: number) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.4, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.3);
  };

  const playLongBeep = () => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = 440;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 1.5);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 1.5);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startCountdown = () => {
    speak('Спортсмен готов');
    setTimeout(() => {
      speak('Судья готов');
      setPhase('countdown');
      setCountdown(60);
      setDiveTime(0);
    }, 2000);
  };

  const stopTimer = () => {
    speak('На поверхности');
    setPhase('finished');
  };

  const reset = () => {
    window.speechSynthesis.cancel();
    setPhase('ready');
    setCountdown(60);
    setDiveTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBackgroundColor = () => {
    if (phase === 'ready') return 'from-slate-800 to-slate-900';
    if (phase === 'countdown') {
      if (countdown > 30) return 'from-emerald-600 to-emerald-800';
      if (countdown > 10) return 'from-yellow-500 to-yellow-700';
      return 'from-red-600 to-red-800';
    }
    if (phase === 'diving') return 'from-blue-700 to-blue-900';
    return 'from-slate-700 to-slate-800';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundColor()} transition-all duration-500 flex flex-col`}>
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Icon name="Timer" size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AIDA Competition Timer</h1>
              <p className="text-white/60 text-sm">Official Countdown System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${phase === 'diving' ? 'bg-red-500 animate-pulse' : 'bg-white/30'}`} />
            <span className="text-white/80 text-sm uppercase tracking-wider">
              {phase === 'ready' && 'Ready'}
              {phase === 'countdown' && 'Countdown'}
              {phase === 'diving' && 'Diving'}
              {phase === 'finished' && 'Finished'}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <Card className="bg-black/40 backdrop-blur-xl border-white/20 p-12 max-w-4xl w-full">
          <div className="text-center space-y-12">
            {phase === 'countdown' && (
              <div className="space-y-6">
                <div className="text-white/60 text-2xl uppercase tracking-widest font-medium">
                  Countdown to Start
                </div>
                <div className="text-[12rem] font-bold text-white leading-none tracking-tight font-mono">
                  {countdown}
                </div>
                <div className="text-white/80 text-xl">
                  {countdown > 30 && 'Prepare for dive'}
                  {countdown <= 30 && countdown > 10 && '30 seconds warning'}
                  {countdown <= 10 && countdown > 0 && 'Final countdown'}
                </div>
              </div>
            )}

            {phase === 'diving' && (
              <div className="space-y-6">
                <div className="text-white/60 text-2xl uppercase tracking-widest font-medium">
                  Dive Time
                </div>
                <div className="text-[10rem] font-bold text-white leading-none tracking-tight font-mono">
                  {formatTime(diveTime)}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                  <div className="text-white/80 text-xl">Recording dive time...</div>
                </div>
              </div>
            )}

            {(phase === 'ready' || phase === 'finished') && (
              <div className="space-y-8">
                <div className="w-32 h-32 bg-white/10 rounded-full mx-auto flex items-center justify-center">
                  <Icon name="Waves" size={64} className="text-white/60" />
                </div>
                <div className="space-y-2">
                  <div className="text-white text-3xl font-bold">
                    {phase === 'ready' ? 'Ready to Start' : 'Dive Completed'}
                  </div>
                  {phase === 'finished' && (
                    <div className="text-white/60 text-xl">
                      Final Time: {formatTime(diveTime)}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-8">
              {phase === 'ready' && (
                <Button
                  onClick={startCountdown}
                  size="lg"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xl py-8 transition-all duration-300 hover:scale-105"
                >
                  <Icon name="Play" size={28} className="mr-3" />
                  Start Official Countdown
                </Button>
              )}

              {phase === 'diving' && (
                <Button
                  onClick={stopTimer}
                  size="lg"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-xl py-8 transition-all duration-300 hover:scale-105"
                >
                  <Icon name="Square" size={28} className="mr-3" />
                  Surface / Stop
                </Button>
              )}

              {(phase === 'finished' || phase === 'countdown' || phase === 'diving') && (
                <Button
                  onClick={reset}
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold text-xl py-8 px-12"
                >
                  <Icon name="RotateCcw" size={28} className="mr-3" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </Card>
      </main>

      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white/60 text-sm">
          <div>AIDA International Official Timer</div>
          <div className="flex items-center gap-2">
            <Icon name="Volume2" size={16} />
            <span>Voice commands enabled</span>
          </div>
        </div>
      </footer>
    </div>
  );
}