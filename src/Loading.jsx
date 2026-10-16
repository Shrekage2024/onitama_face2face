import { Box, Typography } from '@mui/material';

function Loading({ message = 'Loading ...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4">{message}</Typography>
    </Box>
  );
}
export default Loading;
