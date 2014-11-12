(function(){
App.Views.FullContentView = Parse.View.extend({

 tagNamme: 'ul',
 className: 'fullPost',
 events:{},
 template : _.template($('#singlePostTemp').html()),

  initialize: function(options){
    this.options = options;

    this.post = this.options.post;

    this.render();

    $('#blogList').html(this.$el);
  },
  render: function(){
    console.log(this.post);
    this.$el.html(this.template(this.post.toJSON()));
  }


});
}());
