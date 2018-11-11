//Main menu stage
var mascot_raid = {};
var buttons = {
    main: 0,
    credits: 1,
    save: 2,
    play: 3,
};
var background;
var gameOver;

mascot_raid.main_menu = function() {};
mascot_raid.main_menu.prototype = {
	preload: function() {
		game.load.image('main_menu', 'assets/main_menu.png');
		game.load.spritesheet('game_logo', 'assets/game_logo.png', 300, 300);
		game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 64, 64, 5);
		console.log("Main");
	},

	create: function() {

		//main_menu will be main menu
		background = game.add.sprite(0, 0, 'main_menu');
		var logo = game.add.sprite(250, 200, 'game_logo');

		// Buttons
		var play = game.add.button(270, game.world.height / 2, 'button', "", this, 0, 0, 0);
		var credits = game.add.button(420, game.world.height / 2, 'button', "", this, 2, 2, 2);
		play.frame = 0;
        play.scale.setTo(1.5, 1.5);
		credits.frame = 2;
        credits.scale.setTo(1.5, 1.5);

		play.onInputDown.add(in_game, this);
		credits.onInputDown.add(in_credits, this);


		addKeyListen();
	},

	update: function() {
		//nothing
	}

};
