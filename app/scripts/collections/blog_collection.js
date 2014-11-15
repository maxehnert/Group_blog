(function(){
  App.Collections.Posts = Parse.Collection.extend({
    model: App.Models.Post,
    comparator: function (model) {
      return model.get('category');
    }


  });

}());
