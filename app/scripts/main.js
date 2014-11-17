Parse.initialize("j5VJ8EgUlacmXfvF2aTs1tKuOSaJxUSvfxQJPBwv", "VRCaCvLyFFfzIStyvs6WuABpaSHIR7S2gTwBWFdF");

(function(){


  //add Parse.User.current
  App.posts = new App.Collections.Posts();

  App.posts.fetch().done( function(){
    App.router = new App.Routers.AppRouter();
      //Parse.history.start();
  });

  $('#logOut').on('click', function (e){
    e.preventDefault();
    Parse.User.logOut();
    App.router.navigate('', {trigger: true});
  });

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
      $('#log-out-btn').remove();
      $('#my-posts-btn').remove();
      $('.addBtn').remove();
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
      $('#logOut').text('Log Out');
      $('.modal').remove();
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();

//Opens the SignUp and Login forms in the modal window when the button is clicked
  $('.modal-window').load( function(e){
    e.preventDefault();
    App.router.navigate('#/login',{trigger: true});
  });
}());
