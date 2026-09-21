import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod";

const requestSchema = z.object({
  paths: z.array(z.string().regex(/^submissions\/[A-Za-z0-9._/-]+$/)).min(1).max(24),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid media request." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    const { paths } = parsed.data;
    const { data: approved, error: lookupError } = await supabase
      .from("package_reviews")
      .select("media_path")
      .eq("status", "approved")
      .in("media_path", paths);

    if (lookupError) {
      console.error("Approved media lookup failed", lookupError);
      return new Response(JSON.stringify({ error: "Could not load approved reviews." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const approvedPaths = (approved ?? []).map((row: { media_path: string }) => row.media_path);
    if (approvedPaths.length === 0) {
      return new Response(JSON.stringify({ urls: {} }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: signed, error: signError } = await supabase.storage
      .from("review-media")
      .createSignedUrls(approvedPaths, 60 * 60);
    if (signError) {
      console.error("Approved media signing failed", signError);
      return new Response(JSON.stringify({ error: "Could not load approved reviews." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const urls = Object.fromEntries(
      (signed ?? [])
        .filter((item) => Boolean(item.signedUrl))
        .map((item) => [item.path, item.signedUrl]),
    );
    return new Response(JSON.stringify({ urls }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("sign-package-review-media error", error);
    return new Response(JSON.stringify({ error: "Could not load approved reviews." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});