//Game stage

mascot_raid.game_scene_0 = function () {};
mascot_raid.game_scene_0.prototype = {
    preload: function () {
        game.load.image('main_menu', 'assets/main_menu.png');
        game.load.spritesheet('game_logo', 'assets/game_logo.png', 300, 300);
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 100, 100, 4);
        game.load.audio('sprint1_music','assets/sprint1_music.mp3')
        console.log("In game");
    },
    create: function () {
        //add logic here
        background = game.add.sprite(0, 0, 'main_menu');
        var music = game.add.audio('sprint1_music');
        music.play();

        var style = { font: "30px Arial", fill: "#ff0044", align: "center" };
        var text = game.add.text(game.world.centerX, game.world.centerY, "Where we will continue our game...", style);
        text.anchor.set(0.5);

        var exit = game.add.button(700, 600, 'button', "", this, 1, 1, 1);
        exit.frame = 1;
        exit.onInputDown.add(exit_pressed, this);
        addKeyListen();
    },
    update: function () {
        //add logic here
    }
};
