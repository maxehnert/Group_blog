(function(){
  App.Models.Post = Parse.Object.extend({

  className: 'Post',

  idAttribute: 'objectId',

  defaults: {
    title: '',
    content: '',
    category: '',
    image:'',
    authorid: '',
    author: ''


  },

  initialize: function (){
    var t = this.get('name');
  }

  });
}());

(function(){
  App.Models.Comment = Parse.Object.extend({

    className: 'Comment',

    defaults: {
      commentText: ''

    }
  });

}());

(function(){
  App.Collections.Posts = Parse.Collection.extend({
    model: App.Models.Post,
    comparator: function (model) {
      return -model.get('category');
    }


  });

}());

(function(){
  App.Routers.AppRouter = Parse.Router.extend({

    routes: {
      '' : 'globalPosts',
      "edit/:postID" : 'editPost',
      'add' : 'addPost',
      'login' : 'userLogin',
      'signUp' : 'userSignUp',
      'content/:postID' : 'fullPost',
      'globalPosts' : 'globalPosts',
      'myPosts' : 'myPosts',
       'author/:authorid' : 'userPosts',
      'sort/:sortby' : 'globalPosts'


    },
    initialize: function () {
      Parse.history.start();

    },
    land: function(){
      new App.Views.Landing();
    },
    userPosts: function(){
    new App.Views.UserPosts({collection: App.posts, user: App.authorid});
    },
    myPosts: function(){
      new App.Views.ListPosts({collection: App.posts, user: App.user});

    },
    editPost: function(postId){
      var p = App.posts.get(postId)
      new App.Views.UpdatePost({ post: p});
    },
    addPost: function(){
      new App.Views.AddPost();
    },
    userLogin: function(){
      new App.Views.LoginView();

    },
    userSignUp: function(){
      new App.Views.SignUpView();
    },
    fullPost: function(postId){
      var p = App.posts.get(postId);
      console.log(p);


      new App.Views.FullContentView({ post: p});
    },
    globalPosts: function(sortby){
    //  new App.Views.CategorySelect({collection: App.posts, sort: App.category});
      new App.Views.GlobalListPosts({collection: App.posts, sort: sortby});
    }

  });

}());

(function(){
  App.Views.AddPost = Parse.View.extend({

    events: {
      'click #publishPost' : 'addPublic',
      'click #addDraft' : 'addDraft'

    },
    initialize: function(){
      this.render();


      $('#blogList').html(this.$el);
    },
    render: function(){
      this.$el.html($('#addTemp').html());
      $('#cat').empty();

    },
    // addPost: function(e){
    //   e.preventDefault();
    //
    //   var p = new App.Models.Post({
    //     title: $('#postTitle').val(),
    //     content: $('#postContent').val(),
    //     category: $('#postCategory').val(),
    //     user: App.user,
    //     draft: false
    //
    //   });
    //
    //   // p.setACL(new Parse.ACL(App.user));
    //   var postACL = new Parse.ACL(Parse.User.current());
    //
    //   postACL.setPublicReadAccess(true);
    //
    //   p.setACL(postACL);
    //   p.save(null, {
    //     success: function(){
    //       App.posts.add(p);
    //       App.router.navigate('globalPosts', {trigger: true });
    //     }
    //   });
    // },

    addPost: function(draft) {

      var p = new App.Models.Post({
        title: $('#postTitle').val(),
        content: $('#postContent').val(),
        category: $('#postCategory').val(),
        image: $('#postImage').val(),
        user: App.user,
        author: App.user.attributes.username,
        authorid: App.user.id,
        draft: draft
        //time: moment().format('YYYY [escaped] YYYY')

      });

      // p.setACL(new Parse.ACL(App.user));
      var postACL = new Parse.ACL(Parse.User.current());

      postACL.setPublicReadAccess(!draft);

      p.setACL(postACL);

      p.save(null, {
        success: function(){
          App.posts.add(p);
          App.router.navigate('myPosts', {trigger: true });
        }
      });

    },
    addDraft: function(e) {
      e.preventDefault();
      this.addPost(true);
    },

    addPublic: function(e) {
      e.preventDefault();
      this.addPost(false);
    }

    // addDraft: function(e){
    //   e.preventDefault();
    //
    //   var p = new App.Models.Post({
    //     title: $('#postTitle').val(),
    //     content: $('#postContent').val(),
    //     category: $('#postCategory').val(),
    //     user: App.user,
    //     draft: true
    //
    //   });
    //
    //   // p.setACL(new Parse.ACL(App.user));
    //   var postACL = new Parse.ACL(Parse.User.current());
    //
    //   postACL.setPublicReadAccess(false);
    //
    //   p.setACL(postACL);
    //
    //   p.save(null, {
    //     success: function(){
    //       App.posts.add(p);
    //       App.router.navigate('myPosts', {trigger: true });
    //     }
    //   });
    // }

  });

}());

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

    $('#cat').empty();

    this.render();
    $('#blogList').html(this.$el);
  },
  render: function(){
  this.$el.empty();

  this.$el.html(this.template(this.post.toJSON()));

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
        App.router.navigate('globalPosts', {trigger: true});
      }
    });

  }


});
}());

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

(function(){

  App.Views.ListPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'addPosts',

    events: {},

    template : _.template($('#listTemp').html()),

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
      user_post.equalTo('user', this.options.user);
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
      //  console.log("errors were had: " + msg);
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

(function(){

  App.Views.GlobalListPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'addPosts',

    events: {
    //  'click .dropdown-button' : 'dropDown'
    },

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
// dropDown: function(){
//   $(".menu").toggleClass("show-menu");
//   $(".menu > li").click(function(){
//     $(".dropdown-button").html($(this).html());
//     $(".menu").removeClass("show-menu");
//   });
//
// }

});
}());

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

(function(){

  App.Views.SignUpView = Parse.View.extend({

    events: {
      //'click .js-btn' : 'addUser'
      'submit #signUp' : 'addUser'
    },
    initialize: function(){
      this.render();

      $('#signUpField').html(this.$el);
    },

    render: function(){
      this.$el.html($('#SignUpTemp').html());
    },

    addUser: function(e){
      e.preventDefault();
      var user = new Parse.User({
      username: $('#signUpUser').val(),
      password: $('#signUpPassword').val()

      });
      user.signUp(null, {
        success: function(user) {
          App.router.navigate('myPosts', {trigger: true});
          $('#signUpField').hide();
        }
        // error: function(user, error) {
        // //   // Show the error message somewhere and let the user try again.
        //    alert("Error: " + error.code + " " + error.message);
        //  }
      });
      $('.modal').empty();
    }
  });
}());

(function(){

  App.Views.LoginView = Parse.View.extend({
    //classNAme???
    events: {
      'submit #login' : 'userLogin'
      //'click .js-btn' : 'userLogin'
    },
    initialize: function(){
      this.render();

      $('#loginField').html(this.$el);

    },

    render: function(){
      this.$el.html($('#loginTemp').html());
    },

    userLogin: function(e) {
      e.preventDefault();

      var username = $('#username').val();
      var password = $('#password').val();


      Parse.User.logIn(username, password, {
        success: function (user) {
          App.user = user;
          App.router.navigate('globalPosts', {trigger: true});
          console.log('were logged in');
          $('#loginField').hide();
      
        }
      });
      $('.modal').empty();
    }

  });
}());

(function(){
  App.Views.UpdatePost = Parse.View.extend({

    tagName: 'ul',
    className: 'updatePost',

    events: {
      'submit #updatePost' : 'handleClick',
      'click #delete' : 'deletePost',
      'click #publishDraft' : 'publishDraft'
    },

    template : _.template($('#updateTemp').html()),

    initialize: function (options){
      this.options = options;

      this.render();


      $('#blogList').html(this.$el);
    },

    render: function(){

    this.$el.empty();

    this.$el.html(this.template(this.options.post.toJSON()));

    $('#cat').empty();
    },


    handleClick: function (e) {
      e.preventDefault();
      this.updatePost();
    },

    updatePost: function(draft){
    //  console.log()
      this.options.post.set({
        title: $('#updateTitle').val(),
        content: $('#updateContent').val(),
        category: $('#updateCategory').val(),
        image: $('#UpdatepostImage').val()
      });

      if (draft != undefined) {
        this.options.post.set('draft', draft);
      }

      this.options.post.save();

      App.router.navigate('myPosts', {trigger:true});
    },
    publishDraft: function(draft) {
    //  draft.preventDefault();
      this.publishDraft(true);
      var p = new App.Models.Post({
        title: $('#postTitle').val(),
        content: $('#postContent').val(),
        category: $('#postCategory').val(),
        user: App.user,
        draft: draft

      });

      // p.setACL(new Parse.ACL(App.user));
      var postACL = new Parse.ACL(Parse.User.current());

      postACL.setPublicReadAccess(!draft);

      p.setACL(postACL);

      p.save(null, {
        success: function(){
          App.posts.add(p);
          App.router.navigate('myPosts', {trigger: true });
        }
      });
    },
    publishDraft: function(e){
      e.preventDefault();
      this.updatePost(false);
    },
    deletePost: function(e){
      e.preventDefault();
      this.options.post.destroy();
      App.router.navigate('myPosts', {trigger: true});
    }
    // updateDraft: function(e) {
    //   e.preventDefault();
    //   this.updatePost(true);
    // },
    //
    // publishDraft: function(e) {
    //   e.preventDefault();
    //   this.updatePost(false);
    // }

  });

}());

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

Parse.initialize("j5VJ8EgUlacmXfvF2aTs1tKuOSaJxUSvfxQJPBwv", "VRCaCvLyFFfzIStyvs6WuABpaSHIR7S2gTwBWFdF");

(function(){


  //add Parse.User.current
  App.posts = new App.Collections.Posts();

  App.posts.fetch().done( function(){
    App.router = new App.Routers.AppRouter();
      //Parse.history.start();
  });

  $('#logOut').on('click', function (e){
    e.preventDefault();
    Parse.User.logOut();
    App.router.navigate('', {trigger: true});
  });

  $('#log-out-btn').on('click', function(e){
  e.preventDefault();
  Parse.User.logOut();
  App.updateUser();
  console.log('we logged out');
  App.router.navigate('', {trigger: true});
  });

// Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      $('#log-out-btn').remove();
      $('#my-posts-btn').remove();
      $('.addBtn').remove();
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
      $('#logOut').text('Log Out');
      $('.modal').remove();
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();

//Opens the SignUp and Login forms in the modal window when the button is clicked
  $('.modal-window').load( function(e){
    e.preventDefault();
    App.router.navigate('#/login',{trigger: true});
  });
}());
