require('ext/parse/TiParse')(Alloy.CFG.parseOptions);

exports.definition = {
	config: {

		adapter: {
			type: "properties",
			collection_name: "Platform"
		}
	},
	extendModel: function(Model) {
		Model = Model.extend(Parse.Object.extend('Platform').prototype);
		
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {});

		return Collection;
	}
};