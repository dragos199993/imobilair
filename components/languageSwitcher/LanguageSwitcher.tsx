import { useLocale, useTranslations } from 'next-intl'

import { locales } from '@/lib/i18n'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LanguageSwitcherSelect } from '@/components/languageSwitcher/LanguageSwitcherSelect'

export default function LanguageSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <>
      <LanguageSwitcherSelect defaultValue={locale}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {t(locale)}
            </SelectItem>
          ))}
        </SelectContent>
      </LanguageSwitcherSelect>
    </>
  )
}
