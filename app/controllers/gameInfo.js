var TiParse = require('ext/parse/TiParse');
var Promise = require('ext/bluebird/bluebird');

var GameDetail = require('alloy/models/GameDetail').Model;
var GameMedia = require('alloy/models/GameMedia').Model;

var Constants = require('core/constants');
var Resources = require('core/resources');
var MediaType = require('core/mediaType');
var Platform = require('helpers/platform');
var Util = require('helpers/util');
var Downloader = require('helpers/downloader');

var game = arguments[0].game;
var gameDetail = null;
var gameMedias = null;
var gamePointer = {
	__type: 'Pointer',
	className: 'Game',
	objectId: game.id
};

function initialize(){
	$.gameTitle.text = game.get('name');
	
	$.topBackground.height = Util.computeHeight(Ti.Platform.displayCaps.platformWidth, (9 / 16)) + 'px';
	$.topBackgroundImage.defaultImage = Constants.NO_BACKGROUND_IMAGE.resolve();
	
	var infoContainer = Alloy.createWidget('gameInfoView', game);
	$.gameInfoContainer.add(infoContainer.getView());
	
	var promise = Promise.resolve().then(function(){
		return getGameDetail();
	}).then(function(){
		return getGameMedias();
	}).then(function(){
		setBackgroundImage();
		setDescription();
		setRating();
		setImagesGallery();
		
		$.gameDetailBlock.show();
	});
}

function getGameDetail(){
	var query = new Parse.Query(GameDetail);
	query.equalTo('gameId', gamePointer);
	
	return query.find(null).then(function(result){
		gameDetail = result[0];
	});
}

function getGameMedias(){
	var query = new Parse.Query(GameMedia);
	query.equalTo('gameId', gamePointer);
	
	return query.find(null).then(function(result){
		gameMedias = result || [];
	});
}

function setBackgroundImage(){
	if(gameDetail === undefined)
		return;
	
	var background = gameDetail.get('backgroundImage');
	if(background !== undefined)
		$.topBackgroundImage.image = background.url();
}

function setDescription(){
	var hide = true;
	if(gameDetail !== undefined){
		var text = gameDetail.get('description');
		if(text !== undefined){
			$.gameDescription.text = text;
			hide = false;
		}
	}
	
	if(hide)
		$.gameDetailBlock.remove($.descriptionBlock);
}

function setRating(){
	var hide = true;
	if(gameDetail !== undefined){
		var gameRatings = gameDetail.get('ratings');
		if((gameRatings !== undefined) && (gameRatings.length > 0)){
			var ratings = Alloy.Globals.gamesManager.ratings;
			for(var i = 0; i < gameRatings.length; i++){
				var rating = ratings.get(gameRatings[i].id);
				var ratingIcon = Ti.UI.createImageView();
				ratingIcon.image = rating.get('icon').url();
				$.addClass(ratingIcon, 'gameRatingImage');
				if(i > 0)
					$.addClass(ratingIcon, 'nextGameRatingImage');	
				
				$.gamesRating.add(ratingIcon);
			}
			
			hide = false;
		}
	}
	
	if(hide)
		$.gameDetailBlock.remove($.ratingBlock);
}

function setImagesGallery(){
	var hide = true;
	if((gameMedias !== undefined) && (gameMedias.length > 0)){
		var images = _(gameMedias).filter(function(e){
			return e.get('type') === MediaType.Image;
		});
		$.imageGalleryCount.text = '(' + images.length + ')';
		
		var lastIndex = Math.min(images.length - 1, 4);
		for(var i = 0; i <= lastIndex; i++){
			var img = images[i];
			var thumbnail = Ti.UI.createImageView();
			thumbnail.image = img.get('thumbnail').url();
			
			$.addClass(thumbnail, 'gameGalleryImage');
			if(i == 0)
				$.addClass(thumbnail, 'firstGameGalleryImage');
			else if(i == lastIndex)
				$.addClass(thumbnail, 'lastGameGalleryImage');
			
			$.imageGalleryScroll.add(thumbnail);
		}
		
		hide = false;
	}
	
	if(hide)
		$.gameDetailBlock.remove($.imageGallery);
}

initialize();