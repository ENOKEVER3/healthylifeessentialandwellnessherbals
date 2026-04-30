import { corsHeaders } from "@supabase/supabase-js/cors";

const SYSTEM_PROMPT = `You are a Naturopathic Wellness Assistant for "Healthy Life Essentials & Wellness Herbals", a Nigerian herbal brand founded by Naturopathic Dr. Kolawole Oluwatomisin Esther.

A user describes symptoms or how they're feeling. Respond ONLY with structured, calm, herbal-focused guidance.

Rules:
- NEVER diagnose. NEVER prescribe medication. NEVER replace a doctor.
- Always include a clear safety disclaimer.
- Recommend traditional herbs/botanicals (e.g. ginger, moringa, turmeric, hibiscus, soursop leaf, bitter leaf, scent leaf, fenugreek, ashwagandha, chamomile, aloe vera) where appropriate.
- Suggest gentle lifestyle adjustments (hydration, sleep, breathwork, nutrition).
- Tell the user to book a consultation or chat on WhatsApp for serious / persistent / pregnancy-related / child-related concerns.
- Keep tone warm, professional, concise. Use simple language.

Return your answer using EXACTLY this Markdown structure (no extra preamble):

### Possible causes
- bullet
- bullet

### Suggested herbs & remedies
- **Herb name** — short reason / how it may help

### Lifestyle advice
- bullet
- bullet

### When to seek medical help
- bullet

> ⚠️ This is general wellness guidance, not medical advice. Please consult Dr. Oluwatomisin or a qualified health professional for personal diagnosis and treatment.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { symptoms } = await req.json();
    if (!symptoms || typeof symptoms !== "string" || symptoms.trim().length < 3) {
      return new Response(JSON.stringify({ error: "Please describe your symptoms in a bit more detail." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (symptoms.length > 2000) {
      return new Response(JSON.stringify({ error: "Description is too long." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: symptoms.trim() },
        ],
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests right now. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact the site owner." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("symptom-advisor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
