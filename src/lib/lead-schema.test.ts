import { describe, it, expect } from "vitest";
import { leadSchema, toInsertPayload, whatsappDigits, KNOWN_PLANS } from "./lead-schema";

const valid = {
  name: "Carlos Silva",
  whatsapp: "31981096698",
  email: "carlos@barbearia.com.br",
  shop_name: "Barbearia do Carlos",
  plan_interest: "Premium",
  message: "Quero ver o sistema funcionando.",
};

describe("leadSchema", () => {
  it("accepts a complete lead", () => {
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a one-character name", () => {
    const result = leadSchema.safeParse({ ...valid, name: "C" });
    expect(result.success).toBe(false);
  });

  it("rejects a WhatsApp with too few digits", () => {
    expect(leadSchema.safeParse({ ...valid, whatsapp: "3198109" }).success).toBe(false);
  });

  it("rejects a WhatsApp with too many digits", () => {
    expect(leadSchema.safeParse({ ...valid, whatsapp: "55319810966981234" }).success).toBe(false);
  });

  it("accepts a formatted WhatsApp and keeps only its digits", () => {
    const result = leadSchema.safeParse({ ...valid, whatsapp: "(31) 98109-6698" });
    expect(result.success).toBe(true);
    expect(whatsappDigits("(31) 98109-6698")).toBe("31981096698");
  });

  it("accepts the form without an e-mail", () => {
    expect(leadSchema.safeParse({ ...valid, email: "" }).success).toBe(true);
  });

  it("rejects a malformed e-mail", () => {
    expect(leadSchema.safeParse({ ...valid, email: "carlos@" }).success).toBe(false);
  });

  it("rejects a plan that is not offered", () => {
    expect(leadSchema.safeParse({ ...valid, plan_interest: "Plano Inventado" }).success).toBe(false);
  });

  it("accepts every plan shown on the page", () => {
    for (const plan of KNOWN_PLANS) {
      expect(leadSchema.safeParse({ ...valid, plan_interest: plan }).success).toBe(true);
    }
  });

  it("rejects a message over 1000 characters", () => {
    expect(leadSchema.safeParse({ ...valid, message: "a".repeat(1001) }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, message: "a".repeat(1000) }).success).toBe(true);
  });
});

describe("toInsertPayload", () => {
  it("turns blank optional fields into null", () => {
    const parsed = leadSchema.parse({
      name: "Rafael Costa",
      whatsapp: "(31) 98109-6698",
      email: "",
      shop_name: "   ",
      plan_interest: "Lobo Solitário",
      message: "",
    });
    expect(toInsertPayload(parsed)).toEqual({
      name: "Rafael Costa",
      whatsapp: "31981096698",
      email: null,
      shop_name: null,
      plan_interest: "Lobo Solitário",
      message: null,
    });
  });

  it("trims the fields that are filled in", () => {
    const parsed = leadSchema.parse({
      name: "  André Mendes  ",
      whatsapp: "31981096698",
      email: " andre@rede.com ",
      shop_name: " Rede Barbearias ",
      plan_interest: "Premium",
      message: "  Oi  ",
    });
    const payload = toInsertPayload(parsed);
    expect(payload.name).toBe("André Mendes");
    expect(payload.email).toBe("andre@rede.com");
    expect(payload.shop_name).toBe("Rede Barbearias");
    expect(payload.message).toBe("Oi");
  });
});
