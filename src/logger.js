const noop = () => {};

const fakeLogger = Object.fromEntries(Object.keys(console).map((name) => [name, noop]));

const logger = import.meta.env.PROD ? fakeLogger : console;

export default logger;
