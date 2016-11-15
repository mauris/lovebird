
module.exports = function() {
  this.interval = 0;
  this.queue = [];
  this.timer = null;
  this.length = 0;

  this.push = (item) => {
    if (!item) {
      return;
    }
    this.queue.push(item);
    ++this.length;
    if (this.timer == null) {
      this.process();
    }
  };

  this.process = () => {
    if (this.length === 0) {
      this.timer = null;
      return;
    }
    let item = this.queue.pop();
    --this.length;
    item()
      .then((interval) => {
        this.interval = interval;
        this.timer = setTimeout(this.process, interval);
      })
      .catch((err) => {
        console.error(err);
        this.timer = setTimeout(this.process, this.interval);
      });
  };
}
