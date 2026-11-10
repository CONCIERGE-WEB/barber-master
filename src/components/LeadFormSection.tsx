import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  KNOWN_PLANS,
  leadSchema,
  toInsertPayload,
  whatsappDigits,
  type KnownPlan,
} from "@/lib/lead-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Values = {
  name: string;
  whatsapp: string;
  email: string;
  shop_name: string;
  plan_interest: KnownPlan;
  message: string;
  /** Honeypot: real visitors never see or fill this. */
  website: string;
};

const EMPTY: Values = {
  name: "",
  whatsapp: "",
  email: "",
  shop_name: "",
  plan_interest: "Ainda não sei",
  message: "",
  website: "",
};

type FieldKey = keyof Values;
type Errors = Partial<Record<FieldKey, string>>;

const WHATSAPP_HELP = "https://wa.me/5531981096698?text=Olá! Quero saber mais sobre o Barber Master!";

const LeadFormSection = () => {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const setField = (key: FieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    // Bots fill the hidden field; a real visitor never can. Drop it silently.
    if (values.website.trim() !== "") {
      setSent(true);
      return;
    }

    const parsed = leadSchema.safeParse({
      name: values.name,
      whatsapp: values.whatsapp,
      email: values.email,
      shop_name: values.shop_name,
      plan_interest: values.plan_interest,
      message: values.message,
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldKey | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const { error } = await supabase
      .from("lead_submissions")
      .insert(toInsertPayload(parsed.data));

    setSubmitting(false);

    if (error) {
      toast.error("Não conseguimos enviar agora. Chame no WhatsApp que a gente resolve.");
      return;
    }

    setValues(EMPTY);
    setSent(true);
  };

  const errorText = (key: FieldKey) =>
    errors[key] ? <p className="font-body text-xs text-destructive mt-1.5">{errors[key]}</p> : null;

  return (
    <section id="contato" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-body text-sm font-semibold tracking-wider uppercase">
              Fale com a gente
            </span>
            <h2 className="font-heading text-5xl md:text-6xl mt-2 text-foreground leading-none">
              COMECE COM O <span className="text-gradient-gold">PLANO CERTO</span>
            </h2>
            <p className="font-body text-muted-foreground mt-4 text-lg leading-relaxed">
              Diga qual é a sua barbearia e o que você precisa resolver. A gente continua a
              conversa no WhatsApp e mostra o Barber Master funcionando no seu caso.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Sem compromisso. Cancele quando quiser.",
                "Atendimento direto pelo WhatsApp.",
                "Ajuda para escolher o plano antes de pagar.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="font-body text-foreground/90 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3 border border-border/60 rounded-lg p-4 bg-card">
              <ShieldCheck size={20} className="text-primary shrink-0" />
              <p className="font-body text-muted-foreground text-xs leading-relaxed">
                Seus dados ficam só com a nossa equipe. Nada de spam, nada de revenda de lista.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8"
          >
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                  <Check size={26} className="text-primary" />
                </div>
                <h3 className="font-heading text-3xl text-foreground mb-2">
                  RECEBEMOS SEUS DADOS
                </h3>
                <p className="font-body text-muted-foreground text-sm mb-8">
                  Obrigado pelo interesse no Barber Master.
                </p>
                <a
                  href={WHATSAPP_HELP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground font-body font-bold px-7 py-3.5 rounded-lg shadow-gold hover:scale-105 transition-transform"
                >
                  <MessageCircle size={18} />
                  Falar agora no WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="block mx-auto mt-6 font-body text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Enviar outro contato
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="lead-name" className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                      Nome *
                    </Label>
                    <Input
                      id="lead-name"
                      value={values.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Seu nome"
                      autoComplete="name"
                      maxLength={100}
                      className="h-11 mt-2 bg-background border-border font-body"
                    />
                    {errorText("name")}
                  </div>

                  <div>
                    <Label htmlFor="lead-whatsapp" className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                      WhatsApp *
                    </Label>
                    <Input
                      id="lead-whatsapp"
                      value={values.whatsapp}
                      onChange={(e) => setField("whatsapp", e.target.value)}
                      placeholder="(31) 98109-6698"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={20}
                      className="h-11 mt-2 bg-background border-border font-body"
                    />
                    {errorText("whatsapp")}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="lead-email" className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                      E-mail
                    </Label>
                    <Input
                      id="lead-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="voce@barbearia.com.br"
                      autoComplete="email"
                      maxLength={255}
                      className="h-11 mt-2 bg-background border-border font-body"
                    />
                    {errorText("email")}
                  </div>

                  <div>
                    <Label htmlFor="lead-shop" className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                      Nome da barbearia
                    </Label>
                    <Input
                      id="lead-shop"
                      value={values.shop_name}
                      onChange={(e) => setField("shop_name", e.target.value)}
                      placeholder="Barbearia do Carlos"
                      autoComplete="organization"
                      maxLength={120}
                      className="h-11 mt-2 bg-background border-border font-body"
                    />
                    {errorText("shop_name")}
                  </div>
                </div>

                <div>
                  <Label htmlFor="lead-plan" className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                    Plano de interesse
                  </Label>
                  <Select
                    value={values.plan_interest}
                    onValueChange={(value) => setField("plan_interest", value)}
                  >
                    <SelectTrigger
                      id="lead-plan"
                      className="h-11 mt-2 bg-background border-border font-body"
                    >
                      <SelectValue placeholder="Escolher plano" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {KNOWN_PLANS.map((plan) => (
                        <SelectItem key={plan} value={plan} className="font-body text-sm">
                          {plan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errorText("plan_interest")}
                </div>

                <div>
                  <Label htmlFor="lead-message" className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                    O que você quer resolver?
                  </Label>
                  <Textarea
                    id="lead-message"
                    value={values.message}
                    onChange={(e) => setField("message", e.target.value)}
                    placeholder="Ex.: perco clientes porque atendo só por telefone."
                    rows={4}
                    maxLength={1000}
                    className="mt-2 bg-background border-border font-body resize-none"
                  />
                  {errorText("message")}
                </div>

                {/* Honeypot — hidden from people, attractive to bots. */}
                <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="lead-website">Não preencha</label>
                  <input
                    id="lead-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(e) => setField("website", e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-gradient-gold text-primary-foreground font-body font-bold text-base hover:scale-[1.02] transition-transform"
                >
                  {submitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Quero Começar
                    </>
                  )}
                </Button>

                <p className="font-body text-center text-xs text-muted-foreground">
                  Prefere falar direto?{" "}
                  <a
                    href={WHATSAPP_HELP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Chame no WhatsApp
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
