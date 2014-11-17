(function(){

  App.Views.CategorySelect = Parse.View.extend({

    tagName: 'div',

    events: {
      'click .dropdown-button' : 'dropDown',
      'click li' : 'navigate'
    },


initialize: function(options){
      this.options = options;

      //this.collection.off();
    //  this.collection.on('sync', this.render, this);

      this.render();
      $('#cat').html(this.$el);

    },

render: function () {
this.$el.empty();
  this.$el.html($('#sortingTemp').html());
},
dropDown: function(){
  $(".menu").toggleClass("show-menu");
  $(".menu > li").click(function(){
    $(".dropdown-button").html($(this).html());
    $(".menu").removeClass("show-menu");
  });

},
navigate: function(){
  this.collection.sortBy( function (model){
    return model.get(self.options.sort);
  });
}

  });
}());
