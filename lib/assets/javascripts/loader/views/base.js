//= require jquery.spin
//= require loader/namespace
//= require loader/utils/counting_latch

Loader.View.Base = {
    CONFIG: {
        lines:      12,
        length:     3,
        width:      4,
        radius:     15,
        trail:      34,
        speed:      1.3,
        shadow:     true,
        hwaccel:    true,
        color:      "#FFF"
    },
    
    initialize: _.once(function() {
        _.bindAll(this, "show", "hide");
        
        this.latch = new Loader.Util.CountingLatch();
        this.latch.on("latch:counting", this._showLoaders, this);
        this.latch.on("latch:complete", this._hideLoaders, this);
    }),
    
    show: function() {
        this.latch.countUp();
    },
    
    hide: function() {
        this.latch.countDown();
    },
    
    _showLoaders: function() {
        $("#loading-indicator").fadeIn(50).spin(this.CONFIG);
    },
    
    _hideLoaders: function() {
        $("#loading-indicator").fadeOut(50).spin(false);
    }
};