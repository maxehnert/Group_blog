(function(){
  App.Routers.AppRouter = Parse.Router.extend({

    routes: {
      '' : 'home',
      "edit/:postID" : 'editPost',
      'add' : 'addPost',
      'login' : 'userLogin',
      'signUp' : 'userSignUp',
      'content/:postID' : 'fullPost'
    //  '' : 'land'


    },
    initialize: function () {
      Parse.history.start();

    },
    // land: function(){
    //   new App.Views.Landing();
    // },
    home: function(){
      new App.Views.ListPosts({collection: App.posts});
    },
    editPost: function(postId){
      var p = App.posts.get(postId)
      new App.Views.UpdatePost({ post: p});
    },
    addPost: function(){
      new App.Views.AddPost();
    },
    userLogin: function(){
      new App.Views.LoginView();
    },
    userSignUp: function(){
      new App.Views.SignUpView();
    },
    fullPost: function(){
      new App.Views.FullContentView();
    }
  });

}());
