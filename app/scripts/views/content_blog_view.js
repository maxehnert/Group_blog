(function(){
App.Views.FullContentView = Parse.View.extend({

 tagNamme: 'ul',
 className: 'fullPost',
 events:{
   'submit #addComment' : 'addComment'
 },
 template : _.template($('#singlePostTemp').html()),

  initialize: function(options){
    this.options = options;
    this.post = this.options.post;

    this.render();
    $('#blogList').html(this.$el);
  },
  render: function(){
  this.$el.empty();  this.$el.html(this.template(this.post.toJSON()));

  var commentTemplate = _.template($('#commentTemp').html());
      var comments_query = new Parse.Query(App.Models.Comment);
      comments_query.equalTo('parent', this.options.post);

        this.$el.append('<div class="comment-section"><h2>Comments</h2><ul class="comments"></ul></div>');

   comments_query.find({
        success: function (results) {

          _.each(results, function(comment) {
            $('ul.comments').append(commentTemplate(comment.toJSON()));
          })

       }
     })

  },



  addComment: function (e) {
    e.preventDefault();

    var comment = new App.Models.Comment({

      commentText: $('#commentText').val(),
      parent: this.options.post

    });

    comment.save(null, {
      success: function () {
        console.log('Comment has been added');
        App.router.navigate('', {trigger: true});
      }
    });

  }


});
}());
