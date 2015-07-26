var Constants = require('core/constants');

function Resources(){
}

Resources._noImage = null;
Resources._noBackground = null;

Resources.getNoImage = function(){
	if(Resources._noImage == null){
		Resources._noImage = Constants.NO_COVER_IMAGE.read();
	}
	
	return Resources._noImage;
};

Resources.getNoBackground = function(){
	if(Resources._noBackground == null){
		Resources._noBackground = Constants.NO_BACKGROUND_IMAGE.read();
	}
	
	return Resources._noBackground;
};

module.exports = Resources;