module.exports = {
    mongoURI: "YOUR_MONGOURI_HERE" 
    _secretOrKey: "secret",
    get secretOrKey() {
        return this._secretOrKey;
    },
    set secretOrKey(value) {
        this._secretOrKey = value;
    },
  };