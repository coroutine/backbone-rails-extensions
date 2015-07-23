//= require list/namespace

List.View.CollectionView = Backbone.View.extend({
	setCollection: function(collection) {
		if(collection !== this.collection) {
			if(this.collection) {
				this.collection.off("add remove reset", this.render, this);
				this.collection.off("error", this.renderError, this);
			}

			this.collection = collection;
			if(this.collection) {
				this.collection.on("add remove reset", this.render, this);
				this.collection.on("error", this.renderError, this);
				this.render();
			}
		}
	},

	render: function() {
	  throw "method not implemented";
	},

	renderError: function(data, response) {
		alert("An error occurred while fetching the records from the server.");
	}
});
