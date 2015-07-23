//= require loader/namespace

Loader.customizeBackboneSync = _.once(function() {
    var customSync = function(method, model, options) {
        var success     = options.success,
            error       = options.error,
            showLoader  = _.has(options, "showLoader") ? options.showLoader : true;

        options.success = function() {
            if (success) { success.apply(this, arguments) };
            Loader.View.Base.hide();
        };

        options.error = function() {
            if (error) { error.apply(this, arguments) };
            Loader.View.Base.hide();
        };

        if(showLoader) Loader.View.Base.show();
        Backbone.sync.call(this, method, model, options);
    };

    Backbone.Model.prototype.sync = Backbone.Collection.prototype.sync = customSync;
})
