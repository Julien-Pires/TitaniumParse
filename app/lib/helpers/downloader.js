var Promise = require('ext/bluebird/bluebird');

function Downloader(){
	this._sequence = Promise.resolve();
}

Downloader.prototype = _.extend(Downloader, Backbone.Events);

Downloader.prototype.download = function(url, args){
	return this._requestFile(url, args);
};

Downloader.prototype._requestFile = function(url, args){
	var self = this;
	this._sequence = this._sequence.then(function(){
		return new Promise(function(resolve, reject){
			var xhr = Ti.Network.createHTTPClient({
				onload : function(e) {
					self._onSuccess({
						result : e,
						data : this.responseData,
						callback : resolve,
						parameters : args
					});
				},
				onerror : function(e) {
					self._onError({
						result : e,
						callback : reject,
						parameters : args
					});
				}
			});
			xhr.open('GET', url);
			xhr.send();
		});
	});
	
	return this._sequence;
};

Downloader.prototype._onSuccess = function(args){
	var params = args.parameters;
	if(params.output !== undefined){
		var output = params.output;
		if(output){
			this._saveFile(args.data, output);
		}
	}

	this.trigger('downloaded', params);
	args.callback({ content : args.data, payload : params.payload });
};

Downloader.prototype._onError = function(args){
	args.callback({ error : result.error, payload : args.parameters.payload });
};

Downloader.prototype._saveFile = function(content, path){
	var file = Ti.Filesystem.getFile(path);
	file.write(content, false);
};

module.exports = Downloader;