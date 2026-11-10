import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Lobo Solitário",
    subtitle: "Plano Básico",
    description: "Para o barbeiro solo que quer organizar a casa sem complicação.",
    price: "139,97",
    integration: "R$ 0",
    integrationNote: "Zero taxa",
    featured: false,
    features: [
      "Gestão financeira completa",
      "Controle de receitas e despesas",
      "Gestão de clientes e serviços",
      "Painel de controle intuitivo",
    ],
    notIncluded: [
      "Site de agendamento",
      "Integração WhatsApp",
      "Gestão de equipe",
    ],
  },
  {
    name: "Presença Digital",
    subtitle: "Agendamento Online",
    description: "Para quem quer atrair e organizar clientes online com agendamento profissional.",
    price: "129,97",
    integration: "R$ 397",
    integrationNote: "Taxa única",
    featured: false,
    features: [
      "Tudo do Plano Básico",
      "Site de agendamento personalizado",
      "Confirmação via WhatsApp",
      "Fluxo inteligente com delay",
      "Proteção anti-ban",
      "Pedido de feedback automático",
    ],
    notIncluded: [
      "Gestão de equipe",
      "Kanban de tarefas",
    ],
  },
  {
    name: "Gestão de Equipe",
    subtitle: "Controle Interno",
    description: "Para o dono que precisa de controle rigoroso sobre seus barbeiros.",
    price: "129,97",
    integration: "R$ 497",
    integrationNote: "Taxa única",
    featured: false,
    features: [
      "Tudo do Plano Básico",
      "Colaboradores ilimitados",
      "Kanban de tarefas",
      "Confirmação para barbeiros via WhatsApp",
      "Agente IA para despesas",
      "Relatórios automáticos para admin",
    ],
    notIncluded: [
      "Site de agendamento",
    ],
  },
  {
    name: "Premium",
    subtitle: "Ecossistema Completo",
    description: "A solução de ponta a ponta. Tudo que sua barbearia precisa em um só plano.",
    price: "129,97",
    integration: "R$ 897",
    integrationNote: "Taxa única",
    featured: true,
    features: [
      "TODAS as funcionalidades",
      "Site + Kanban + Financeiro",
      "Cadastro ilimitado de colaboradores",
      "Agente completo no WhatsApp",
      "Fala com clientes e barbeiros",
      "Relatórios automáticos",
      "Comandos via admin no WhatsApp",
      "Suporte prioritário",
    ],
    notIncluded: [],
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm font-semibold tracking-wider uppercase">
            Planos
          </span>
          <h2 className="font-heading text-5xl md:text-6xl mt-2 text-foreground">
            ESCOLHA O PLANO <span className="text-gradient-gold">IDEAL</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Cada plano foi pensado para um momento diferente do seu negócio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
                plan.featured
                  ? "border-primary shadow-gold bg-card scale-[1.02]"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gradient-gold text-primary-foreground px-4 py-1 rounded-full text-xs font-bold font-body uppercase tracking-wider">
                  <Star size={12} />
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <p className="text-primary font-body text-xs font-semibold uppercase tracking-wider">
                  {plan.subtitle}
                </p>
                <h3 className="font-heading text-3xl text-foreground mt-1">{plan.name}</h3>
                <p className="font-body text-muted-foreground text-sm mt-2 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl text-foreground">R$ {plan.price}</span>
                  <span className="font-body text-muted-foreground text-sm">/mês</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-body text-sm text-muted-foreground">
                    Integração: <span className="text-primary font-semibold">{plan.integration}</span>
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-body">
                    {plan.integrationNote}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-2 opacity-40">
                    <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center text-muted-foreground text-xs">✕</span>
                    <span className="font-body text-sm text-muted-foreground line-through">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/5531981096698?text=Olá! Tenho interesse no plano ${plan.name} do Barber Master!`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center font-body font-bold py-3 rounded-lg transition-all ${
                  plan.featured
                    ? "bg-gradient-gold text-primary-foreground shadow-gold hover:scale-105"
                    : "border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                Começar Agora
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
