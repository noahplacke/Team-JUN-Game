//credits Stage

mascot_raid.credits = function () {};
mascot_raid.credits.prototype = {
    preload: function () {
        game.load.image('main_menu', 'assets/main_menu.png');
        game.load.spritesheet('game_logo', 'assets/game_logo.png', 300, 300);
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 100, 100, 4);
        console.log("credits");
    },
    create: function () {
        //add logic here
        //background = game.add.sprite(0, 0, 'main_menu');
        var style1 = {font: "45px Arial", fill: "#ff0044", align: "center"};
        var text1 = game.add.text(game.world.centerX, game.world.centerY-35, "Core Contributors", style1);
        var style2 = {font: "30px Arial", fill: "#ff0044", align: "center"};
        var text2 = game.add.text(game.world.centerX, game.world.centerY, "Jin Choi | Noah Placke | Usman Siddiqui", style2);
        text1.anchor.set(0.5);
        text2.anchor.set(0.5);
        var exit = game.add.button(700, 600, 'button', "", this, 1, 1, 1);
        exit.frame = 1;
        exit.onInputDown.add(exit_pressed, this);
        addKeyListen();
    },
    update: function () {
        //add logic here
    }
};
