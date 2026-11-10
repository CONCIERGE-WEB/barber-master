import { z } from "zod";

export const KNOWN_PLANS = [
  "Lobo Solitário",
  "Presença Digital",
  "Gestão de Equipe",
  "Premium",
  "Ainda não sei",
] as const;

export type KnownPlan = (typeof KNOWN_PLANS)[number];

/** WhatsApp is stored as digits only so the row stays comparable and short. */
export const whatsappDigits = (value: string): string => value.replace(/\D/g, "");

const EMAIL_MAX = 255;
const MESSAGE_MAX = 1000;
const SHOP_MAX = 120;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mínimo 2 letras).")
    .max(100, "Nome muito longo."),
  whatsapp: z
    .string()
    .trim()
    .refine((value) => {
      const digits = whatsappDigits(value);
      return digits.length >= 10 && digits.length <= 13;
    }, "Informe um WhatsApp válido, com DDD."),
  email: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "E-mail inválido.",
    )
    .refine(
      (value) => !value || value.length <= EMAIL_MAX,
      "E-mail muito longo.",
    ),
  shop_name: z
    .string()
    .trim()
    .max(SHOP_MAX, "Nome da barbearia muito longo.")
    .optional(),
  plan_interest: z.enum(KNOWN_PLANS, {
    errorMap: () => ({ message: "Escolha um plano." }),
  }),
  message: z
    .string()
    .trim()
    .max(MESSAGE_MAX, "Mensagem muito longa (máximo 1000 caracteres).")
    .optional(),
});

export type LeadValues = z.infer<typeof leadSchema>;

/** Blank out optional text fields so the database stores null, not "". */
export const toInsertPayload = (values: LeadValues) => ({
  name: values.name,
  whatsapp: whatsappDigits(values.whatsapp),
  email: values.email?.trim() ? values.email.trim() : null,
  shop_name: values.shop_name?.trim() ? values.shop_name.trim() : null,
  plan_interest: values.plan_interest,
  message: values.message?.trim() ? values.message.trim() : null,
});
