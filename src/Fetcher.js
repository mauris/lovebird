let client = require('./Twitter');
let Promise = require('bluebird');

module.exports = {
  stream: (track) => {
    if (!track) {
      throw new Error('track argument is invalid.');
    }
    let stream = client.stream('statuses/filter', {track: track.join(',')});
    return stream;
  }
}
