(function(){
  App.Views.UpdatePost = Parse.View.extend({

    tagName: 'ul',
    className: 'updatePost',

    events: {
      'submit #updatePost' : 'updatePost',
      'click #delete' : 'deletePost'
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
    updatePost: function(e){
      e.preventDefault();

      this.options.post.set({
        title: $('#updateTitle').val(),
        content: $('#updateContent').val(),
        category: $('#updateCategory').val()

      });

      this.options.post.save();

      App.router.navigate('myPosts', {trigger:true});
    },

    deletePost: function(e){
      e.preventDefault();
console.log('test');
      this.options.post.destroy();

      App.router.navigate('myPosts', {trigger: true});
    }

  });

}());
