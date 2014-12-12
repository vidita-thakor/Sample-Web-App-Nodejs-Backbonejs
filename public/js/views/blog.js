// Setting up the Blog List
// Backbone Blog View
window.BlogListView = Backbone.View.extend({

    // Initialize
    initialize: function () {
        this.render();
    },

    // Render the template
    render: function () {
        var posts = this.model.models;
        var len = posts.length;
        var startPos = (this.options.page - 1) * 6;
        var endPos = Math.min(startPos + 6, len);

        $(this.el).html('<div class="row-fluid"><div class="span12"><h4>Blog</h4><div style="float:right"><a href="#addpost" class="btn btn-primary save">Add Post</a></div><br clear="both"/><div class="thumbnails"></div><p></p></div></div>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new BlogListItemView({model: posts[i]}).render().el);
        }

        // Render the Paginator
        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

// Rending the Single Post Model View
window.BlogListItemView = Backbone.View.extend({

    tagName: "article",
    className: "post-box",

    // Initialize
    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    // Render the template
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});