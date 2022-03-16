class Measure {
  constructor(value, unit) {
    this.value = value;
    this.unit = unit || 'px';
  }

  toString() {
    return this.value + this.unit;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get unit() {
    return this._unit;
  }

  set unit(unit) {
    this._unit = unit;
  }
}

const pixels = {
  xsmall: new Measure(8),
  small: new Measure(16),
  medium: new Measure(32),
  large: new Measure(64),
  xlarge: new Measure(128),

  page: {
    width: new Measure(990),
    leftCol: new Measure(630),
    rightCol: new Measure(300),
    nav: new Measure(64),
  },

  bp: {
    xsmall: new Measure(320),
    small: new Measure(768),
    medium: new Measure(1024),
    large: new Measure(1440),
  },
};

export default pixels;
