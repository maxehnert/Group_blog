(function(){
  App.Views.AddPost = Parse.View.extend({

    events: {
      'click #publishPost' : 'addPublic',
      'click #addDraft' : 'addDraft'

    },
    initialize: function(){
      this.render();


      $('#blogList').html(this.$el);
    },
    render: function(){
      this.$el.html($('#addTemp').html());
      $('#cat').empty();

    },
    // addPost: function(e){
    //   e.preventDefault();
    //
    //   var p = new App.Models.Post({
    //     title: $('#postTitle').val(),
    //     content: $('#postContent').val(),
    //     category: $('#postCategory').val(),
    //     user: App.user,
    //     draft: false
    //
    //   });
    //
    //   // p.setACL(new Parse.ACL(App.user));
    //   var postACL = new Parse.ACL(Parse.User.current());
    //
    //   postACL.setPublicReadAccess(true);
    //
    //   p.setACL(postACL);
    //   p.save(null, {
    //     success: function(){
    //       App.posts.add(p);
    //       App.router.navigate('globalPosts', {trigger: true });
    //     }
    //   });
    // },

    addPost: function(draft) {

      var p = new App.Models.Post({
        title: $('#postTitle').val(),
        content: $('#postContent').val(),
        category: $('#postCategory').val(),
        image: $('#postImage').val(),
        user: App.user,
        author: App.user.attributes.username,
        authorid: App.user.id,
        draft: draft
        //time: moment().format('YYYY [escaped] YYYY')

      });

      // p.setACL(new Parse.ACL(App.user));
      var postACL = new Parse.ACL(Parse.User.current());

      postACL.setPublicReadAccess(!draft);

      p.setACL(postACL);

      p.save(null, {
        success: function(){
          App.posts.add(p);
          App.router.navigate('myPosts', {trigger: true });
        }
      });

    },
    addDraft: function(e) {
      e.preventDefault();
      this.addPost(true);
    },

    addPublic: function(e) {
      e.preventDefault();
      this.addPost(false);
    }

    // addDraft: function(e){
    //   e.preventDefault();
    //
    //   var p = new App.Models.Post({
    //     title: $('#postTitle').val(),
    //     content: $('#postContent').val(),
    //     category: $('#postCategory').val(),
    //     user: App.user,
    //     draft: true
    //
    //   });
    //
    //   // p.setACL(new Parse.ACL(App.user));
    //   var postACL = new Parse.ACL(Parse.User.current());
    //
    //   postACL.setPublicReadAccess(false);
    //
    //   p.setACL(postACL);
    //
    //   p.save(null, {
    //     success: function(){
    //       App.posts.add(p);
    //       App.router.navigate('myPosts', {trigger: true });
    //     }
    //   });
    // }

  });

}());
