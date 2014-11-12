(function(){
  App.Routers.AppRouter = Parse.Router.extend({

    routes: {
      '' : 'home',
      "edit/:postID" : 'editPost',
      'add' : 'addPost',
      'login' : 'userLogin',
      'signUp' : 'userSignUp',
      'content/:postID' : 'fullPost',
      'globalPosts' : 'globalPosts',
      'myPosts' : 'myPosts'
    //  '' : 'land'


    },
    initialize: function () {
      Parse.history.start();

    },
    // land: function(){
    //   new App.Views.Landing();
    // },
    home: function(){

    },
    myPosts: function(){
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
    fullPost: function(postId){
      var p = App.posts.get(postId)
      console.log(p);
      new App.Views.FullContentView({ post: p});
    },
    globalPosts: function(){
      new App.Views.GlobalListPosts({collection: App.posts});
    }

  });

}());
