Parse.initialize("j5VJ8EgUlacmXfvF2aTs1tKuOSaJxUSvfxQJPBwv", "VRCaCvLyFFfzIStyvs6WuABpaSHIR7S2gTwBWFdF");

(function(){


  //add Parse.User.current
  App.posts = new App.Collections.Posts();

  App.posts.fetch().done( function(){
    App.router = new App.Routers.AppRouter();
      //Parse.history.start();


  });

<<<<<<< HEAD

  $('#logOut').on('click', function (e){
    e.preventDefault();
    Parse.User.logOut();
    App.router.navigate('', {trigger: true});
  });
=======
$('#log-out-btn').on('click', function(e){
e.preventDefault();
Parse.User.logOut();
App.updateUser();
console.log('we logged out');
App.router.navigate('', {trigger: true});
});

// Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      $('#logOut').text('Log In');
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
      $('#logOut').text('Log Out');
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();

>>>>>>> 5882e3fd88d128e0ffe88fb22de437ba7cd82035



}());
