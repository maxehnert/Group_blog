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
