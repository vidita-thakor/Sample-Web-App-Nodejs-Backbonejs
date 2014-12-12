// Backbone Post View
window.AddPostView = Backbone.View.extend({

    // Initialize
    initialize:function () {
        this.render();
    },

    // Render the template
    render: function () {
        
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    // Execute the Events
    events: {

    	"change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deletePost",
    },

    // Callback function for the Change event
    change: function (event) {

        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    // Check for any error before saving to the database
    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.savePost();
        return false;
    },

    // Save the Post Model in the database
    savePost: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                self.render();
                //app.navigate('posts/' + model.id, false);
                utils.showAlert('Success!', 'Post saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    // Delete the Post Model in the database
    deletePost: function () {
        this.model.destroy({
            success: function () {
                alert('Post deleted successfully');
                window.history.back();
            }
        });
        return false;
    }

});