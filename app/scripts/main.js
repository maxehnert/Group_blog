Parse.initialize("j5VJ8EgUlacmXfvF2aTs1tKuOSaJxUSvfxQJPBwv", "VRCaCvLyFFfzIStyvs6WuABpaSHIR7S2gTwBWFdF");

(function(){


  //add Parse.User.current
  App.posts = new App.Collections.Posts();

  App.posts.fetch().done( function(){
    App.router = new App.Routers.AppRouter();
      //Parse.history.start();


  });

$('#log-out-btn').on('click', function(e){
e.preventDefault();
Parse.User.logOut();
console.log('we logged out');
App.router.navigate('', {trigger: true});
});

}());
