//= require loader/namespace

Loader.Util.CountingLatch = function(initialCount) {
    this.count = initialCount || 0;
}

_.extend(Loader.Util.CountingLatch.prototype, Backbone.Events, {
    countUp: function() {
        this.count++;
        this._check();
    },
    
    countDown: function() {
        // ensure the count never goes below zero.
        this.count = Math.max(0, this.count - 1);
        this._check();
    },
    
    _check: function() {
        if(this.count) {
            this.trigger("latch:counting");
        } else {
            this.trigger("latch:complete");
        }
    }
});