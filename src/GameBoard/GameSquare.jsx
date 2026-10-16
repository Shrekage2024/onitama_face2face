import { Box, Paper, Tooltip } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn, faChessKing, faSkull, faStar } from '@fortawesome/free-solid-svg-icons';
import Color from 'color';

const icons = {
  Empty: null,
  BluePawn: <FontAwesomeIcon icon={faChessPawn} color="#2196f3" size="3x" />,
  BlueKing: <FontAwesomeIcon icon={faChessKing} color="#2196f3" size="3x" />,
  RedPawn: <FontAwesomeIcon icon={faChessPawn} color="#f44336" size="3x" />,
  RedKing: <FontAwesomeIcon icon={faChessKing} color="#f44336" size="3x" />,
};
const useStyles = makeStyles()((theme) => ({
  selected: {
    borderColor: theme.palette.primary.main,
  },
  valid: {
    borderColor: theme.palette.secondary.dark,
  },
  selectable: {
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    cursor: 'pointer',
  },
  lastMove: {
    // Styling for the squares the were in the last move
    // borderColor: `${theme.palette.success.dark}a0`,
  },
  redBase: {
    backgroundColor: Color(theme.palette.background.paper).mix(Color('#f44336'), 0.1).hex(),
  },
  blueBase: {
    backgroundColor: Color(theme.palette.background.paper).mix(Color('#2196f3'), 0.1).hex(),
  },
  flipped: {
    transform: 'rotate(180deg)',
  },
  rankMarker: {
    position: 'absolute',
    transform: 'translate(-20px, -20px)',
  },
}));
const tilePlayer = {
  BluePawn: 'Blue',
  BlueKing: 'Blue',
  RedPawn: 'Red',
  RedKing: 'Red',
};

function Skull() {
  const { classes } = useStyles();
  return (
    <Tooltip title="likely lose">
      <Box className={classes.rankMarker}>
        <FontAwesomeIcon icon={faSkull} color="#ffffff" size="xs" />
      </Box>
    </Tooltip>
  );
}

function Star() {
  const { classes } = useStyles();
  return (
    <Tooltip title="guaranteed win">
      <Box className={classes.rankMarker}>
        <FontAwesomeIcon icon={faStar} color="#ffff00" size="xs" bounce />
      </Box>
    </Tooltip>
  );
}

function GameSquare({
  tile,
  x,
  y,
  src = null,
  setSrc,
  turn = null,
  move,
  isValid,
  lastMove = null,
  ranking,
  flipBluePieces = false,
}) {
  const { classes, cx } = useStyles();
  const player = tilePlayer[tile];
  const activePlayer = turn === player;
  const selected = x === src?.x && y === src?.y;
  const selectable = !selected && Boolean(activePlayer || src);
  const lastSrc = x === lastMove?.src?.x && y === lastMove?.src?.y;
  const lastDst = x === lastMove?.dst?.x && y === lastMove?.dst?.y;
  const moved = lastSrc || lastDst;
  return (
    <Paper
      variant="outlined"
      sx={{
        width: '64px',
        height: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className={cx({
        [classes.selected]: selected,
        [classes.selectable]: selectable || isValid,
        [classes.valid]: isValid,
        [classes.redBase]: x === 2 && y === 4,
        [classes.blueBase]: x === 2 && y === 0,
        [classes.lastMove]: moved && !isValid,
      })}
      onClick={() => {
        if (activePlayer) {
          setSrc({ x, y });
        } else {
          move({ x, y });
        }
      }}
    >
      {ranking < -1000000 && <Skull />}
      {ranking > 1000000 && <Star />}
      {flipBluePieces && player === 'Blue' ? (
        <Box className={classes.flipped}>{icons[tile]}</Box>
      ) : (
        icons[tile]
      )}
    </Paper>
  );
}

export default GameSquare;
