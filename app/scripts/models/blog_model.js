(function(){
  App.Models.Post = Parse.Object.extend({

  className: 'Post',

  idAttribute: 'objectId',

  defaults: {
    username: '',
    title: '',
    content: '',
    category: '',
    image:''
  },

  initialize: function (){
    var t = this.get('name');
  }

  });
}());
