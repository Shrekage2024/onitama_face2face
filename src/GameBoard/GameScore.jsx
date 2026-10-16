import { Box } from '@mui/material';

function GameScore({ score = null, stale = true, playerIsRed }) {
  if (!score) {
    return null;
  }
  const red = '#f44336';
  const blue = '#2196f3';
  const outer = playerIsRed ? blue : red;
  const inner = playerIsRed ? red : blue;
  return (
    <Box
      style={{ opacity: stale ? 0.5 : 1 }}
      sx={{
        maxWidth: '0px',
        height: '100%',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '8px',
          bgcolor: outer,
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        <Box
          style={{
            transform: `translateY(${(100 - score).toFixed(0)}%)`,
            transition: 'transform 1s',
          }}
          sx={{
            height: '100%',
            width: '8px',
            bgcolor: inner,
          }}
        />
      </Box>
    </Box>
  );
}

export default GameScore;
