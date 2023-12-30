import { useTranslations } from 'next-intl'

export const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {process.env.NEXT_PUBLIC_APP_NAME}. {t('all_rights_reserved')}
      </p>
    </footer>
  )
}
