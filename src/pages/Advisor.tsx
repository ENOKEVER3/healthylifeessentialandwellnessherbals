import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Sparkles, Loader2, AlertTriangle, RefreshCw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { toast } from "sonner";

const CASE_SUGGESTIONS = [
  "I'm having irregular periods",
  "I'm having PCOS",
  "I'm having excessive facial hair",
  "I'm having high prolactin",
  "I'm having vagina dryness",
  "I'm having low libido",
  "I'm having low progesterone",
  "I'm having fibroid",
  "I'm having ovarian cyst",
  "I'm having ulcer",
  "I'm having pelvic inflammatory disease",
  "I'm having urinary tract infection",
  "I'm having bacteria vaginitis",
  "I'm having staphylococcus infection",
  "I'm having candidiasis",
  "I'm having erectile dysfunction",
  "I'm having low sperm count",
  "I'm having low appetite",
  "I'm having blocked fallopian tubes",
  "I'm experiencing sperm leakage",
];

const Advisor = () => {
  const { t } = useLanguage();
  const [symptoms, setSymptoms] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const examples = CASE_SUGGESTIONS;

  const filteredSuggestions = useMemo(() => {
    const q = symptoms.trim().toLowerCase();
    if (q.length < 2) return [];
    return CASE_SUGGESTIONS.filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
  }, [symptoms]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const ask = async (text: string) => {
    const value = text.trim();
    if (value.length < 3) {
      toast.error(t("advisor_min_chars"));
      return;
    }
    setLoading(true);
    setAnswer("");
    try {
      const { data, error } = await supabase.functions.invoke("symptom-advisor", {
        body: { symptoms: value },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setAnswer(data?.answer ?? "");
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : t("advisor_error"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAnswer("");
    setSymptoms("");
  };

  const waLink = buildWhatsAppLink(
    `Hello Healthy Life Essentials 🌿 I used the AI Advisor and would like to discuss:\n\n"${symptoms}"`,
  );

  return (
    <main className="container-narrow py-14 md:py-20">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-ochre">{t("advisor_eyebrow")}</p>
        <h1 className="mt-3 font-display text-4xl text-moss-deep md:text-5xl">{t("advisor_title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("advisor_subtitle")}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,1fr]">
        <section>
          <div className="relative" ref={wrapperRef}>
            <Textarea
              value={symptoms}
              onChange={(e) => {
                setSymptoms(e.target.value);
                setShowSuggest(true);
              }}
              onFocus={() => setShowSuggest(true)}
              placeholder={t("advisor_placeholder")}
              rows={6}
              maxLength={2000}
              className="resize-none border-moss/30 focus-visible:ring-moss"
              disabled={loading}
            />
            {showSuggest && filteredSuggestions.length > 0 && (
              <ul
                role="listbox"
                className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-auto rounded-md border border-moss/30 bg-background shadow-lg"
              >
                {filteredSuggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => {
                        setSymptoms(s);
                        setShowSuggest(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm text-foreground transition hover:bg-cream/60"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              onClick={() => ask(symptoms)}
              disabled={loading || symptoms.trim().length < 3}
              className="bg-moss text-primary-foreground hover:bg-moss-deep"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> {t("advisor_thinking")}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> {t("advisor_submit")}
                </>
              )}
            </Button>
            {answer && (
              <Button variant="outline" onClick={reset} size="lg">
                <RefreshCw className="h-4 w-4" /> {t("advisor_clear")}
              </Button>
            )}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("advisor_examples_title")}
            </p>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => {
                    setSymptoms(ex);
                    ask(ex);
                  }}
                  disabled={loading}
                  className="rounded-full border border-moss/30 bg-cream/40 px-3 py-1.5 text-xs text-moss-deep transition hover:border-moss hover:bg-cream disabled:opacity-50"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-lg border border-ochre/40 bg-ochre/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-ochre" strokeWidth={1.6} />
              <div>
                <p className="font-display text-base text-moss-deep">{t("advisor_disclaimer_title")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("advisor_disclaimer_body")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline">
              <Link to="/consultation">{t("advisor_book_consult")}</Link>
            </Button>
            <Button asChild className="bg-[#25D366] text-white hover:bg-[#25D366]/90">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> {t("wa_chat_expert")}
              </a>
            </Button>
          </div>
        </aside>
      </div>

      {answer && (
        <section className="mt-14 rounded-lg border border-border bg-cream/30 p-6 md:p-10">
          <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-moss-deep prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-strong:text-moss-deep prose-blockquote:border-l-ochre prose-blockquote:text-muted-foreground prose-li:my-1">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </section>
      )}
    </main>
  );
};

export default Advisor;
