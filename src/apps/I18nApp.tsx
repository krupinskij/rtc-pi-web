import i18n from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';

import { en, pl } from 'translations';

i18n.use(initReactI18next).init({
  resources: {
    en,
    pl,
  },
  lng: localStorage.getItem('language') || 'pl',
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false,
  },
});

const I18nApp: React.FC = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nApp;
