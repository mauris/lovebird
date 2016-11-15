let Fetcher = require('./Fetcher');
let Promise = require('bluebird');
let Queue = require('./RatedExecutionQueue');
let client = require('./Twitter');

let queue = new Queue();
let stream = Fetcher.stream(["#compsci", "#tech", "#nus"]);

stream.on('data', (event) => {
  if (event.user.followers_count < 1000 || event.user.statuses_count < 10000 || event.text.indexOf("RT ") > -1 || event.text.length < 40) {
    return;
  }
  //console.log("Queueing " + event.id_str);
  console.log("@" + event.user.screen_name + ":\n" + event.text);
  console.log('----[length: '+queue.length+']-----------------------------');

  queue.push(() => {
    return new Promise((resolve, reject) => {
      client.post('favorites/create', {id: event.id_str, include_entities: false}, (error, tweet, response) => {
        if (error) {
          return reject(new Error(JSON.stringify(error)));
        }
        //console.log(tweet.id_str + " was liked.");
        resolve(4000);
      })
    });
  });
});


stream.on('error', (err) => {
  console.error(err);
});
