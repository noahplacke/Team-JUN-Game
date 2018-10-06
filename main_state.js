mascot_raid.main_state = function(){};
mascot_raid.main_state.prototype = {

    preload: function() {

        game.load.image('background', 'assets/level_background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('tree', 'assets/trees.png');
        game.load.spritesheet('powerups', 'assets/powerup_buttons.png', 64, 64, 4);

    },

    create: function() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //load background and floor
        var BG = game.add.sprite(0, 0, 'background');
        
        //physics for immovable objects
        immovable = game.add.group();
        immovable.enableBody = true;
        var floor = immovable.create(0, 0, 'ground');
        floor.body.immovable = true;
        
        //set edge of world
        game.world.setBounds(0, 0, 2400, 800);
        
        //add in power up buttons
        buttons = game.add.group();
        buttons.fixedToCamera = true;
        var bevo_pow = game.add.button(50, 675, 'powerups', "", this, 0, 0, 0);
        bevo_pow.frame = 0;
        bevo_pow.fixedToCamera = true;
        var matt_pow = game.add.button(120, 675, 'powerups', "", this, 1, 1, 1);
        matt_pow.frame = 1;
        matt_pow.fixedToCamera = true;
        var horde_pow = game.add.button(190, 675, 'powerups', "", this, 2, 2, 2);
        horde_pow.frame = 2;
        horde_pow.fixedToCamera = true;
        var rain_pow = game.add.button(260, 675, 'powerups', "", this, 3, 3, 3);
        rain_pow.frame = 3;
        rain_pow.fixedToCamera = true;


    },

    update: function() {
        
        //scroll the map by dragging with mouse
        if (this.game.input.activePointer.isDown) {	
            if (this.game.origDragPoint) {	
                this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;		
                this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;	}		
            this.game.origDragPoint = this.game.input.activePointer.position.clone();}
            else {	
                this.game.origDragPoint = null;}

    }
}