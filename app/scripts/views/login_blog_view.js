(function(){

  App.Views.LoginView = Parse.View.extend({
    //classNAme???
    events: {
      'submit #login' : 'userLogin'
    },
    initialize: function(){
      this.render();

      $('#whatever').html(this.$el);

    },

    render: function(){
      this.$el.html($('#loginTemp').html());
    },

    userLogin: function(e) {
      e.preventDefault();

      var username = $('#username').val();
      var password = $('#password').val();


      Parse.User.logIn(username, password, {
        success: function (user) {
          App.user = user;
          App.router.navigate('', {trigger: true});
        }
      });
    }

  });
}());
