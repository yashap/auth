const Level = Object.freeze({
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  OFF: 4,
});

let level;
switch(process.env.LOG_LEVEL) { // eslint-disable-line no-undef
case 'INFO':
  level = Level.INFO;
  break;
case 'WARN':
  level = Level.WARN;
  break;
case 'ERROR':
  level = Level.ERROR;
  break;
default:
  if (process.env.NODE_ENV === 'production') { // eslint-disable-line no-undef
    level = Level.OFF;
  } else {
    level = Level.INFO;
  }
}

class Logger {
  constructor(name) {
    this.name = name;
    this._prefix = this._prefix.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
  }

  _prefix() {
    return `${new Date()} [${this.name}] -`;
  }

  info(...args) {
    if (level <= Level.INFO) {
      console.log(this._prefix(), ...args); // eslint-disable-line no-console
    }
  }

  warn(...args) {
    if (level <= Level.WARN) {
      console.warn(this._prefix(), ...args); // eslint-disable-line no-console
    }
  }

  error(...args) {
    if (level <= Level.ERROR) {
      console.error(this._prefix(), ...args); // eslint-disable-line no-console
    }
  }
}

const getLogger = name => new Logger(name);

export {
  Level,
  getLogger,
};
