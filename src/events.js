import { EVENT_URL } from './config';

const onEvent = (eventData) => {
  // Static hosting (e.g. GitHub Pages) has no server to receive analytics events
  if (import.meta.env.VITE_STATIC_HOST) {
    return;
  }
  window
    .fetch(EVENT_URL, {
      method: 'POST',
      body: eventData,
      mode: 'no-cors',
    })
    .catch(() => {});
};

export default onEvent;
