// Creating the Post Model
window.Post = Backbone.Model.extend({

    urlRoot: "/posts",

    idAttribute: "_id",

    // Setting up the initialization and Validation
    initialize: function () {
        this.validators = {};

        this.validators.postTitle = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a title"};
        };

        this.validators.postDescription = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a description"};
        };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        postTitle: "",
        postDescription: "",
    }
});

// Creating the Post Collection
window.PostCollection = Backbone.Collection.extend({

    model: Post,

    url: "/posts"

});