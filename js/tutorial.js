mascot_raid.tutorial = function() {};
mascot_raid.tutorial.prototype = {
    preload: function() {
        game.load.image('background', 'assets/level_background.png');
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 64, 64, 5);     
    },
    
    create: function() {
        bg = game.add.sprite(0, 0, 'background')
        var style1 = {font: "45px Arial", fill: "#00000", align: "center"};
        var text1 = game.add.text(50, 55, "The goal of this game is to send your units to the opposing tower", style1);
        var text1 = game.add.text(50, 120, "Send Units by clicking the button or using the ZXC keys", style1);
        var text1 = game.add.text(50, 190, "Use your powerups with the QWER keys", style1);
        var text1 = game.add.text(50, 260, "All buttons show cooldown times for units and powerups", style1);
        var text1 = game.add.text(50, 330, "Control your player with arrow keys and the SDF keys for attacks", style1);
        var text1 = game.add.text(50, 405, "S is strong attack - D is medium - F is weak", style1);
        var text1 = game.add.text(50, 470, "ONLY UNITS CAN ATTACK THE ENEMY TOWER", style1);
        var text1 = game.add.text(50, 540, "Send units consistently to get enemy tower health to zero", style1);
        var text1 = game.add.text(50, 610, "We apologize for this wall of text", style1);
        var next = game.add.button(1200, 650, 'button', "", this, 3, 3, 3);
        next.scale.setTo(1.5, 1.5);
        next.onInputDown.add(next_pressed, this);
    },
    
    update: function() {
        
    }
}

function next_pressed() {
    game.state.start('main_state');
}