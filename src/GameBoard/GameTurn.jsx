import { Box, Typography } from '@mui/material';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  Red: {
    color: '#f44336',
  },
  Blue: {
    color: '#2196f3',
  },
}));
function GameTurn({ turn, player = null }) {
  const { classes } = useStyles();
  const relativeName = player === turn ? 'Your Turn' : "Opponent's Turn";
  const absoluteName = `${turn}'s Turn`;
  const label = player ? relativeName : absoluteName;
  return (
    <Box>
      <Typography variant="h4" className={classes[turn]}>
        {label}
      </Typography>
    </Box>
  );
}

export default GameTurn;
