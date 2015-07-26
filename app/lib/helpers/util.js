var Constants = require('core/constants');
var Promise = require('ext/bluebird/bluebird');
var Downloader = require('helpers/downloader');

function Util(){
}

Util._downloader = new Downloader();

Util.createDirectory = function(path){
	var directory = path;
	if(!(directory instanceof Ti.Filesystem.File)){
		directory = Ti.Filesystem.getFile(path);
	}
	
	if(!directory.exists()){
		directory.createDirectory();
	}
};

Util.getCover = function(gameId, url){
	Util.createDirectory(Constants.GAME_COVER_PATH);

	var file = Ti.Filesystem.getFile(Constants.GAME_COVER_PATH.resolve(), gameId + '.png');
	var promiseArgs = {
		gameId : gameId,
		path : file.resolve(),
		url : url
	};
	var promise;
	if(!file.exists()){
		promise = Util._downloader.download(url, { output : file.resolve() }).then(function(args){
			promiseArgs.cover = args.content;
			return promiseArgs;
		});
	}else{
		promiseArgs.cover = file.read();
		promise = Promise.resolve(promiseArgs);
	}
	
	return promise;
};

Util.computeHeight = function(width, ratio){
	return width * ratio;
};

module.exports = Util;