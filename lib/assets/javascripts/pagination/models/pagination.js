//= require pagination/namespace

Pagination.Model.Pagination = Backbone.Model.extend({
    defaults: {
        "totalCount":   0,
        "pageCount":    0,
        "numPages":     0,
        "currentPage":  1,
        "offsetValue":  0,
        "maxPageLinks": 10
    },
    
    validate: function(attrs) {
        var nonNumericAttrs = _(attrs).reduce(function(m, v, k) {  
            if(!_(v).isNumber()) {
                m.push("'" + k + "' must be a real number.");
            }
            return m;
        }, []);
        
        if(nonNumericAttrs.length) {
            return nonNumericAttrs.join("\n");
        }
    },
    
    increment: function(field) {
        var incremented = this.get(field) + 1,
            args        = {};
            
        args[field]     = incremented;
        this.set(args);
    },
    
    decrement: function(field) {
        var decremented = Math.max(0, this.get(field) - 1),
            args        = {};
            
        args[field]     = decremented;    
        this.set(args);
    },
    
    isFirstPage: function() {
        return this.get("currentPage") == 1;
    },
    
    isLastPage: function() {
        return this.get("currentPage") >= this.get("numPages");
    },
    
    nextPage: function() {
        return this.get("currentPage") + 1;
    },
    
    prevPage: function() {
        return Math.max(1, this.get("currentPage") - 1);
    }
});