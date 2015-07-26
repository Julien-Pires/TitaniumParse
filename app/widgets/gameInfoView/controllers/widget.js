var Util = require('helpers/util');
var Resources = require('core/resources');

$.game = arguments[0];

function initialize(){
	$.gameTitle.text = $.game.get('name');
	$.gameCover.image = Resources.getNoImage();
	
	var coverFile = $.game.get('cover');
	if(coverFile !== undefined){
		Util.getCover($.game.id, coverFile.url()).then(function(args){
			$.gameCover.image = args.cover;
		});
	}
	
	var rawDate = $.game.get('released');
	var dateText = 'Unknown';
	if(rawDate !== undefined){
		dateText = String.formatDate(rawDate, 'long');
	}
	$.gameReleased.text = dateText;
	
	var genreText = 'Unknown';
	var genres = $.game.genres;
	if(genres.length > 0){
		genreText = '';
		
		var lastIndex = genres.length - 1;
		genres.each(function(genre, index){
			genreText += genre.get('name');
			if(index < lastIndex){
				genreText += ', ';
			}
		});
	}
	$.gameGenres.text = genreText;
	
	createPlatforms($.game.platforms);
}

function createPlatforms(platforms){
	platforms.each(function(platform, index){
		var platformBackground = Ti.UI.createView();
		$.addClass(platformBackground, 'gameRowPlatformBackground');
		$.gamePlatforms.add(platformBackground);
		if(index > 0){
			$.addClass(platformBackground, 'gameRowNextPlatformBackground');
		}
		
		var backgroundColor = platform.get('color');
		if(backgroundColor){
			platformBackground.backgroundColor = backgroundColor;
		}
		
		var platformLabel = Ti.UI.createLabel({text : platform.get('shortName')});
		$.addClass(platformLabel, 'gameRowPlatformLabel');
		platformBackground.add(platformLabel);
	});
}

initialize();