(function(){
  App.Views.UpdatePost = Parse.View.extend({

    tagName: 'ul',
    className: 'updatePost',

    events: {
      'submit #updatePost' : 'handleClick',
      'click #delete' : 'deletePost',
      'click #publishDraft' : 'publishDraft'
    },

    template : _.template($('#updateTemp').html()),

    initialize: function (options){
      this.options = options;

      this.render();

      $('#blogList').html(this.$el);
    },

    render: function(){

    this.$el.empty();

    this.$el.html(this.template(this.options.post.toJSON()));

    },


    handleClick: function (e) {
      e.preventDefault();
      this.updatePost();
    },

    updatePost: function(draft){
    //  console.log()
      this.options.post.set({
        title: $('#updateTitle').val(),
        content: $('#updateContent').val(),
        category: $('#updateCategory').val(),
        image: $('#UpdatepostImage').val()
      });

      if (draft != undefined) {
        this.options.post.set('draft', draft);
      }

      this.options.post.save();

      App.router.navigate('myPosts', {trigger:true});
    },
    publishDraft: function(draft) {
    //  draft.preventDefault();
      this.publishDraft(true);
      var p = new App.Models.Post({
        title: $('#postTitle').val(),
        content: $('#postContent').val(),
        category: $('#postCategory').val(),
        user: App.user,
        draft: draft

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
    publishDraft: function(e){
      e.preventDefault();
      this.updatePost(false);
    },
    deletePost: function(e){
      e.preventDefault();
      this.options.post.destroy();
      App.router.navigate('myPosts', {trigger: true});
    }
    // updateDraft: function(e) {
    //   e.preventDefault();
    //   this.updatePost(true);
    // },
    //
    // publishDraft: function(e) {
    //   e.preventDefault();
    //   this.updatePost(false);
    // }

  });

}());
