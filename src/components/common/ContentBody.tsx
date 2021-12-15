import { Card, CardContent, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  align?: 'start' | 'center' | 'end';
  direction?: 'column' | 'row';
}

const ContentBody: React.FC<Props> = ({ align = 'center', direction = 'row', children }) => {
  return (
    <ContentBodyWrapper>
      <CardContentAlign align={align} direction={direction}>
        {children}
      </CardContentAlign>
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
  ({ align, direction }: Props) => `
    display: flex;
    flex-direction: ${direction};
    justify-content: ${align};
    align-items: center;
    padding: 24px 0;
  `
);
