//= require list/namespace

List.Router.Base = Backbone.Router.extend({
    routes: {
        "":                                         "index",
        "page/:page":                               "_page",
        "query/*query/within/*within":              "_search",
        "page/:page/query/*query/within/*within":   "_searchWithPage"
    },
    
    currentParams: {},
    
    initialize: function() {
        this.initializeView();
    },
    
    initializeView: function() {
        this._raiseUnimplementedError();
    },
    
    index: function(parameters) {
        this._raiseUnimplementedError();
    },
    
    _raiseUnimplementedError: function() {
        throw "method not implemented";
    },
    
    _search: function(query, within) {
        this._searchWithPage(1, query, within);
    },
    
    _searchWithPage: function(page, query, within) {
        this.index({ 
            query:  query, 
            within: within, 
            page:   page || 1 });
    },
    
    _page: function(page) {
        this.index({ page: page || 1 });
    }
});