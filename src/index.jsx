import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { HashRouter, Route, Routes } from 'react-router';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from './theme';
import Loading from './Loading';
import Home from './Home';
import AiSelect from './AiSelect';
import TrainingSelect from './TrainingSelect';
import { UpdateManager } from './updateManager';

const LocalGame = lazy(() => import('./LocalGame'));
const RemoteGame = lazy(() => import('./RemoteGame'));
const SinglePlayerGame = lazy(() => import('./SinglePlayerGame'));
const TrainingGame = lazy(() => import('./TrainingGame'));
const Rules = lazy(() => import('./Rules'));
const Settings = lazy(() => import('./Settings'));

const localAi = Boolean(import.meta.env.VITE_LOCAL_AI);

const root = createRoot(document.querySelector('#root'));
root.render(
  <UpdateManager>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <CssBaseline />
        <SnackbarProvider maxSnack={2}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/l" element={<LocalGame />} />
              <Route path="/f" element={<LocalGame faceToFace />} />
              <Route path="/help" element={<Rules />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/r/:roomId?" element={<RemoteGame />} />
              {localAi ? (
                <Route path="/ai/:difficulty" element={<SinglePlayerGame />} />
              ) : (
                <Route path="/ai/:roomId" element={<RemoteGame isAi />} />
              )}
              <Route path="/ai" element={<AiSelect />} />
              {localAi && <Route path="/t/:difficulty" element={<TrainingGame />} />}
              {localAi && <Route path="/t" element={<TrainingSelect />} />}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </SnackbarProvider>
      </HashRouter>
    </ThemeProvider>
  </UpdateManager>,
);
