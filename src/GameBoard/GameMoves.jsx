import { memo } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import * as R from 'ramda';

const useStyles = makeStyles()((theme, { inverted }) => ({
  origin: {
    backgroundColor: theme.palette.primary.light,
  },
  moveCell: {
    width: '16px',
    height: '16px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.grey['600'],
  },
  directionBalanced: {
    backgroundColor: theme.palette.direction.balanced,
  },
  directionLeft: {
    backgroundColor: theme.palette.direction.left,
  },
  directionRight: {
    backgroundColor: theme.palette.direction.right,
  },
  grid: {
    display: 'flex',
    flexDirection: inverted ? 'column-reverse' : 'column',
  },
  row: {
    display: 'flex',
    flexDirection: inverted ? 'row-reverse' : 'row',
  },
}));

function GameMoves({ moves, inverted, direction }) {
  const { classes, cx } = useStyles({ inverted });
  const moveSet = new Set(moves.map(({ x, y }) => `${x},${y}`));
  const indexes = [-2, -1, 0, 1, 2];
  return (
    <Box className={classes.grid}>
      {indexes.map((y) => (
        <Box className={classes.row} key={y}>
          {indexes.map((x) => {
            const keyed = `${x},${y}`;
            const accessible = moveSet.has(keyed);
            return (
              <Box
                key={keyed}
                className={cx({
                  [classes.moveCell]: true,
                  [classes.origin]: x === 0 && y === 0,
                  [classes.directionBalanced]: accessible && direction === 'Balanced',
                  [classes.directionLeft]: accessible && direction === 'Left',
                  [classes.directionRight]: accessible && direction === 'Right',
                })}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
export default memo(GameMoves, R.equals);
