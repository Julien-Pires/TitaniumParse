var gameRows = [];

function initialize(){
	var gamesManager = Alloy.Globals.gamesManager;
	if(gamesManager.ready){
		addAllGames();
	} else {
		gamesManager.on('ready', addAllGames);
	}
	
	$.gamesTable.addEventListener('click', showGameInfo);
}

function addAllGames(){
	var games = Alloy.Globals.gamesManager.games;
	games.each(function(game){
		addGameToTable(game);
	});
}

function addGameToTable(game){
	var infoContainer = Alloy.createWidget('gameInfoView', game);
	var row = Ti.UI.createTableViewRow();
	row.add(infoContainer.getView());
	$.addClass(row, 'gameRow');
	$.gamesTable.appendRow(row);
	
	gameRows.push(infoContainer);
}

function showGameInfo(args){
	var data = { game :  gameRows[args.index].game };
	var gameInfoController = Alloy.createController('gameInfo', data);
	gameInfoController.getView().open();
}

$.index.open();

initialize();