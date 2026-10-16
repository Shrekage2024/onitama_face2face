import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import GameCard from './GameCard';
import GameGrid from './GameGrid';

const colors = {
  Red: '#f44336',
  Blue: '#2196f3',
};

// Largest scale the board is allowed to grow to on big screens
const MAX_SCALE = 2;

const useStyles = makeStyles()((theme) => ({
  viewport: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // Avoid double-tap zoom and accidental text selection on tablets
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transformOrigin: 'center center',
  },
  zone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius * 2,
    border: '2px solid transparent',
    transition: 'border-color 0.3s, opacity 0.3s',
  },
  rotated: {
    transform: 'rotate(180deg)',
  },
  inactive: {
    opacity: 0.6,
  },
  hand: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: theme.spacing(1),
  },
  spare: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
  },
  spareHidden: {
    visibility: 'hidden',
  },
  status: {
    fontWeight: 500,
  },
  boardWrapper: {
    position: 'relative',
  },
  gameOver: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  },
  home: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
  },
}));

// Scales `content` to fit inside the viewport, growing it on large screens
// like tablets and shrinking it on phones.
const useFitScale = () => {
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const update = useCallback(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) {
      return;
    }
    // offsetWidth/offsetHeight ignore transforms, giving the natural size
    const widthScale = viewport.clientWidth / content.offsetWidth;
    const heightScale = viewport.clientHeight / content.offsetHeight;
    setScale(Math.min(widthScale, heightScale, MAX_SCALE));
  }, []);
  useLayoutEffect(() => {
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewportRef.current);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [update]);
  return { viewportRef, contentRef, scale };
};

function statusText(color, turn, winner) {
  if (winner) {
    return winner === color ? 'You win!' : 'You lose!';
  }
  return turn === color ? 'Your turn' : "Opponent's turn";
}

function PlayerZone({
  color,
  turn,
  winner = null,
  cards,
  spare,
  card = null,
  setCard,
  canMove,
  discard,
}) {
  const { classes, cx } = useStyles();
  const isTurn = turn === color && !winner;
  return (
    <Box
      className={cx({
        [classes.zone]: true,
        [classes.rotated]: color === 'Blue',
        [classes.inactive]: !isTurn && !winner,
      })}
      style={{ borderColor: isTurn ? colors[color] : 'transparent' }}
    >
      <Box className={classes.hand}>
        {cards.map(({ card: name, moves, direction }) => (
          <GameCard
            spare
            key={name}
            name={name}
            moves={moves}
            direction={direction}
            setCard={setCard}
            selected={isTurn && card?.card === name}
            enabled={isTurn}
            canMove={canMove}
            discard={discard}
          />
        ))}
        <Box
          className={cx({
            [classes.spare]: true,
            // Keep the space reserved so the layout doesn't shift between turns
            [classes.spareHidden]: turn !== color,
          })}
        >
          <Typography variant="caption" color="text.secondary">
            Next card
          </Typography>
          <GameCard
            spare
            name={spare.card}
            moves={spare.moves}
            direction={spare.direction}
            setCard={setCard}
            enabled={false}
          />
        </Box>
      </Box>
      <Box
        sx={{
          mt: 1,
        }}
      >
        <Typography variant="h5" className={classes.status} style={{ color: colors[color] }}>
          {statusText(color, turn, winner)}
        </Typography>
      </Box>
    </Box>
  );
}

// Layout for two players sitting across from each other with a tablet between
// them. Red sits at the bottom, Blue at the top, and Blue's cards are rotated
// to face them.
function FaceToFaceBoard({
  src = null,
  setSrc,
  grid,
  winner = null,
  turn,
  spare,
  blueCards,
  redCards,
  setCard,
  card = null,
  canMove,
  lastMove = null,
  isMoveValid,
  move,
  discard,
  reset,
}) {
  const { classes } = useStyles();
  const { viewportRef, contentRef, scale } = useFitScale();
  const zone = (color, cards) => (
    <PlayerZone
      color={color}
      cards={cards}
      turn={turn}
      winner={winner}
      spare={spare}
      card={card}
      setCard={setCard}
      canMove={canMove}
      discard={discard}
    />
  );
  return (
    <>
      <Box className={classes.home}>
        <Button color="inherit" component={Link} to="/" size="small">
          Home
        </Button>
      </Box>
      <Box ref={viewportRef} className={classes.viewport}>
        <Box ref={contentRef} className={classes.content} style={{ transform: `scale(${scale})` }}>
          {zone('Blue', blueCards)}
          <Box className={classes.boardWrapper}>
            <GameGrid
              isMoveValid={isMoveValid}
              move={move}
              src={src}
              setSrc={setSrc}
              grid={grid}
              turn={winner ? null : turn}
              lastMove={lastMove}
              dstMoveRankings={{}}
              redOriented
              flipBluePieces
            />
            {winner && (
              <Box className={classes.gameOver}>
                <Button variant="contained" color="primary" onClick={reset}>
                  Rematch
                </Button>
                <Button variant="outlined" color="secondary" component={Link} to="/">
                  Main Menu
                </Button>
              </Box>
            )}
          </Box>
          {zone('Red', redCards)}
        </Box>
      </Box>
    </>
  );
}

export default FaceToFaceBoard;
