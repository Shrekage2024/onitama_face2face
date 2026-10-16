import { Box, useMediaQuery, useTheme } from '@mui/material';
import GameCard from './GameCard';

function GameHand({
  cards,
  setCard,
  selectedCard = null,
  canMove,
  enabled,
  discard,
  spare,
  isPlayerTurn,
  inverted = false,
}) {
  const theme = useTheme();
  const showSpare = useMediaQuery(theme.breakpoints.down('md')) && !isPlayerTurn;
  return (
    <Box
      style={{ gap: '8px' }}
      sx={{
        display: 'flex',
        flexDirection: inverted ? 'row-reverse' : 'row',
      }}
    >
      {showSpare && (
        <GameCard
          setCard={setCard}
          name={spare.card}
          direction={spare.direction}
          selected={false}
          moves={spare.moves}
          enabled={enabled}
          canMove={canMove}
          discard={discard}
          showPlayed
          inverted={!inverted}
        />
      )}
      {cards.map(({ card: name, moves, direction }) => (
        <GameCard
          setCard={setCard}
          name={name}
          direction={direction}
          selected={selectedCard?.card === name}
          key={name}
          moves={moves}
          enabled={enabled}
          canMove={canMove}
          discard={discard}
          inverted={inverted}
        />
      ))}
    </Box>
  );
}

export default GameHand;
