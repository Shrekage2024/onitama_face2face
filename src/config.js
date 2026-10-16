const protocolTranslate = {
  'http:': 'ws',
  'https:': 'wss',
};
const websocketProtocol = protocolTranslate[document.location.protocol];
export const PRODUCTION_WEBSOCKET_BASE = `${websocketProtocol}://${document.location.host}/ws/`;

export const WEBSOCKET_BASE = import.meta.env.DEV
  ? 'ws://localhost:8080/ws/'
  : PRODUCTION_WEBSOCKET_BASE;
export const EVENT_URL = import.meta.env.DEV ? 'http://localhost:8080/ws/event' : '/ws/event';
