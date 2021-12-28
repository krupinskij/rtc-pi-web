import MuiCardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';

interface Props {
  align?: 'start' | 'center' | 'end';
  direction?: 'column' | 'row';
}

const CardContent = styled(MuiCardContent)<Props>(
  ({ align, direction }: Props) => `
    display: flex;
    flex-direction: ${direction || 'column'};
    justify-content: ${align || 'center'};
    align-items: center;
    padding-top: 24px;
  `
);

export default CardContent;
