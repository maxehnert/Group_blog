(function(){

  App.Views.GlobalListPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'addPosts',

    events: {},

    template : _.template($('#globalListTemp').html()),

    initialize: function(options){
      this.options = options;

      this.collection.off();
      this.collection.on('sync', this.render, this);

      this.render();
      $('#blogList').html(this.$el);

    },
    render: function(){
      var self = this;

      this.$el.empty();

      this.collection.each(function(p){
        if (p.attributes.draft === false) {
          self.$el.append(self.template(p.toJSON()));
        }
      });

      //add sorting if/elses here

      return this;

    }


  });
}());
