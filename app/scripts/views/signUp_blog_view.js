(function(){

  App.Views.SignUpView = Parse.View.extend({

    events: {
      //'click .js-btn' : 'addUser'
      'submit #signUp' : 'addUser'
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
          App.router.navigate('myPosts', {trigger: true});
          $('#signUpField').hide();
        }
        // error: function(user, error) {
        // //   // Show the error message somewhere and let the user try again.
        //    alert("Error: " + error.code + " " + error.message);
        //  }
      });
      $('.modal').empty();
    }
  });
}());
