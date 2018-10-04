var mascot_raid = {};
        var buttons = {
            main: 0,
            credits: 1,
            save: 2,
            play: 3,
        };
        var background;
        var gameOver;



        //Main menu stage

        mascot_raid.main_menu = function () {};
        mascot_raid.main_menu.prototype = {
            preload: function () {
                game.load.image('main_menu', 'assets/main_menu.png');
                game.load.spritesheet('game_logo', 'assets/game_logo.png', 300, 300);
                game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 100, 100, 4);
                console.log("Main");
            },

            create: function () {

                //main_menu will be main menu
                background = game.add.sprite(0, 0, 'main_menu');
                var logo = game.add.sprite(250, 200, 'game_logo');

                // Buttons
                var play = game.add.button(300, game.world.height / 2, 'button', "", this, 0, 0, 0);
                var credits = game.add.button(450, game.world.height / 2, 'button', "", this, 2, 2, 2);
                play.frame = 0;
                credits.frame = 2;

                play.onInputDown.add(in_game, this);
                credits.onInputDown.add(in_credits, this);


                addKeyListen();
            },

            update: function () {
                //nothing
            }

        };

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