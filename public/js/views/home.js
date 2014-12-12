// Backbone Home View
window.HomeView = Backbone.View.extend({

    // Initialize
    initialize:function () {
        this.render();
    },

    // Render the template
    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});