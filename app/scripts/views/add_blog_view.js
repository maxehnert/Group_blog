(function(){
  App.Views.AddPost = Parse.View.extend({

    events: {
      'submit #addPost' : 'addPost'
    },
    initialize: function(){
      this.render();

      $('#blogList').html(this.$el);
    },
    render: function(){
      this.$el.html($('#addTemp').html());

    },
    addPost: function(e){
      e.preventDefault();

      var p = new App.Models.Post({
        title: $('#postTitle').val(),
        content: $('#postContent').val(),
        category: $('#postCategory').val(),
        user: App.user

      });

      p.setACL(new Parse.ACL(App.user));
      console.log(p);
      p.save(null, {
        success: function(){
          App.posts.add(p);
          App.router.navigate('', {trigger: true });
        }
      });
    }

  });

}());
