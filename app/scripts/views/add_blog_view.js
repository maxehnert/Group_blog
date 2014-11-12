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

      // p.setACL(new Parse.ACL(App.user));
      var postACL = new Parse.ACL(Parse.User.current());

      postACL.setPublicReadAccess(true);

      p.setACL(postACL);

      p.save(null, {
        success: function(){
          App.posts.add(p);
          App.router.navigate('globalPosts', {trigger: true });
        }
      });
    }

  });

}());
