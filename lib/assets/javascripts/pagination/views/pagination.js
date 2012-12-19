//= require pagination/namespace
//= require pagination/templates/pagination

Pagination.View.Pagination = Backbone.View.extend({
    tagName:        "div",
    infoTemplate:   _.template("<%= start %> - <%= end %> of <%= total %>"),
    hashPartExpr:   /(page\/\d+)/,
    
    events: {
        "click .prev":              "fetchPreviousPage",
        "click .next":              "fetchNextPage",
        "click .page_numbers a":    "fetchPage"
    },
    
    initialize: function(options) {        
        if(!this.model) {
            throw "No pagination model was specified.";
        }
        
        if(_(options.infoTemplate).isFunction()) {
            this.infoTemplate = options.infoTemplate;
        }
        
        this.model.on("change", function() {
            this.renderInfo();
            this.renderLinks();
        }, this);
        
        this.render();
    },
    
    render: function() {
        this.$el.append(JST["pagination/templates/pagination"]());
        this.renderInfo();
        this.renderLinks();
    },
    
    renderInfo: function() {
        var model       = this.model,
            total       = model.get("totalCount"),
            pageCount   = model.get("pageCount"),
            numPages    = model.get("numPages"),
            currentPage = model.get("currentPage"),
            offsetValue = model.get("offsetValue"),
            info        = this.infoTemplate({ 
                start:  offsetValue + 1,
                end:    pageCount + offsetValue,
                total:  total
            });
                        
        this.$(".pagination_totals").html(info);
    },
    
    renderLinks: function() {
        this.renderPreviousAndNextLinks();
        this.renderPageLinks();
    },
    
    renderPreviousAndNextLinks: function() {
        var isFirstPage = this.model.isFirstPage(),
            isLastPage  = this.model.isLastPage(),
            linkPrev    = this.$(".prev"),
            linkNext    = this.$(".next");
            
        if(isFirstPage) {
            linkPrev.addClass("disabled");
        } else {
            linkPrev.removeClass("disabled");
        }
        
        if(isLastPage) {
            linkNext.addClass("disabled");
        } else {
            linkNext.removeClass("disabled");
        }
    },
    
    renderPageLinks: function() {
        var numPages        = this.model.get("numPages"),
            maxPageLinks    = Math.min(this.model.get("maxPageLinks"), numPages),
            loopLinks       = Math.max(maxPageLinks - 2, 0),
            currentPage     = this.model.get("currentPage"),
            pageNumbers     = this.$(".page_numbers");
        
        // clear the previous page numbers
        pageNumbers.empty();
        
        // Add the first page
        pageNumbers.append(this._createPageLink(1, currentPage));
        
        if(numPages > 1) {
            var maxOffset   = Math.max(currentPage - loopLinks, 0) + maxPageLinks,
                minOffset   = Math.min(maxOffset, numPages) - maxPageLinks;
            
            // if we have an offset value greater than zero, render an ellipsis
            // after the page-1 link.
            if(minOffset) { pageNumbers.append("&hellip;"); }
            
            // render page links between the first and last page.
            _(loopLinks).times(_.bind(function(i) { 
                pageNumbers.append(
                    this._createPageLink(i + 2 + minOffset, currentPage));
            }, this));
            
            // If the tail of our 'in-between' links is not within
            // range of the last page link, such that it creates a
            // natural numeric series upto the last page link, render
            // an ellipsis.
            if(maxOffset < numPages) {
                pageNumbers.append("&hellip;");
            }
            
            // Add the last page
            pageNumbers.append(this._createPageLink(numPages, currentPage));
        }
    },
    
    fetchPreviousPage: function(evt) {
        this._fetchPage(evt, { direction: "prevPage" });
    },
    
    fetchNextPage: function(evt) {
        this._fetchPage(evt, { direction: "nextPage" });
    },
    
    fetchPage: function(evt) {
        var link    = $(evt.currentTarget),
            page    = link.data("page");
            
        this._fetchPage(evt, { page: page });
    },
    
    _createPageLink: function(pageNumber, currentPage) {
        var attrs   = { "href": "#", "data-page": pageNumber };
        
        if(pageNumber == currentPage) {
            attrs["class"] = "disabled";
        }
        return this.make("a", attrs, pageNumber);
    },
    
    _fetchPage: function(evt, options) {
        evt.preventDefault();
        var link    = $(evt.currentTarget),
            enabled = !link.hasClass("disabled");
        
        if(enabled) {
            var pageNum     = options.page ? options.page : this.model[options.direction](),
                fragment    = ["page", pageNum].join("/"),
                route       = this._updateRoute(fragment);
                
            Backbone.history.navigate(route, { trigger: true });
        }
    },
    
    _updateRoute: function(fragment) {
        var hash = location.hash;
        if(hash.match(this.hashPartExpr)) {
            return hash.replace(RegExp.$1, fragment);
        } else {
            return _([fragment, hash.replace("#", "")]).compact().join("/");
        }
    }
});