(function(){
App.Views.FullContentView = Parse.View.extend({

 tagNamme: 'ul',
 className: 'fullPost',
 events:{},
 //template : _.template($('#singlePostTemp').html()),

  initialize: function(options){
    this.options = options;
    this.render();

    $('#blogList').html(this.$el);
  },
  render: function(){

this.$el.html($('#singlePostTemp').html());

  }


});
}());
