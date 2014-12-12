// Backbone Header View
window.HeaderView = Backbone.View.extend({

    // Initialize
    initialize: function () {
        this.render();
    },

    // Render the template
    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    // Navigation menu
    selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});