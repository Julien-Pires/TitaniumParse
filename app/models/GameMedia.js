require('ext/parse/TiParse')(Alloy.CFG.parseOptions);

exports.definition = {
	config: {
		adapter: {
			type: "properties",
			collection_name: "GameMedia"
		}
	},
	extendModel: function(Model) {
		Model = Model.extend(Parse.Object.extend('GameMedia').prototype);

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {});

		return Collection;
	}
};