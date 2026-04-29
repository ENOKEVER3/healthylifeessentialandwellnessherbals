import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, languages, flagEmoji } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  align?: "start" | "center" | "end";
}

export const LanguageSwitcher = ({ className, align = "end" }: LanguageSwitcherProps) => {
  const { lang, setLang, t } = useLanguage();
  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-moss focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        aria-label={t("language")}
      >
        <Globe className="h-4 w-4" strokeWidth={1.5} />
        <span className="text-base leading-none" aria-hidden="true">
          {flagEmoji(current.iso)}
        </span>
        <span className="hidden uppercase tracking-wide sm:inline">{current.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-48">
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.18em] text-moss">
          {t("language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code)}
            className="flex items-center gap-2"
          >
            <span className="text-base leading-none" aria-hidden="true">
              {flagEmoji(l.iso)}
            </span>
            <span className="flex-1">{l.native}</span>
            {l.code === lang && <Check className="h-3.5 w-3.5 text-moss" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
