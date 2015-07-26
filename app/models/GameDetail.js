require('ext/parse/TiParse')(Alloy.CFG.parseOptions);

exports.definition = {
	config: {
		adapter: {
			type: "properties",
			collection_name: "GameDetail"
		}
	},
	extendModel: function(Model) {
		Model = Model.extend(Parse.Object.extend('GameDetail').prototype);

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {});

		return Collection;
	}
};