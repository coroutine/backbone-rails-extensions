//= require pagination/namespace
//= require pagination/models/pagination

Pagination.Collection.PaginatedCollection = Backbone.Collection.extend({
    pagination: new Pagination.Model.Pagination(),
    
    initialize: function() {
        this.on("destroy", this._decrement, this);
        this.on("add", this._increment, this);
    },
    
    parse: function(response) {
        this.pagination.set(response.pagination);
        return response;
    },
    
    _decrement: function() {
        this.pagination.decrement("totalCount");
    },
    
    _increment: function() {
        this.pagination.increment("totalCount");
    }
});