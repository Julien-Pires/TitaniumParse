require('ext/parse/TiParse');
var Promise = require('ext/bluebird/bluebird');
var BaseManager = require('core/baseManager');

var Game = require('alloy/models/Game').Model;
var Platform = require('alloy/models/Platform').Model;
var Genre = require('alloy/models/Genre').Model;
var GameRating = require('alloy/models/GameRating').Model;

function GamesManager(){	
	this.ready = false;
	this.platforms = Alloy.createCollection('Platform');
	this.genres = Alloy.createCollection('Genre');
	this.ratings = Alloy.createCollection('GameRating');
	this.games = Alloy.createCollection('Game');
	
	this._initialize();
}

GamesManager.prototype = _.extend(GamesManager, BaseManager);

GamesManager.prototype._initialize = function(){
	var self = this;
	var promise = Promise.resolve(null).then(function(){
		return self._fetchPlatform();
	}).then(function(){
		return self._fetchGenres();
	}).then(function(){
		return self._fetchRating();
	}).then(function(){
		return self._fetchGames();
	}).then(function(){
		self.ready = true;
		self.trigger('ready');
	});
};

GamesManager.prototype._fetchPlatform = function(){
	var self = this;
	var query = new Parse.Query(Platform);
	return query.find().then(function(results){
		for(var i = 0; i < results.length; i++){
			var platform = results[i];
			self.platforms.add(platform);
		}
	});
};

GamesManager.prototype._fetchGenres = function(){
	var self = this;
	var query = new Parse.Query(Genre);
	return query.find().then(function(results){
		for(var i = 0; i < results.length; i++){
			var genre = results[i];
			self.genres.add(genre);
		}
	});
};

GamesManager.prototype._fetchRating = function(){
	var self = this;
	var query = new Parse.Query(GameRating);
	return query.find().then(function(results){
		for(var i = 0; i < results.length; i++){
			var rating = results[i];
			self.ratings.add(rating);
		}
	});
};

GamesManager.prototype._fetchGames = function(){
	var self = this;
	var query = new Parse.Query(Game);
	return query.find().then(function(results){
		for(var i = 0; i < results.length; i++){
			var game = results[i];
			self.games.add(game);
			
			var platforms = game.get('platforms');
			if(platforms !== undefined){
				for(var j = 0; j < platforms.length; j++){
					var platformId = platforms[j].id;
					game.platforms.add(self.platforms.get(platformId));
				}
			}
			
			var genres = game.get('genres');
			if(genres !== undefined){
				for(var j = 0; j < genres.length; j++){
					var genreId = genres[j].id;
					game.genres.add(self.genres.get(genreId));
				}
			}
		}
	});
};

module.exports = GamesManager;