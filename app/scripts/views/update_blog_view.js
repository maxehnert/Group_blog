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
        category: $('#updateCategory').val()
      });

      if (draft != undefined) {
        this.options.post.set('draft', draft);
      }

      this.options.post.save();

      App.router.navigate('myPosts', {trigger:true});
    },

    publishDraft: function(e){
      e.preventDefault();
      this.updatePost(false);

    },


    deletePost: function(e){
      e.preventDefault();
console.log('test');
      this.options.post.destroy();

      App.router.navigate('myPosts', {trigger: true});
    }

  });

}());
