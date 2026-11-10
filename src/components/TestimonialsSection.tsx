import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Dono de Barbearia",
    text: "Depois do Barber Master, minha barbearia saiu do caderninho para a era digital. Os clientes adoram agendar online e eu finalmente tenho controle do financeiro.",
  },
  {
    name: "Rafael Costa",
    role: "Barbeiro Autônomo",
    text: "O plano Lobo Solitário é perfeito pra quem trabalha solo. Simples, direto e me ajuda a não perder nenhum centavo de vista.",
  },
  {
    name: "André Mendes",
    role: "Gestor de Rede de Barbearias",
    text: "O agente no WhatsApp mudou tudo. Meus barbeiros recebem as tarefas, os clientes recebem confirmação e eu recebo os relatórios. Tudo automático.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-surface-elevated">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm font-semibold tracking-wider uppercase">
            Depoimentos
          </span>
          <h2 className="font-heading text-5xl md:text-6xl mt-2 text-foreground">
            QUEM USA, <span className="text-gradient-gold">RECOMENDA</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="font-body text-foreground/90 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div>
                <p className="font-body font-semibold text-foreground">{t.name}</p>
                <p className="font-body text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
