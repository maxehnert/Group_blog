(function(){
App.Views.FullContentView = Parse.View.extend({

 tagNamme: 'ul',
 className: 'fullPost',
 events:{},
 template : _.template($('#singlePostTemp').html()),

  initialize: function(options){
    this.options = options;
console.log('init test',  App.user.attributes.username);
this.username =  App.user.attributes.username;
    this.post = this.options.post;

    this.render();
//console.log('init test', this.options.username);
    $('#blogList').html(this.$el);
  },
  render: function(){
    console.log(this.post, 'test', this.username);
    this.$el.html(this.template(this.post.toJSON()));
  }

});
}());
