(function(){

  App.Views.SignUpView = Parse.View.extend({

    events: {
      'click .js-btn' : 'addUser'
    },
    initialize: function(){
      this.render();

      $('#signUpField').html(this.$el);
    },

    render: function(){
      this.$el.html($('#SignUpTemp').html());
    },

    addUser: function(e){
      e.preventDefault();
      var user = new Parse.User({
      username: $('#signUpUser').val(),
      password: $('#signUpPassword').val()

      });
      user.signUp(null, {
        success: function(user) {
          alert('you worked!');
          App.router.navigate('myPosts', {trigger: true});
        }
        // error: function(user, error) {
        // //   // Show the error message somewhere and let the user try again.
        //    alert("Error: " + error.code + " " + error.message);
        //  }
      });
    }
  });
}());
