//= require list/namespace

List.View.Search = Backbone.View.extend({
   events: {
       "keydown #search_field_name":    "search",
       "change  #search_field_type":    "search"
   },
   
   search: _.debounce(function() {
       var  query    = escape(this.$("#search_field_name").val()),
            within   = this.$("#search_field_type").val(),
            route    = [ "query", query, "within", within ].join("/");
            
        Backbone.history.navigate(route, { trigger: true });
   }, 500) 
});