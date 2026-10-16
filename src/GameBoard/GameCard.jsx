import { Paper, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import GameMove from './GameMoves';

const useStyles = makeStyles()((theme, { enabled, spare, inverted }) => ({
  card: {
    display: 'flex',
    flexDirection: inverted ? 'column-reverse' : 'column',
    flexBasis: spare ? null : '50%',
    maxWidth: spare ? '100%' : '50%',
    height: '142px',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    cursor: enabled ? 'pointer' : 'default',
    color: enabled ? theme.palette.common.white : theme.palette.action.disabled,
    backgroundColor: enabled ? theme.palette.background.paper : '#1a1d21',
    borderStyle: 'solid',
    borderWidth: '1px',
    [inverted ? 'borderBottomColor' : 'borderTopColor']: theme.palette.primary.main,
  },
  selected: {
    borderColor: theme.palette.primary.main,
  },
  spare: {
    flexBasis: null,
    width: '156px',
    height: '142px',
  },
  noMoves: {
    borderColor: theme.palette.error.main,
  },
  hasMoves: {
    borderColor: theme.palette.grey['600'],
  },
  error: {
    color: theme.palette.error.main,
  },
  played: {
    borderColor: theme.palette.secondary.dark,
  },
}));

function GameCard({
  name,
  direction,
  setCard,
  selected = false,
  enabled = false,
  moves,
  spare = false,
  canMove = true,
  discard = () => {},
  inverted = false,
  showPlayed = false,
}) {
  const { classes, cx } = useStyles({ enabled, spare, inverted });
  const handler = () => {
    if (enabled && !canMove) {
      discard(name);
    } else if (enabled) {
      setCard({ card: name, moves, direction });
    }
  };
  return (
    <Paper
      className={cx({
        [classes.card]: true,
        [classes.spare]: spare,
        [classes.noMoves]: enabled && !canMove,
        [classes.hasMoves]: enabled && canMove && !selected,
        [classes.selected]: selected,
        [classes.played]: showPlayed,
      })}
      onClick={handler}
    >
      <Typography variant="subtitle1">{name}</Typography>
      <GameMove moves={moves} direction={direction} inverted={inverted} />
      {!canMove && enabled && (
        <Typography className={classes.error} variant="caption">
          Discard
        </Typography>
      )}
      {showPlayed && <Typography variant="caption">(played)</Typography>}
    </Paper>
  );
}

export default GameCard;
