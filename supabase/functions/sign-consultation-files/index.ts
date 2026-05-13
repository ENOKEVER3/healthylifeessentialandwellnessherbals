import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Returns short-lived signed URLs (7 days) for files just uploaded by the
// anonymous consultation form, so the doctor can open them from WhatsApp/email
// without the bucket being public.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { paths } = await req.json();
    if (!Array.isArray(paths) || paths.length === 0 || paths.length > 10) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    // Only allow paths under HLE-XXXXXX/ to prevent enumerating the whole bucket
    const safe = paths.every(
      (p) => typeof p === "string" && /^HLE-[A-Z0-9]{6}\/[\w.\-]+$/.test(p),
    );
    if (!safe) {
      return new Response(JSON.stringify({ error: "Invalid path." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase.storage
      .from("consultation-uploads")
      .createSignedUrls(paths, 60 * 60 * 24 * 7); // 7 days

    if (error) {
      console.error("createSignedUrls failed", error);
      return new Response(JSON.stringify({ error: "Could not sign files." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const urls = (data ?? []).map((d) => d.signedUrl).filter(Boolean);
    return new Response(JSON.stringify({ urls }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sign-consultation-files error", e);
    return new Response(JSON.stringify({ error: "Unexpected error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
