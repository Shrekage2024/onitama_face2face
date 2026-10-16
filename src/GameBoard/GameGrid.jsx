import { Box, Paper } from '@mui/material';
import GameSquare from './GameSquare';
import LastMove from './LastMove';

function GameGrid({
  grid,
  isMoveValid,
  src = null,
  setSrc,
  turn = null,
  move,
  lastMove = null,
  redOriented,
  dstMoveRankings,
  flipBluePieces = false,
}) {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: redOriented ? 'column' : 'column-reverse',
        my: 2,
      }}
    >
      <LastMove lastMove={lastMove} redOriented={redOriented} />
      {grid.map((row, y) => (
        <Box
          key={y}
          sx={{
            display: 'flex',
            flexDirection: redOriented ? 'row' : 'row-reverse',
          }}
        >
          {row.map((tile, x) => (
            <GameSquare
              tile={tile}
              x={x}
              y={y}
              src={src}
              setSrc={setSrc}
              turn={turn}
              move={move}
              isValid={isMoveValid(x, y)}
              key={`${x}-${y}`}
              lastMove={lastMove}
              flipBluePieces={flipBluePieces}
              ranking={(dstMoveRankings[`${x},${y}`] || 0) * (redOriented ? 1 : -1)}
            />
          ))}
        </Box>
      ))}
    </Paper>
  );
}

export default GameGrid;
