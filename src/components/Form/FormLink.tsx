import { Theme, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

interface Props {
  prefix?: string;
  suffix?: string;
  text: string;
  to: string;
}

const FormLink = ({ prefix, suffix, text, to }: Props) => {
  return (
    <FormLinkWrapper>
      <Typography align="center" variant="body2">
        {prefix && <span>{prefix} </span>}
        <LinkWrapper to={to}>{text}</LinkWrapper>
        {suffix && <span> {suffix}</span>}
      </Typography>
    </FormLinkWrapper>
  );
};

export default FormLink;

const FormLinkWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(8, 0)}
  `
);

const LinkWrapper = styled(Link)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    color: ${theme.palette.primary.main}
  `
);
