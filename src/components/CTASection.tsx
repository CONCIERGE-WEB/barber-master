import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
            PRONTO PARA <span className="text-gradient-gold">DOMINAR</span> SUA GESTÃO?
          </h2>
          <p className="font-body text-muted-foreground text-lg mb-10 leading-relaxed">
            Junte-se a centenas de barbearias que já transformaram seus negócios com o Barber Master.
            Comece hoje e veja a diferença em dias.
          </p>
          <a
            href="https://wa.me/5531981096698?text=Olá! Quero saber mais sobre o Barber Master!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground font-body font-bold px-10 py-5 rounded-lg text-lg shadow-gold hover:scale-105 transition-transform"
          >
            Quero Começar Agora
            <ArrowRight size={20} />
          </a>
          <p className="font-body text-muted-foreground text-sm mt-6">
            Sem compromisso. Cancele quando quiser.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
