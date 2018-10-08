var game = new Phaser.Game(800, 800, Phaser.AUTO, 'gameDiv');
game.state.add('main_menu', mascot_raid.main_menu);
game.state.add('game_scene_0', mascot_raid.game_scene_0);
game.state.add('credits', mascot_raid.credits);
game.state.add('main_state', mascot_raid.main_state);
game.state.start('main_menu');


//functions for changing states
function addKeyListen() {
    game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(restart, null, null, null);
}

function in_game() {
    change_game_scene_0();
}

function in_credits() {
    change_credits();
}

function exit_pressed() {
    change_main_menu();
}

function restart() {
    console.log("restart");
    game.state.start('main_menu');
}

function change_main_menu() {
    game.state.start('main_menu');
}

function change_game_scene_0() {
    game.state.start('main_state');
}

function change_credits() {
    game.state.start('credits');
}

function deploy_bevo(){
    // bevo.
}
