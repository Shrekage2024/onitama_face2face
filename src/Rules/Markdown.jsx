import ReactMarkdown from 'markdown-to-jsx';
import { withStyles } from 'tss-react/mui';
import { Typography, Link } from '@mui/material';

const styles = (theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
  image: {
    objectFit: 'cover',
    width: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h5' } },
    h3: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', sx: { display: 'block', mb: 2 } },
    },
    p: { component: Typography, props: { sx: { mb: 2 } } },
    a: { component: Link },
    img: {
      component: withStyles(
        ({ classes, alt, ...props }) => <img alt="alt" {...props} className={classes.image} />,
        styles,
      ),
    },
    li: {
      component: withStyles(
        ({ classes, ...props }) => (
          <li className={classes.listItem}>
            <Typography component="span" {...props} />
          </li>
        ),
        styles,
      ),
    },
  },
};

function Markdown({ children }) {
  return <ReactMarkdown options={options}>{children}</ReactMarkdown>;
}
export default Markdown;
