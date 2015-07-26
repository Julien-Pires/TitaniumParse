function Platform(){
}

Platform.Android = Ti.Platform.osname === 'android';
Platform.IOS = (Ti.Platform.osname === 'iphone ') || (Ti.Platform.osname === 'ipad');

module.exports = Platform;