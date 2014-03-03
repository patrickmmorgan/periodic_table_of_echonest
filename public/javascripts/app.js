// ** Artist Model ** //
var Artist = Backbone.Model.extend({
});

// ** Individual Artist View ** //
var ArtistView = Backbone.View.extend({
  events: {
    "click" : "renderTooltip"
  },

  tagName: 'li',

  template: Handlebars.compile($('#artistview-template').html()),

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  renderTooltip: function(){
    alert("Hey, it's working")
  }
});

//** Collection **//
var ArtistCollection = Backbone.Collection.extend({
  model: Artist,

  url: '/',

  initialize: function(){
    this.fetch()
  },

  sort_key: 'hotttnesss',

  comparator: function(a, b){
    a = a.get(this.sort_key);
    b = b.get(this.sort_key);
    return a < b ? 1
          : a > b ? -1
          : 0;
  },

  sortByField: function(fieldName){
    this.sort_key = fieldName;
    this.sort();
  },
});

//** Artist List View **//
var ArtistListView = Backbone.View.extend({
  el: '#artist-list',

  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderArtist)
  },

  renderArtist: function(artist){
    artist.view = new ArtistView({ model: artist });
    this.$el.append( artist.view.render().el );
    return this
  },

  render: function(){
    var self = this;
    this.$el.empty();
    _.each(this.collection.models, function(artist){
      self.renderArtist(artist);
    });
  },
});

var artist_collection, ArtistView, ArtistListView

$(function(){
  artist_collection = new ArtistCollection();
  artist_view = new ArtistView();
  artist_list_view = new ArtistListView({collection: artist_collection, el: $('#artist-list')});
});
