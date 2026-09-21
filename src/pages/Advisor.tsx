import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Loader2, AlertTriangle, RefreshCw, MessageCircle, ArrowUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";

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
      toast.error(t("advisor_error"));
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
    <div className="relative overflow-hidden py-10 md:py-16">
      <Seo
        title="AI Herbal Advisor — Personalised Wellness Guidance"
        description="Describe your symptoms and get gentle, herbal-focused guidance from our Naturopathic AI Advisor. Not a replacement for medical care."
        path="/advisor"
      />
      <div className="container-narrow">
        <header className="mb-8 flex flex-col gap-6 border-b border-border/70 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-ochre">{t("advisor_eyebrow")}</p>
            <h1 className="mt-3 font-display text-5xl leading-[0.98] text-moss-deep md:text-7xl">{t("advisor_title")}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("advisor_subtitle")}</p>
          </div>
          <div className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-ochre" /> Ready when you are
          </div>
        </header>

        <div className="grid overflow-hidden rounded-xl border border-border/70 bg-card/70 shadow-soft lg:grid-cols-12">
          <aside className="border-b border-border/70 bg-secondary/25 p-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ochre">Wellness intake</p>
            <div className="mt-8 flex items-end justify-between border-b border-border/70 pb-6">
              <span className="font-display text-7xl leading-none text-moss-deep">01</span>
              <span className="pb-1 text-right text-xs uppercase tracking-[0.18em] text-muted-foreground">Your<br />context</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Start with what you are noticing. The advisor will organize your concerns into gentle, herbal-focused guidance.</p>
            <div className="mt-8 space-y-4 border-t border-border/70 pt-6">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ochre" strokeWidth={1.6} />
                <p className="text-sm leading-relaxed text-muted-foreground">Doctor-informed wellness perspective, never a diagnosis.</p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                <p className="text-sm leading-relaxed text-muted-foreground">From our Ado-Ekiti headquarters to your wellness journey worldwide.</p>
              </div>
            </div>
          </aside>

          <section className="flex min-h-[34rem] flex-col p-6 md:p-8 lg:col-span-8">
            <div className="mb-8 flex items-start justify-between gap-4 border-b border-border/70 pb-5">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Personal AI health concierge</p>
                <h2 className="mt-2 font-display text-3xl text-moss-deep md:text-4xl">Tell us how you feel</h2>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:block">Secure wellness prompt</span>
            </div>

            <div ref={wrapperRef} className="relative flex-1">
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
                className="min-h-40 resize-none rounded-lg border-border bg-background/60 p-5 text-base leading-relaxed focus-visible:ring-ochre"
                disabled={loading}
              />
              {showSuggest && filteredSuggestions.length > 0 && (
                <ul role="listbox" className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-auto rounded-md border border-border bg-background shadow-lg">
                  {filteredSuggestions.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => { setSymptoms(s); setShowSuggest(false); }} className="block w-full px-4 py-3 text-left text-sm text-foreground transition hover:bg-secondary/40">
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={() => ask(symptoms)} disabled={loading || symptoms.trim().length < 3} className="bg-primary text-primary-foreground hover:bg-moss-deep" size="lg">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> {t("advisor_thinking")}</> : <><ArrowUp className="h-4 w-4" /> {t("advisor_submit")}</>}
              </Button>
              {answer && <Button variant="outline" onClick={reset} size="lg"><RefreshCw className="h-4 w-4" /> {t("advisor_clear")}</Button>}
            </div>

            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("advisor_examples_title")}</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <button key={ex} onClick={() => { setSymptoms(ex); ask(ex); }} disabled={loading} className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs text-moss-deep transition hover:border-ochre hover:bg-secondary/35 disabled:opacity-50">
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <aside className="mt-8 border-t border-border/70 pt-5">
              <div className="border-l-2 border-ochre bg-secondary/25 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-ochre" strokeWidth={1.6} />
                  <div>
                    <p className="font-display text-base text-moss-deep">{t("advisor_disclaimer_title")}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t("advisor_disclaimer_body")}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline" className="border-border bg-transparent hover:bg-secondary/35"><Link to="/consultation">{t("advisor_book_consult")}</Link></Button>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-moss-deep"><a href={waLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> {t("wa_chat_expert")}</a></Button>
              </div>
            </aside>
          </section>
        </div>

        {answer && (
          <section className="mt-8 rounded-xl border border-border/70 bg-card/70 p-6 shadow-card md:p-10">
            <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-moss-deep prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-strong:text-moss-deep prose-blockquote:border-l-ochre prose-blockquote:text-muted-foreground prose-li:my-1">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Advisor;
