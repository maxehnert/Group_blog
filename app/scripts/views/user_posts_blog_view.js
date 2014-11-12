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
      this.collection.on('sync', this.postQuery, this);

      $('#blogList').html(this.$el);

      this.postQuery();
    },
    postQuery: function(){

      var self = this;

      // Query Parse for specific coffee per user
      var user_post = new Parse.Query(App.Models.Post);
      user_post.equalTo('user', App.user);
      user_post.find({
        success: function (results) {
          var new_coll = ? // How do we get a collection here, not an array?
          self.collection = new_coll;
          self.render();
        }
      });
    },
    render: function(){
      var self = this;
      this.$el.empty();

     this.collection.each(function(p){
        console.log(p);
        self.$el.append(self.template(p.toJSON()));
      });

      //add sorting if/elses here

      return this;

    }


  });
}());
