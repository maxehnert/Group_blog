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
//     render: function(){
//       var self = this;
//
//       this.$el.empty();
//
//       this.collection.each(function(p){
//         if (p.attributes.draft === false) {
//           self.$el.append(self.template(p.toJSON()));
//         }
//       });
//
//       //add sorting if/elses here
//
//       return this;
//
//     }
//
//
//   });
// }());


render: function () {
      var self = this;

      // Empty out
      this.$el.empty();

      // Sorting On The Fly
      if (this.options.sort != undefined) {
        // Setting up a localized collection to sort by our sort param
      //var local_collection =
        this.collection.sortBy( function (model){
          return model.get(self.options.sort);
        });
        ///new
        this.collection.each(function(p){
          if (p.attributes.draft === false) {
            self.$el.append(self.template(p.toJSON()));
          }
          ///////old
        // _.each(local_collection, function (c) {
        //   self.$el.append(self.template(c.toJSON()));
        });
      }
      else {
        // Sort from our default comparator in our collection constructor
        this.collection.sort();
        this.collection.each(function(p){
          self.$el.append(self.template(p.toJSON()));
        });
      }

}
});
}());
