(function(){

  App.Views.UserPosts = Parse.View.extend({

    tagName: 'ul',


    events: {},

    template : _.template($('#userTemp').html()),

    initialize: function(options){
      this.options = options;
    //  console.log(this.options.user);
      this.render();

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);
      $('#cat').empty();
      $('#blogList').html(this.$el);

      this.postQuery();
    },
    postQuery: function(){

      var self = this;

      // Query Parse for specific post per user
      var user_post = new Parse.Query(App.Models.Post);
      user_post.equalTo('authorid', this.options.userid);
      user_post.descending("updatedAt");
      //App.user.updatedAt.moment().format("MMM Do YY");
      user_post.find({
        success: function (results) {
        //  var new_coll = ? // How do we get a collection here, not an array?

      //  console.log(results);
        self.$el.empty();
        _.each(results, function(p){

          var html = self.template(p.toJSON());
          self.$el.append(html);


        });
      },
      error: function (e, msg) {
       console.log("errors were had: " + msg);
      }
      });
    },
    render: function(){
      var self = this;
      this.$el.empty();

    //  this.collection.each(function(p){
    //     //console.log(p);
    //     self.$el.append(self.template(p.toJSON()));
    //   });

      //add sorting if/elses here

      return this;

    }


  });
}());
