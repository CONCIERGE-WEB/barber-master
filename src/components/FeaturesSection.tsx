import { motion } from "framer-motion";
import {
  DollarSign,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Gestão Financeira Completa",
    description: "Controle receitas, despesas e comissões. Tenha visão total do faturamento da sua barbearia em tempo real.",
  },
  {
    icon: Calendar,
    title: "Agendamento Online",
    description: "Site personalizado para seus clientes agendarem 24h. Chega de perder cliente por telefone ocupado.",
  },
  {
    icon: Users,
    title: "Gestão de Equipe",
    description: "Cadastro ilimitado de barbeiros. Kanban de tarefas, atribuição de serviços e controle de produtividade.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integrado",
    description: "Confirmações automáticas, lembretes e relatórios direto no WhatsApp. Com proteção anti-ban inteligente.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description: "Dashboards e relatórios automáticos enviados direto para o admin. Decisões baseadas em dados.",
  },
  {
    icon: Shield,
    title: "Proteção Anti-Ban",
    description: "Fluxo inteligente de mensagens com delay para proteger seu número comercial de bloqueios.",
  },
  {
    icon: Smartphone,
    title: "Agente IA no WhatsApp",
    description: "Um assistente que fala com clientes, barbeiros e envia relatórios — tudo automatizado.",
  },
  {
    icon: Zap,
    title: "Automação Total",
    description: "Desde o agendamento até o relatório financeiro, tudo funciona no piloto automático para você.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm font-semibold tracking-wider uppercase">
            Funcionalidades
          </span>
          <h2 className="font-heading text-5xl md:text-6xl mt-2 text-foreground">
            TUDO QUE SUA BARBEARIA <span className="text-gradient-gold">PRECISA</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            De barbeiro solo a redes de barbearias — o Barber Master escala com você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-gold transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-2">{feature.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
