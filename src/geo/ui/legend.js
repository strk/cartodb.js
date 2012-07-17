/**
* zoom view to control the zoom of the map
* usage:
*
* var legend = new cdb.geo.ui.Legend({ model: map });
* view.append(legend.render().el);
*
*/

cdb.geo.ui.LegendItemModel = Backbone.Model.extend({ });

cdb.geo.ui.LegendItems = Backbone.Collection.extend({
  model: cdb.geo.ui.LegendItemModel
});

cdb.geo.ui.LegendItem = cdb.core.View.extend({

  tagName: "li",

  initialize: function() {

    _.bindAll(this, "render");
    this.template = cdb.templates.getTemplate('templates/map/legend/item');

  },

  render: function() {

    this.$el.html(this.template(this.model.toJSON()));
    return this.$el;

  }

});

cdb.geo.ui.Legend = cdb.core.View.extend({

  id: "legend",

  default_options: {

  },

  initialize: function() {
    this.map = this.model;

    _.bindAll(this, "render", "show", "hide");

    _.defaults(this.options, this.default_options);


    this.model.collection = this.collection;

    this.template = this.options.template ? this.options.template : cdb.templates.getTemplate('geo/legend');
  },

  show: function() {
    this.$el.fadeIn(250);
  },

  hide: function() {
    this.$el.fadeOut(250);
  },

  render: function() {
    var self = this;

    this.$el.html(this.template(this.model.toJSON()));

    this.collection.each(function(item) {

      var view = new cdb.geo.ui.LegendItem({ className: item.get("className"), model: item });
      self.$el.find("ul").append(view.render());

    });

    return this;
  }

});