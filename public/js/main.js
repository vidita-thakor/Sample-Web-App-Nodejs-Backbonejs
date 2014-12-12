// Backbone Router
var AppRouter = Backbone.Router.extend({

    // Defining all application routes
    routes: {
        ""                  : "home",
        "about"             : "about",
        "blog"              : "list",
        "blog/page/:page"   : "list",
        "addpost"           : "addpost",
        "post/:id"          : "postDetails",
    },

    // Initialize the landing page
    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    // Setting up for Home View
    home: function () {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    // Setting up for About View
    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

    // Setting up for the Blog List View
    list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var blogList = new PostCollection();
        blogList.fetch({success: function(){
            $("#content").html(new BlogListView({model: blogList, page: p}).el);
        }});
        this.headerView.selectMenuItem('blog-menu');
    },

    // Setting up for the Add Post View
    addpost: function () {
        var post = new Post();
        $('#content').html(new AddPostView({model: post}).el);
        this.headerView.selectMenuItem('blog-menu');
    },

    // Setting up for the viewing the Post Details
    postDetails: function (id) {
        var post = new Post({_id: id});
        post.fetch({success: function(){
            $("#content").html(new AddPostView({model: post}).el);
        }});
        this.headerView.selectMenuItem('blog-menu');
    },

});

// Loading all the Views
utils.loadTemplate(['HomeView', 'HeaderView', 'AboutView', 'BlogListItemView', 'AddPostView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});