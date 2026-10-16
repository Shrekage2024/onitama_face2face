import { Link } from 'react-router';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles()((theme) => ({
  blue: {
    color: theme.palette.info.main,
  },
  red: {
    color: theme.palette.error.main,
  },
  dialog: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8),
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const captionsFromStatus = {
  OpponentRematchRequested: 'Opponent requested a rematch',
  RematchRequested: 'Rematch request sent',
};
function GameOver({
  winner = null,
  reset,
  player = null,
  connectionStatus = null,
  minimizedGameOver,
  setMinimizedGameOver,
}) {
  const { classes, cx } = useStyles();
  const relativeText = player === winner ? 'You Win!' : 'You Lose!';
  const absoluteText = `${winner} wins!`;
  const text = player ? relativeText : absoluteText;
  const caption = captionsFromStatus[connectionStatus];
  return (
    <Dialog open={Boolean(winner) && !minimizedGameOver} classes={{ paper: classes.dialog }}>
      <Box
        sx={{
          position: 'absolute',
          top: '0px',
          right: '0px',
        }}
      >
        <IconButton onClick={() => setMinimizedGameOver(true)} size="large">
          <Close />
        </IconButton>
      </Box>
      <DialogTitle
        className={cx({
          [classes.red]: winner === 'Red',
          [classes.blue]: winner === 'Blue',
        })}
      >
        {text}
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" onClick={reset} color="primary">
          Rematch
        </Button>
        <Button variant="outlined" color="secondary" component={Link} to="/">
          Main Menu
        </Button>
      </DialogActions>
      <Typography variant="subtitle1">{caption}</Typography>
    </Dialog>
  );
}

export default GameOver;
