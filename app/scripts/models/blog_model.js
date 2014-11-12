(function(){
  App.Models.Post = Parse.Object.extend({

  className: 'Post',

  idAttribute: 'objectId',

  defaults: {
    title: '',
    content: '',
    category: '',
    image:'',
    user: ''
  },

  initialize: function (){
    var t = this.get('name');
  }

  });
}());
