(function(){
App.Views.Landing = Parse.View.extend({

  tagName: 'modal',
  className: 'landing',
  events: {},

  template: _.template($('#modalTemp').html()),

  initialize: function(){
    this.render();

    $('#loginModal').html(this.$el);
    $(window).on('load',function(){
        $('.modal').show();
    });
  },
  render: function(){
    //this.$el.html($('#modalTemp').html());
      var self = this;
      this.$el.empty();



  }
});
}());
