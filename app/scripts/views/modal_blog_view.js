(function(){
App.Views.Landing = Parse.View.extend({

//  tagName: 'modal',
//  className: 'landing',
  events: {},

//  template: _.template($('#modalTemp').html()),

  initialize: function(){
    this.render();

    $('#loginModal').html(this.$el);

   //this.$el.html(this.template);

    $(window).on('load',function(){
        //$('.body-container').hide();
        $('.modalTemp').show();
    });
  },
  render: function(){
    this.$el.html($('#modalTemp').html());
      //var self = this;
      //this.$el.empty();



  }
});
}());
