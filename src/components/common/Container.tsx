import styled from '@emotion/styled';
import { Theme } from '@mui/material';

type Size = 'small' | 'middle' | 'large';

const variants: Record<Size, [string, string, string]> = {
  small: ['400px', '45%', '700px'],
  middle: ['450px', '50%', '750px'],
  large: ['400px', '75%', '1200px'],
};

const Container = styled('div')<{ theme?: Theme; size?: Size }>(
  ({ theme, size }: { theme: Theme; size?: Size }) => `
    width: clamp(${variants[size || 'small'].join(', ')});
    margin: ${theme.spacing(4, 'auto')};
  `
);

export default Container;
