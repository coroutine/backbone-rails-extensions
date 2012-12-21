//= require list/namespace
//= require list/views/collection_view

List.View.SimpleCollectionView = List.View.CollectionView.extend({
	
	//-----------------------------------------------------
    // initialization
	//-----------------------------------------------------
	
    initialize: function() {
		this.beforeInitialize();
		
		if(!this.getItemClass) {
			throw "The method 'getItemClass' was expected, but was not found. \
					Make sure you've specified this method in your subclasses of \
					List.View.SimpleCollectionView"
		}
		this.itemViews = [];
		
		_.bindAll(this, "render", "_appendItemToView");
		
		this.afterInitialize();
	},
	
	render: function() {
		this._clearItemList();
		if(this.collection) {
			_.each(this.collection.models, this._appendItemToView);
		}
	},
	
	
	//-----------------------------------------------------
    // public methods 
	//-----------------------------------------------------
	
    // callbacks: override if needed
	afterInitialize: function() {},
	beforeInitialize: function() {},
	
	
	//-----------------------------------------------------
    // private methods 
	//-----------------------------------------------------
	
	_appendItemToView: function(item) {
		var itemClass	= this.getItemClass(),
			itemView	= new itemClass({ model: item });
			
		this.itemViews.push(itemView);
		this.$el.append(itemView.el);
	},
	_clearItemList: function() {
		while(this.itemViews.length) { this.itemViews.pop().remove(); }
	}
});