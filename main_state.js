mascot_raid.main_state = function(){};
mascot_raid.main_state.prototype = {

    preload: function() {

        game.load.image('background', 'assets/level_background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('tree', 'assets/trees.png');

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
        
        game.world.setBounds(0, 0, 2400, 800);


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