(function(){

  App.Views.ListPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'addPosts',

    events: {},

    template : _.template($('#listTemp').html()),

    initialize: function(options){
      this.options = options;

      this.render();

      this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#blogList').html(this.$el);

    },
    render: function(){
      var self = this;

      this.$el.empty();

      this.collection.each(function(p){
        self.$el.append(self.template(p.toJSON()));
      });

      //add sorting if/elses here

      return this;

    }


  });
}());
