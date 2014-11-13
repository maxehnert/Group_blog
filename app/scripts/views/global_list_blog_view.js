(function(){

  App.Views.GlobalListPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'addPosts',

    events: {},

    template : _.template($('#globalListTemp').html()),

    initialize: function(options){
      this.options = options;

      this.render();

      this.collection.off();
      this.collection.on('sync', this.render, this);
      this.collection = _.filter(this.collection, function(p) {
          return p.attributes.draft === true;
      })

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
