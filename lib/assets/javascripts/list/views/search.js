//= require list/namespace

List.View.Search = Backbone.View.extend({
  events: {
    "keydown #search_field_name":    "_onNameChanged",
    "change  #search_field_type":    "_onTypeChanged"
  },

  // handlers
  _onNameChanged: function(evt) {
    if (evt.keyCode == 13) {    // suppress enter key
      evt.preventDefault();
    }
    this._doSearch();
  },

  _onTypeChanged: function(evt) {
    this._doSearch();
  },

  // actions
  _doSearch: _.debounce(function() {
    var  query    = escape(this.$("#search_field_name").val()),
    within   = this.$("#search_field_type").val(),
    route    = [ "query", query, "within", within ].join("/");

    Backbone.history.navigate(route, { trigger: true });
  }, 500)

});
