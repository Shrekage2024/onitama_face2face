import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import GameOver from './GameOver';
import GameCard from './GameCard';
import GameGrid from './GameGrid';
import GameHand from './GameHand';
import GameTurn from './GameTurn';
import GameScore from './GameScore';

function GameBoard({
  src = null,
  setSrc,
  grid,
  winner = null,
  player = null,
  turn,
  spare,
  blueCards,
  redCards,
  setCard,
  card = null,
  canMove,
  lastMove = null,
  dstMoveRankings = null,
  connectionStatus = null,
  isMoveValid,
  move,
  discard,
  reset = null,
  canUndo = null,
  undo = null,
  score = null,
  stale = true,
}) {
  const theme = useTheme();
  const [minimizedGameOver, setMinimizedGameOver] = useState(false);
  useEffect(() => {
    if (!winner) {
      setMinimizedGameOver(false);
    }
  }, [winner, setMinimizedGameOver]);
  const hideSideSpare = useMediaQuery(theme.breakpoints.down('md'));
  // Whether it's the player's turn, always true if local multiplayer
  const playerTurn = player ? player === turn : true;
  // Whether perspective should have red at bottom of screen
  const redOriented = player !== 'Blue';
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <GameTurn player={player} turn={turn} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: redOriented ? 'row' : 'row-reverse',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
          }}
        >
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Box>
        <GameOver
          reset={reset}
          winner={winner}
          player={player}
          connectionStatus={connectionStatus}
          minimizedGameOver={minimizedGameOver}
          setMinimizedGameOver={setMinimizedGameOver}
        />
        <Box
          sx={{
            display: hideSideSpare ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '33%',
          }}
        >
          {turn === 'Blue' && (
            <GameCard
              spare
              inverted={redOriented}
              moves={spare.moves}
              enabled={false}
              setCard={setCard}
              name={spare.card}
              direction={spare.direction}
              selected={false}
            />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: redOriented ? 'column' : 'column-reverse',
            }}
          >
            <GameHand
              setCard={setCard}
              selectedCard={card}
              spare={spare}
              discard={discard}
              canMove={canMove}
              cards={blueCards}
              enabled={turn === 'Blue' && playerTurn}
              isPlayerTurn={turn === 'Blue'}
              inverted={redOriented}
            />
            <GameGrid
              isMoveValid={isMoveValid}
              move={move}
              src={src}
              setSrc={setSrc}
              grid={grid}
              turn={turn}
              lastMove={lastMove}
              dstMoveRankings={dstMoveRankings || {}}
              redOriented={redOriented}
            />
            <GameHand
              setCard={setCard}
              selectedCard={card}
              spare={spare}
              discard={discard}
              canMove={canMove}
              cards={redCards}
              enabled={turn === 'Red' && playerTurn}
              isPlayerTurn={turn === 'Red'}
              inverted={!redOriented}
            />
          </Box>
          <GameScore score={score} stale={stale} playerIsRed={player === 'Red'} />
        </Box>
        <Box
          sx={{
            display: hideSideSpare ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '33%',
          }}
        >
          {turn === 'Red' && (
            <GameCard
              spare
              inverted={!redOriented}
              moves={spare.moves}
              enabled={false}
              setCard={setCard}
              name={spare.card}
              direction={spare.direction}
              selected={false}
            />
          )}
        </Box>
      </Box>
      {undo && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            py: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: '320px',
            }}
          >
            <Button
              color="inherit"
              variant="contained"
              disabled={!canUndo}
              startIcon={<UndoIcon />}
              onClick={undo}
            >
              Undo last move
            </Button>
          </Box>
        </Box>
      )}
      {minimizedGameOver && Boolean(winner) && (
        <Box
          sx={{
            p: 1,
            display: 'flex',
            position: 'sticky',
            justifyContent: 'center',
            bottom: '0px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '320px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button color="inherit" variant="contained" onClick={reset}>
              Rematch
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default GameBoard;
