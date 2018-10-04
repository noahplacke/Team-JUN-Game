mascot_raid.main_state = function(){};
mascot_raid.main_state.prototype = {

    preload: function() {

        game.load.image('background', 'assets/level_background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('tree', 'assets/trees.png');

    },

    create: function() {
        //load background and floor
        var BG = game.add.sprite(0, 0, 'background');
        var floor = game.add.sprite(0, 0, 'ground');
        game.world.setBounds(0, 0, 2400, 800);


    },

    update: function() {

    }
}