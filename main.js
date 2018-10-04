var game = new Phaser.Game(800, 800, Phaser.AUTO);
game.state.add('main_menu', mascot_raid.main_menu);
game.state.add('game_scene_0', mascot_raid.game_scene_0);
game.state.add('credits', mascot_raid.credits);
game.state.add('main_state', mascot_raid.main_state);
game.state.start('main_menu');