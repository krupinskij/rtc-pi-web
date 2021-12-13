import { Card, CardContent, Theme } from '@mui/material';
import { styled } from '@mui/system';

interface Props {
  align?: 'start' | 'center' | 'end';
}

const ContentBody: React.FC<Props> = ({ align = 'center', children }) => {
  return (
    <ContentBodyWrapper>
      <CardContentAlign align={align}>{children}</CardContentAlign>
    </ContentBodyWrapper>
  );
};

export default ContentBody;

const ContentBodyWrapper = styled(Card)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(4, 0)};
  `
);

const CardContentAlign = styled(CardContent)<Props>(
  ({ align }: Props) => `
    display: flex;
    justify-content: ${align};
    padding: 24px 0;
  `
);
