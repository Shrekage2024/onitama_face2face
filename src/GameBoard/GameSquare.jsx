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
const validColor = '#4dd0c1';
const useStyles = makeStyles()((theme) => ({
  selected: {
    borderColor: theme.palette.primary.main,
    boxShadow: `inset 0 0 0 3px ${theme.palette.primary.main}`,
    backgroundColor: Color(theme.palette.background.paper)
      .mix(Color(theme.palette.primary.main), 0.25)
      .hex(),
  },
  // Squares the selected piece can move to, kept bright so they read on a tablet
  valid: {
    borderColor: validColor,
    boxShadow: `inset 0 0 0 3px ${validColor}`,
    backgroundColor: Color(theme.palette.background.paper).mix(Color(validColor), 0.35).hex(),
  },
  // A dot on empty destination squares, like chess apps
  validEmpty: {
    position: 'relative',
    '&::after': {
      content: '""',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      backgroundColor: validColor,
    },
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
  // Card moves can land on your own pieces, but those aren't legal destinations
  const showValid = isValid && !activePlayer;
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
        [classes.redBase]: x === 2 && y === 4,
        [classes.blueBase]: x === 2 && y === 0,
        [classes.lastMove]: moved && !showValid,
        [classes.selectable]: selectable || showValid,
        // Listed last so the highlight wins over the temple square colours
        [classes.selected]: selected,
        [classes.valid]: showValid,
        [classes.validEmpty]: showValid && tile === 'Empty',
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
