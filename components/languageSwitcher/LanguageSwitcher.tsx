import { useLocale, useTranslations } from 'next-intl'

import { LanguageSwitcherSelect } from '@/components/languageSwitcher/LanguageSwitcherSelect'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { locales } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LanguageSwitcherSelect defaultValue={locale}>
      <SelectTrigger className="w-full sm:w-[140px]" aria-label={t(locale)}>
        <SelectValue placeholder={t(locale)} />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {t(locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </LanguageSwitcherSelect>
  )
}
