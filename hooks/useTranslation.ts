import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translation';
import { TranslationKeys } from '@/types/translations';

export function useTranslation<N extends keyof TranslationKeys>(namespace: N) {
  const { locale } = useLanguage();

  const t = translations[locale]?.[namespace] || translations.en[namespace];

return { t };
}