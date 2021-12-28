import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import englishFlagIcon from 'assets/lang/flag-en.svg';
import polishFlagIcon from 'assets/lang/flag-pl.svg';
import Card, { CardContent } from 'components/Card';
import Form, { FormFields, FormTitle } from 'components/Form';
import { SelectField } from 'components/Form/Field';
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
            <FormTitle>{t('settings.change-language')}</FormTitle>
            <FormFields>
              <SelectField
                label={t('settings.select-language')}
                value={i18n.language}
                options={languageOptions}
                onChange={handleLanguageChange}
              />
            </FormFields>
          </CardContent>
        </Card>
      </Form>
    </Container>
  );
};

export default ChangeLanguageContainer;
