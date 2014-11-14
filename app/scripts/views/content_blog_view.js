(function(){
App.Views.FullContentView = Parse.View.extend({

 tagNamme: 'ul',
 className: 'fullPost',
 events:{
   //'submit #newComment' : 'addComment'
 },
 template : _.template($('#singlePostTemp').html()),

  initialize: function(options){
    this.options = options;
    this.post = this.options.post;

    this.render();
    $('#blogList').html(this.$el);
  },
  render: function(){
    this.$el.html(this.template(this.post.toJSON()));
  },
  // addComment: function(e){
  //   e.preventDefault();
  //
  //   var comment = new App.Models.Comment({
  //
  //     commentText: $('#commentBox').val(),
  //     parent: this.options.post
  //
  //   });
  //
  //   comment.save(null, {
  //     success: function () {
  //       console.log('Comment has been added');
  //       App.router.navigate('globalPosts', {trigger: true});
  //     }
  //   });
  // }

});
}());
