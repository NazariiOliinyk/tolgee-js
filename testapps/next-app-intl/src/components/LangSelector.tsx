'use client';

import React, { ChangeEvent, useTransition } from 'react';
import { useTolgee } from '@tolgee/react';
import { usePathname, useRouter } from '@/navigation';

export const LangSelector: React.FC = () => {
  const tolgee = useTolgee(['language']);
  const language = tolgee.getLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [_, startTransition] = useTransition();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const newLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }
  return (
    <select
      className="lang-selector"
      onChange={onSelectChange}
      value={language}
    >
      <option value="en">English</option>
      <option value="cs">Česky</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
    </select>
  );
};
