import { useCallback, useRef } from 'react';
import { Link } from 'react-router';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  dialog: {
    padding: theme.spacing(8, 8, 8, 8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  invite: {
    fontSize: '12px',
  },
}));
const titleFromStatus = {
  Waiting: 'Waiting for Opponent',
  OpponentDisconnected: 'Opponent disconnected, waiting for them to re-connect',
  Disconnected: 'Disconnected from server',
  Errored: 'Game Error',
};
function WaitingOverlay({ state: { connection, roomId, error }, reconnect }) {
  const { classes } = useStyles();
  const ref = useRef();
  const title = titleFromStatus[connection] || connection;
  const isWaiting = connection === 'Waiting';
  const isConnecting = connection === 'Connecting';
  const isOpponentDisconnected = connection === 'OpponentDisconnected';
  const isDisconnected = connection === 'Disconnected';
  const isErrored = connection === 'Errored';
  const open = isWaiting || isConnecting || isDisconnected || isOpponentDisconnected || isErrored;
  const showReconnect = isDisconnected || isErrored;
  const copyLink = useCallback(() => {
    ref.current.select();
    ref.current.setSelectionRange(0, 9999);
    document.execCommand('copy');
  }, []);
  return (
    <Dialog open={open} classes={{ paper: classes.dialog }} transitionDuration={0}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={classes.content}>
        {!isConnecting && !showReconnect && roomId && (
          <>
            <Box
              sx={{
                minWidth: '280px',
              }}
            >
              <Typography variant="subtitle1">Invite Link</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <TextField
                  inputRef={ref}
                  className={classes.invite}
                  value={`${window.location.origin}/#/r/${roomId}`}
                  spellCheck={false}
                  variant="outlined"
                />
                <Box
                  sx={{
                    m: 0.5,
                  }}
                />
                <Button variant="contained" color="primary" size="small" onClick={copyLink}>
                  Copy
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                pt: 2,
              }}
            >
              <Typography variant="h5">or</Typography>
            </Box>
          </>
        )}
        {error && <Typography variant="body1">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" component={Link} to="/">
          Go Home
        </Button>
        {showReconnect && (
          <Button variant="contained" color="primary" onClick={reconnect}>
            Reconnect
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default WaitingOverlay;
