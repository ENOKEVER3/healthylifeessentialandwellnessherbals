import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Returns short-lived signed URLs (48h) for files just uploaded by the
// anonymous consultation form. To prevent an attacker who learns or guesses a
// path from re-issuing fresh signed URLs later, we require each file to have
// been uploaded within the last 10 minutes (i.e. signing is bound to the
// original upload window).
const FRESHNESS_WINDOW_MS = 10 * 60 * 1000;
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 48; // 48 hours

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
    const safe = paths.every(
      (p) => typeof p === "string" && /^HLE-[A-Z0-9]{6}\/[0-9]+-[\w.\-]+$/.test(p),
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

    // Verify each requested object exists AND was created very recently.
    // This binds signed-URL issuance to the original upload window: a leaked
    // path can no longer be re-signed days/weeks later.
    const cutoff = Date.now() - FRESHNESS_WINDOW_MS;
    for (const p of paths as string[]) {
      const slash = p.indexOf("/");
      const folder = p.slice(0, slash);
      const filename = p.slice(slash + 1);
      const { data: list, error: listErr } = await supabase.storage
        .from("consultation-uploads")
        .list(folder, { limit: 100, search: filename });
      if (listErr) {
        console.error("storage list failed", listErr);
        return new Response(JSON.stringify({ error: "Could not verify files." }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const obj = list?.find((o) => o.name === filename);
      if (!obj) {
        return new Response(JSON.stringify({ error: "File not found." }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const createdAt = new Date(obj.created_at ?? 0).getTime();
      if (!createdAt || createdAt < cutoff) {
        return new Response(
          JSON.stringify({ error: "File is no longer eligible for signing." }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    const { data, error } = await supabase.storage
      .from("consultation-uploads")
      .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);

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
