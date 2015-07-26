function Constants(){	
}

Constants.GAME_COVER_FOLDER = 'cover';
Constants.GAME_COVER_PATH = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, Constants.GAME_COVER_FOLDER);

Constants.NO_COVER_IMAGE = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), 'ui/no-cover.png');
Constants.NO_BACKGROUND_IMAGE = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), 'ui/no-background.png');

module.exports = Constants;