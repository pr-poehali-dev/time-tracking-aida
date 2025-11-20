import { Card } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Icon from './ui/icon';

export default function Instructions() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-ocean-light to-cyan-500 rounded-xl flex items-center justify-center">
            <Icon name="BookOpen" size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Правила AIDA International</h2>
            <p className="text-ocean-light text-sm">Официальные дисциплины фридайвинга</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem value="sta" className="bg-ocean-mid/30 rounded-lg border-ocean-light/20 px-4">
            <AccordionTrigger className="text-white hover:text-ocean-light">
              <div className="flex items-center gap-3">
                <Icon name="Timer" size={20} className="text-ocean-light" />
                <span className="font-semibold">Static Apnea (STA)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-ocean-light leading-relaxed">
              <div className="space-y-3 pt-3">
                <p>
                  <strong className="text-white">Статическая апноэ</strong> — задержка дыхания на поверхности воды 
                  лицом вниз без движения.
                </p>
                <div className="bg-ocean-deep/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (М):</span>
                    <span className="text-white font-medium">11:54</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (Ж):</span>
                    <span className="text-white font-medium">9:02</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Рекомендуемое время:</span>
                    <span className="text-white font-medium">3-5 мин</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dyn" className="bg-ocean-mid/30 rounded-lg border-ocean-light/20 px-4">
            <AccordionTrigger className="text-white hover:text-ocean-light">
              <div className="flex items-center gap-3">
                <Icon name="Move" size={20} className="text-ocean-light" />
                <span className="font-semibold">Dynamic Apnea (DYN)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-ocean-light leading-relaxed">
              <div className="space-y-3 pt-3">
                <p>
                  <strong className="text-white">Динамическая апноэ</strong> — горизонтальное плавание под водой 
                  на максимальную дистанцию с ластами.
                </p>
                <div className="bg-ocean-deep/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (М):</span>
                    <span className="text-white font-medium">300 м</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (Ж):</span>
                    <span className="text-white font-medium">257 м</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Среднее время:</span>
                    <span className="text-white font-medium">4-6 мин</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cwt" className="bg-ocean-mid/30 rounded-lg border-ocean-light/20 px-4">
            <AccordionTrigger className="text-white hover:text-ocean-light">
              <div className="flex items-center gap-3">
                <Icon name="ArrowDown" size={20} className="text-ocean-light" />
                <span className="font-semibold">Constant Weight (CWT)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-ocean-light leading-relaxed">
              <div className="space-y-3 pt-3">
                <p>
                  <strong className="text-white">Постоянный вес</strong> — погружение на глубину и возвращение 
                  с постоянным весом, используя ласты.
                </p>
                <div className="bg-ocean-deep/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (М):</span>
                    <span className="text-white font-medium">133 м</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (Ж):</span>
                    <span className="text-white font-medium">115 м</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Среднее время:</span>
                    <span className="text-white font-medium">3-4 мин</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cnf" className="bg-ocean-mid/30 rounded-lg border-ocean-light/20 px-4">
            <AccordionTrigger className="text-white hover:text-ocean-light">
              <div className="flex items-center gap-3">
                <Icon name="Gauge" size={20} className="text-ocean-light" />
                <span className="font-semibold">Constant No Fins (CNF)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-ocean-light leading-relaxed">
              <div className="space-y-3 pt-3">
                <p>
                  <strong className="text-white">Постоянный вес без ласт</strong> — погружение и всплытие 
                  без использования ласт, только работа руками и ногами.
                </p>
                <div className="bg-ocean-deep/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (М):</span>
                    <span className="text-white font-medium">102 м</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (Ж):</span>
                    <span className="text-white font-medium">76 м</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Среднее время:</span>
                    <span className="text-white font-medium">3-4 мин</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fim" className="bg-ocean-mid/30 rounded-lg border-ocean-light/20 px-4">
            <AccordionTrigger className="text-white hover:text-ocean-light">
              <div className="flex items-center gap-3">
                <Icon name="Anchor" size={20} className="text-ocean-light" />
                <span className="font-semibold">Free Immersion (FIM)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-ocean-light leading-relaxed">
              <div className="space-y-3 pt-3">
                <p>
                  <strong className="text-white">Свободное погружение</strong> — погружение и всплытие 
                  с помощью троса без использования ласт.
                </p>
                <div className="bg-ocean-deep/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (М):</span>
                    <span className="text-white font-medium">125 м</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Мировой рекорд (Ж):</span>
                    <span className="text-white font-medium">98 м</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Среднее время:</span>
                    <span className="text-white font-medium">3-4 мин</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card className="bg-ocean-deep/60 backdrop-blur-lg border-ocean-light/30 p-6">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <Icon name="Shield" size={20} />
          Правила безопасности
        </h3>
        <div className="space-y-4">
          {[
            'Никогда не ныряйте в одиночку — всегда должен быть напарник',
            'Соблюдайте правило 1:1 — на каждого ныряющего один страхующий',
            'Не гипервентилируйтесь перед погружением',
            'Соблюдайте время восстановления между погружениями',
            'При любых признаках дискомфорта немедленно всплывайте',
          ].map((rule, index) => (
            <div key={index} className="flex items-start gap-3 bg-ocean-mid/30 rounded-lg p-4">
              <div className="w-6 h-6 bg-coral/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-coral text-sm font-bold">{index + 1}</span>
              </div>
              <p className="text-ocean-light text-sm leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
