import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import Icon from './ui/icon';
import { useState } from 'react';

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [warningTime, setWarningTime] = useState([30]);
  const [volume, setVolume] = useState([70]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
          <Icon name="Volume2" size={24} />
          Звуковые сигналы
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Звуковые сигналы</div>
              <div className="text-ocean-light text-sm">Подача сигналов на ключевых этапах</div>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Голосовые подсказки</div>
              <div className="text-ocean-light text-sm">Голосовое сопровождение погружения</div>
            </div>
            <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Вибрация</div>
              <div className="text-ocean-light text-sm">Тактильные уведомления</div>
            </div>
            <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white font-medium">Громкость</span>
              <span className="text-ocean-light">{volume[0]}%</span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={10}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
          <Icon name="Bell" size={24} />
          Уведомления
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white font-medium">Предупреждение за</span>
              <span className="text-ocean-light">{warningTime[0]} сек</span>
            </div>
            <Slider
              value={warningTime}
              onValueChange={setWarningTime}
              min={10}
              max={60}
              step={5}
              className="w-full"
            />
          </div>

          <div className="bg-ocean-mid/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-ocean-light flex-shrink-0 mt-0.5" />
              <div className="text-ocean-light text-sm leading-relaxed">
                Настройки применяются ко всем дисциплинам AIDA. 
                Рекомендуемое значение предупреждения: 30 секунд до завершения.
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
          <Icon name="Trophy" size={24} />
          Соревнования
        </h3>
        
        <div className="space-y-4">
          <div className="bg-ocean-mid/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Icon name="Award" size={20} className="text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Официальный хронометраж</div>
                <div className="text-ocean-light text-sm">Режим AIDA Competition</div>
              </div>
            </div>
            <div className="text-ocean-light text-sm leading-relaxed">
              Таймер соответствует правилам AIDA International для официальных соревнований. 
              Включает точные интервалы и обязательные звуковые сигналы.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
