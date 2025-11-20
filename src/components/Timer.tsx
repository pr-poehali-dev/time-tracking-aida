import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Icon from './ui/icon';

interface TimerProps {
  onSessionComplete: (session: { date: Date; duration: number; depth: number; discipline: string }) => void;
}

const AUDIO_SIGNALS = {
  countdown: 880,
  start: 440,
  warning: 880,
  critical: 1320,
  complete: 660,
};

export default function Timer({ onSessionComplete }: TimerProps) {
  const [isCountdown, setIsCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [depth, setDepth] = useState(0);
  const [phase, setPhase] = useState<'ready' | 'countdown' | 'diving' | 'ascending' | 'surface'>('ready');
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => audioContextRef.current?.close();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountdown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setIsCountdown(false);
            setIsRunning(true);
            setPhase('diving');
            playSignal(AUDIO_SIGNALS.start);
            return 0;
          }
          playSignal(AUDIO_SIGNALS.countdown);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountdown, countdown]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
        
        if (phase === 'diving' && time < 120) {
          setDepth((prev) => Math.min(prev + 0.5, 100));
        }
        
        if (time === 30 || time === 60) {
          playSignal(AUDIO_SIGNALS.warning);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, phase]);

  const playSignal = (frequency: number) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  };

  const startCountdown = () => {
    setIsCountdown(true);
    setPhase('countdown');
    setCountdown(10);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsCountdown(false);
    playSignal(AUDIO_SIGNALS.complete);
    
    if (time > 0) {
      onSessionComplete({
        date: new Date(),
        duration: time,
        depth: Math.round(depth),
        discipline: 'AIDA Competition',
      });
    }
    
    setTime(0);
    setDepth(0);
    setCountdown(10);
    setPhase('ready');
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsCountdown(false);
    setTime(0);
    setDepth(0);
    setCountdown(10);
    setPhase('ready');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (time / 300) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-8">
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-light/10 to-ocean-mid/30 rounded-2xl animate-pulse" />
            
            <div className="relative bg-ocean-mid/30 backdrop-blur-sm rounded-2xl p-12 text-center space-y-8">
              <div className="space-y-4">
                {isCountdown ? (
                  <>
                    <div className="text-9xl font-bold text-coral tracking-wider font-mono animate-pulse">
                      {countdown}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-coral animate-pulse" />
                      <span className="text-coral text-sm uppercase tracking-widest font-semibold">
                        Приготовиться к старту
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-8xl font-bold text-white tracking-wider font-mono">
                      {formatTime(time)}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-coral animate-pulse' : 'bg-ocean-light/50'}`} />
                      <span className="text-ocean-light text-sm uppercase tracking-widest">
                        {phase === 'ready' && 'Готов к погружению'}
                        {phase === 'diving' && 'Погружение'}
                        {phase === 'ascending' && 'Всплытие'}
                        {phase === 'surface' && 'На поверхности'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-ocean-light">
                  <span>Глубина</span>
                  <span>{Math.round(depth)}м</span>
                </div>
                <div className="h-3 bg-ocean-deep/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-ocean-light to-coral transition-all duration-500 ease-out"
                    style={{ width: `${(depth / 100) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-ocean-light">
                  <span>Прогресс</span>
                  <span>{Math.min(Math.round(progress), 100)}%</span>
                </div>
                <div className="h-3 bg-ocean-deep/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-coral transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {!isRunning && !isCountdown ? (
              <Button
                onClick={startCountdown}
                size="lg"
                className="flex-1 bg-gradient-to-r from-ocean-light to-emerald-500 hover:from-ocean-light/90 hover:to-emerald-500/90 text-white font-semibold text-lg py-6 transition-all duration-300 hover:scale-105"
              >
                <Icon name="Play" size={24} className="mr-2" />
                Начать отсчёт
              </Button>
            ) : (
              <>
                <Button
                  onClick={stopTimer}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-coral to-red-500 hover:from-coral/90 hover:to-red-500/90 text-white font-semibold text-lg py-6 transition-all duration-300 hover:scale-105"
                >
                  <Icon name="Square" size={24} className="mr-2" />
                  Завершить
                </Button>
                <Button
                  onClick={resetTimer}
                  size="lg"
                  variant="outline"
                  className="bg-ocean-mid/50 border-ocean-light/30 text-white hover:bg-ocean-light/20 py-6"
                >
                  <Icon name="RotateCcw" size={24} />
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-ocean-light/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={20} className="text-ocean-light" />
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-semibold">Официальный хронометраж AIDA</h3>
            <p className="text-ocean-light text-sm leading-relaxed">
              Таймер соответствует международным правилам AIDA International. 
              Звуковые сигналы: старт, 30 сек, 60 сек, завершение.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}