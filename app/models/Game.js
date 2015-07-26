require('ext/parse/TiParse')(Alloy.CFG.parseOptions);

exports.definition = {
	config: {
		adapter: {
			type: "properties",
			collection_name: "Game"
		}
	},
	extendModel: function(Model) {
		Model = Model.extend(Parse.Object.extend('Game').prototype);
		Model = Model.extend({
			initialize : function(){
				this.platforms = Alloy.createCollection('Platform');
				this.genres = Alloy.createCollection('Genre');
			}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			comparator : function(game){
				return game.get('name').toLowerCase();
			}
		});

		return Collection;
	}
};