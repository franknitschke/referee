const { v4: uuidv4 } = require('uuid');

class DefaultRefValue {
  constructor() {
    this.reset();
  }
  reset() {
    this.main = {
      submit: false,
      valid: false,
      timestamp: null,
      white: false,
      red: false,
      yellow: false,
      blue: false,
    };
    this.left = {
      submit: false,
      valid: false,
      timestamp: null,
      white: false,
      red: false,
      yellow: false,
      blue: false,
    };
    this.right = {
      submit: false,
      valid: false,
      timestamp: null,
      white: false,
      red: false,
      yellow: false,
      blue: false,
    };
    this.timer = 60;
    this.timerRef = null;
    this.resetTimerRef = null;
  }

  clearResetTimer = () => {
    clearTimeout(this.resetTimerRef);
  };
  startTimer = () => {
    this.timer--;
    console.log('Timer: ', this.timer);
    if (this.timer === 0) this.clearTimer();
  };

  clearTimer = () => {
    clearInterval(this.timerRef);
    this.timerRef = null;
  };
  set white(position) {
    this[position].submit = true;
    this[position].valid = true;
    this[position].white = true;
    this[position].red = false;
    this[position].yellow = false;
    this[position].blue = false;
    this[position].timestamp = new Date().getTime();
  }
  set red(position) {
    this[position].submit = true;
    this[position].valid = false;
    this[position].white = false;
    this[position].red = true;
    this[position].timestamp = new Date().getTime();
  }
  set blue(position) {
    this[position].submit = true;
    this[position].valid = false;
    this[position].white = false;
    this[position].blue = true;
    this[position].timestamp = new Date().getTime();
  }
  set yellow(position) {
    this[position].submit = true;
    this[position].valid = false;
    this[position].white = false;
    this[position].yellow = true;
    this[position].timestamp = new Date().getTime();
  }
  get lock() {
    return this.main.submit && this.left.submit && this.right.submit;
  }
}

const refValue = new DefaultRefValue();

//map for socket user
const users = new Map();

//jwt secret
const jwtSecret = uuidv4();

module.exports = { refValue, users, jwtSecret };
