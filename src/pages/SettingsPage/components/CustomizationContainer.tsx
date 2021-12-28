import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { ThemeMode } from 'model';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeModeContext } from 'apps/ThemeApp';
import englishFlagIcon from 'assets/lang/flag-en.svg';
import polishFlagIcon from 'assets/lang/flag-pl.svg';
import Card, { CardContent } from 'components/Card';
import Form, { FormFields, FormTitle } from 'components/Form';
import { SelectField, SwitchField } from 'components/Form/Field';
import { FieldOption } from 'components/Form/model';
import Container from 'components/common/Container';

const languageOptions: FieldOption[] = [
  {
    value: 'en',
    display: 'settings.language.en',
    icon: englishFlagIcon,
  },
  {
    value: 'pl',
    display: 'settings.language.pl',
    icon: polishFlagIcon,
  },
];

const ChangeLanguageContainer = () => {
  const { t, i18n } = useTranslation();
  const { themeMode, toggleThemeMode } = useContext(ThemeModeContext);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value;
    axios.defaults.headers.common['Accept-Language'] = lang;
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Container>
      <Form onSubmit={() => {}}>
        <Card>
          <CardContent>
            <FormTitle>{t('settings.customization')}</FormTitle>
            <FormFields>
              <SelectField
                label={t('settings.select-language')}
                value={i18n.language}
                options={languageOptions}
                onChange={handleLanguageChange}
              />
              <SwitchField
                checked={themeMode === ThemeMode.Dark}
                label={t('settings.dark-mode')}
                onChange={toggleThemeMode}
              />
            </FormFields>
          </CardContent>
        </Card>
      </Form>
    </Container>
  );
};

export default ChangeLanguageContainer;
