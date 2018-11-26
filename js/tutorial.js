var ut_health,
    am_health,
    ut_tower,
    am_tower,
    myUnits,
    truck,
    matt,
    horde,
    rain,
    matt_pow,
    rain_pow,
    horde_pow,
    truck_pow,
    balls,
    enemy,
    lvl1,
    lvl2,
    lvl3,
    cursors,
    myTower,
    ram_count = 20,
    player,
    dir = "right";
var f = 0,
    d = 0,
    s = 0,
    tut = 0;

var keyE,
    keyW,
    keyR,
    keyQ,
    special = false;

var tutStr = "Press the Arrow keys to move!";
var tutText;

var ballTime = 0;
var ball;

mascot_raid.tutorial = function () {};
mascot_raid.tutorial.prototype = {


    preload: function () {

        game.load.image('background', 'assets/level_background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('tree', 'assets/trees.png');
        game.load.spritesheet('powerups', 'assets/powerup_buttons.png', 64, 64, 5);
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 64, 64, 5);
        game.load.image('ball', 'assets/ball.png');
        game.load.image('money', 'assets/money.png');
        game.load.spritesheet('landmarks', 'assets/landmarks.png', 480, 600, 2);
        game.load.spritesheet('place_buttons', 'assets/placehold_buttons.png', 64, 64, 4);
        game.load.spritesheet('place_unit', 'assets/placehold_unit.png', 64, 64, 3);
        game.load.spritesheet('unit_buttons', 'assets/unit_buttons.png', 64, 64, 4);
        game.load.spritesheet('student', 'assets/student.png', 108, 140, 8);
        game.load.spritesheet('ene_student', 'assets/ene_student.png', 108, 140, 8);
        game.load.spritesheet('faculty', 'assets/faculty.png', 175, 245, 8);
        game.load.spritesheet('ene_faculty', 'assets/ene_faculty.png', 175, 245, 8);
        game.load.spritesheet('football_player', 'assets/football_player.png', 37.75, 60, 8);
        game.load.spritesheet('ene_football_player', 'assets/ene_football_player.png', 37.75, 60, 8);
        game.load.image('bevo', 'assets/bevo.png');
        game.load.image('truck_body', 'assets/truck/full.png');
        game.load.image('truck_wheel', 'assets/truck/wheel.png');
        game.load.spritesheet('matt', 'assets/matt_sprites.png', 165, 57, 49);
        game.load.spritesheet('horde', 'assets/horde.png', 15, 32, 8);
        game.load.image('cover', 'assets/cover.png');
        game.load.spritesheet('player', 'assets/player/player.png', 128, 128);
        //all the audio
        game.load.audio('song', 'assets/audio/texas_song.mp3');
        game.load.audio('bevo_moo', 'assets/audio/bevo_moo.wav');
        game.load.audio('matt_sound', 'assets/audio/matt_sound.mp3');
        game.load.audio('cha_ching', 'assets/audio/cha_ching.wav');
        game.load.audio('horde_sound', 'assets/audio/horde_sound.wav');
        game.load.audio('stu_sound', 'assets/audio/stu_sound.wav');
        game.load.audio('fac_sound', 'assets/audio/fac_sound.wav');
        game.load.audio('exec_sound', 'assets/audio/exec_sound.wav');
        console.log("In game");

    },

    create: function () {
        //add music
        //var song = game.add.audio('song', 1, true);
        //song.play();
        //song.onLoop.add(function(){song.play()}, this);
        keyE = game.input.keyboard.addKey(Phaser.Keyboard.E)
        keyW = game.input.keyboard.addKey(Phaser.Keyboard.W)
        keyR = game.input.keyboard.addKey(Phaser.Keyboard.R)
        keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        var keyM = game.input.keyboard.addKey(Phaser.Keyboard.M);
        keyM.onDown.add(function () {
            game.sound.mute = true
        }, this);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //load background and floor
        var BG = game.add.sprite(0, 0, 'background');

        //physics for immovable objects
        bases = game.add.group();
        bases.enableBody = true;
        bases.physicsBodyType = Phaser.Physics.ARCADE;
        bases.setAll('health', 3000);
        var floor = game.add.sprite(0, 0, 'ground');

        //set edge of world
        game.world.setBounds(0, 0, 2400, 800);

        //add landmarks
        ut_tower = bases.create(0, 0, 'landmarks', 0);
        ut_tower.health = 50000;
        am_tower = bases.create(1920, 0, 'landmarks', 1);
        am_tower.health = 50000;

        ut_health = game.add.text(50, 50, ut_tower.health, {
            fontSize: '42px',
            fill: 'black'
        });
        ut_health.fixedToCamera = true;
        am_health = game.add.text(1250, 50, am_tower.health, {
            fontSize: '42px',
            fill: 'black'
        });
        am_health.fixedToCamera = true;
        tutText = game.add.text(400, 500, tutStr, {
            fontSize: '42px',
            fill: 'black'
        });


        //add in power up buttons
        // var bevo_pow = game.add.button(50, 675, 'powerups', "", this, 0, 0, 0);
        // bevo_pow.fixedToCamera = true;
        // bevo_pow.onInputDown.add(deploy_bevo, this);
        var matt_pow = game.add.button(120, 675, 'powerups', "", this, 1, 1, 1);
        matt_pow.fixedToCamera = true;
        matt_pow.onInputDown.add(deploy_matt, this);
        keyW.onDown.add(deploy_matt, this, 0, matt_pow, keyW);
        var horde_pow = game.add.button(190, 675, 'powerups', "", this, 2, 2, 2);
        horde_pow.fixedToCamera = true;
        horde_pow.onInputDown.add(deploy_horde, this);
        keyE.onDown.add(deploy_horde, this);
        var rain_pow = game.add.button(260, 675, 'powerups', "", this, 3, 3, 3);
        rain_pow.fixedToCamera = true;
        rain_pow.onInputDown.add(make_it_rain, this);

        keyR.onDown.add(make_it_rain, this);
        var truck_pow = game.add.button(50, 675, 'powerups', "", this, 0, 0, 0);
        truck_pow.fixedToCamera = true;
        truck_pow.onInputDown.add(deploy_truck, this);

        keyQ.onDown.add(deploy_truck, this, 0, truck_pow, keyQ);

        var exit = game.add.button(700, 650, 'button', "", this, 1, 1, 1);
        exit.scale.setTo(1.5, 1.5);
        exit.fixedToCamera = true;
        exit.onInputDown.add(exit_pressed, this);

        //creating pause menu for tips
        var pause_button = game.add.button(800, 650, 'button', "", this, 4, 4, 4);
        pause_button.scale.setTo(1.5, 1.5);
        pause_button.fixedToCamera = true;
        pause_button.onInputDown.add(pause_menu, this);

        var next = game.add.button(1200, 650, 'button', "", this, 3, 3, 3);
        next.scale.setTo(1.5, 1.5);
        next.onInputDown.add(next_pressed, this);

        //add buttons to send units
        var stu_button = game.add.button(400, 675, 'unit_buttons', "", this, 0);
        stu_button.fixedToCamera = true;
        stu_button.onInputDown.add(sendUnit1, this);
        var keyZ = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        keyZ.onDown.add(sendUnit1, this);
        var fac_button = game.add.button(470, 675, 'unit_buttons', "", this, 1, 1);
        fac_button.fixedToCamera = true;
        fac_button.onInputDown.add(sendUnit2, this);
        var keyX = game.input.keyboard.addKey(Phaser.Keyboard.X);
        keyX.onDown.add(sendUnit2, this);
        var exec_button = game.add.button(540, 675, 'unit_buttons', "", this, 2, 2);
        exec_button.fixedToCamera = true;
        exec_button.onInputDown.add(sendUnit3, this);
        var keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
        keyC.onDown.add(sendUnit3, this);

        //create Player unit
        createPlayer(200, game.world.height - 300);
        player.body.collideWorldBounds = true;

        //create unit group
        myUnits = game.add.group();
        myUnits.enableBody = true;
        myUnits.physicsBodyType = Phaser.Physics.ARCADE;
        myUnits.setAll('checkWorldBounds', true);
        myUnits.setAll('outOfBoundsKill', true);
        myUnits.setAll('health', 0);
        myUnits.setAll('attack', 0);

        //add in powers
        myPowers = game.add.group();
        myPowers.enableBody = true;
        myPowers.physicalBodyType = Phaser.Physics.ARCADE;
        myPowers.setAll('checkWorldBounds', true);
        myPowers.setAll('outOfBoundsKill', true);
        truck = game.add.group();
        truck.enableBody = true;
        truck.physicsBodyType = Phaser.Physics.ARCADE;
        matt = game.add.group();
        matt.enableBody = true;
        matt.physicsBodyType = Phaser.Physics.ARCADE;
        horde = game.add.group();
        horde.enableBody = true;
        horde.physicsBodyType = Phaser.Physics.ARCADE;
        rain = game.add.group();
        rain.enableBody = true;
        rain.physicsBodyType = Phaser.Physics.ARCADE;

        myPowers.add(truck, matt, horde, rain);

        //add in timer
        timer = game.time.create(false);

        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.ARCADE;
        balls.setAll('checkWorldBounds', true);
        balls.setAll('outOfBoundsKill', true);

        for (var i = 0; i < 30; i++) {
            var b = balls.create(0, 0, 'ball');
            b.name = 'ball' + i;
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(resetball, this);
        }

        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        //camera follows player
        game.camera.follow(player);
        //game.camera.deadzone = new Phaser.Rectangle(centerX - 200, 0, 1200, 800);


        addKeyListen();
    },

    update: function () {
        game.physics.arcade.overlap(balls, enemy, collisionHandler, null, this);
        setInterval(game.physics.arcade.overlap(myUnits, enemy, collisionHandler2, null, this), 1000);
        game.physics.arcade.overlap(rain, enemy, collisionHandler3, null, this);
        game.physics.arcade.overlap(truck, enemy, truckCollisionHandler, null, this);
        game.physics.arcade.overlap(ut_tower, enemy, utCollisionHandler, null, this);
        game.physics.arcade.overlap(am_tower, myUnits, amCollisionHandler, null, this);
        game.physics.arcade.overlap(matt, enemy, collisionHandler2, null, this);
        game.physics.arcade.overlap(horde, enemy, collisionHandler, null, this);
        game.physics.arcade.overlap(player, enemy, playerCollisionHandler, null, this);
        if (tut == 0) {
            playerUpdate();
            tutStr = "Press the Arrow keys to move!"
            if (cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown) {
                tut++;
            }
        }
        if (tut == 1) {
            playerUpdate();
            tutText.destroy();
            tutStr = "Press the special power buttons q,w,e to use skills!"
            tutText = game.add.text(400, 500, tutStr, {
                fontSize: '42px',
                fill: 'black'
            });
            if (special) {
                tut++;
                console.log("special pressed")
            }
        }

        if (tut == 2) {
            playerUpdate();
            tutText.destroy();
            tutStr = "Press the unit buttons z,x,c to deploy units!"
            tutText = game.add.text(400, 500, tutStr, {
                fontSize: '42px',
                fill: 'black'
            });
            if (game.input.keyboard.isDown(Phaser.Keyboard.Z) || game.input.keyboard.isDown(Phaser.Keyboard.X) || game.input.keyboard.isDown(Phaser.Keyboard.C)) {
                tut++;
            }
        }

        if (tut == 3) {
            playerUpdate();
            tutText.destroy();
            tutStr = "Press the next button to play!"
            tutText = game.add.text(400, 500, tutStr, {
                fontSize: '42px',
                fill: 'black'
            });
        }
        playerUpdate();

        console.log(tut);


        //scroll the map by dragging with mouse
        if (this.game.input.activePointer.isDown) {
            if (this.game.origDragPoint) {
                this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
            }
            this.game.origDragPoint = this.game.input.activePointer.position.clone();
        } else {
            this.game.origDragPoint = null;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            throwball();
        }

    }
}

function next_pressed() {
    game.state.start('main_state');
}