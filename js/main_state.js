var ut_health,
    am_health,
    ut_tower,
    am_tower,
    myUnits,
    truck,
    matt,
    horde,
    rain,
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
var f = 0, d = 0, s = 0;

var ballTime = 0;
var ball;

mascot_raid.main_state = function () {};
mascot_raid.main_state.prototype = {

    preload: function () {

        game.load.image('background', 'assets/level_background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('tree', 'assets/trees.png');
        game.load.spritesheet('powerups', 'assets/powerup_buttons.png', 64, 64, 5);
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 64, 64, 5);
        game.load.image('ball', 'assets/ball.png');
        game.load.image('money', 'assets/money.png');
        game.load.spritesheet('lvl1', 'assets/enemy.png', 32, 32);
        game.load.spritesheet('lvl2', 'assets/lvl2.png', 50.5, 100);
        game.load.spritesheet('lvl3', 'assets/lvl3.png', 24.5, 32);
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


        //add in power up buttons
        // var bevo_pow = game.add.button(50, 675, 'powerups', "", this, 0, 0, 0);
        // bevo_pow.fixedToCamera = true;
        // bevo_pow.onInputDown.add(deploy_bevo, this);
        var matt_pow = game.add.button(120, 675, 'powerups', "", this, 1, 1, 1);
        matt_pow.fixedToCamera = true;
        matt_pow.onInputDown.add(deploy_matt, this);
        var keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        keyW.onDown.add(deploy_matt, this, 0, matt_pow, keyW);
        var horde_pow = game.add.button(190, 675, 'powerups', "", this, 2, 2, 2);
        horde_pow.fixedToCamera = true;
        horde_pow.onInputDown.add(deploy_horde, this);
        var keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
        keyE.onDown.add(deploy_horde, this);
        var rain_pow = game.add.button(260, 675, 'powerups', "", this, 3, 3, 3);
        rain_pow.fixedToCamera = true;
        rain_pow.onInputDown.add(make_it_rain, this);
        var keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
        keyR.onDown.add(make_it_rain, this);
        var truck_pow = game.add.button(50, 675, 'powerups', "", this, 0, 0, 0);
        truck_pow.fixedToCamera = true;
        truck_pow.onInputDown.add(deploy_truck, this);
        var keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
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

        //  This will check Group vs. Group collision (balls vs. enemy!)

        enemy = game.add.group();
        enemy.enableBody = true;
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.setAll('health', 0);
        enemy.setAll('attack', 0);
        var unit_timer = (function () {
            setInterval(deploy_lvl1, 2000);
            setInterval(deploy_lvl2, 3000);
            setInterval(deploy_lvl3, 6000);
        })();

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
        game.camera.deadzone = new Phaser.Rectangle(centerX - 200, 0, 1200, 800);


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
        playerUpdate();
        //keyboardShortcuts();



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

function throwball() {

    if (game.time.now > ballTime) {
        ball = balls.getFirstExists(false);

        if (ball) {
            ball.reset(200, game.world.height - 300);
            ball.body.velocity.x = 1500;
            ballTime = game.time.now + 150;
        }
    }
}

//  if the ball goes off screen
function resetball(ball) {

    ball.kill();

}

//  if the ball hits enemy
function collisionHandler(ball, ene) {

    ball.kill();
    ene.kill();

}

function collisionHandler2(unit, ene) {

    unit.body.velocity.x = 0;
    ene.body.velocity.x = 0;
    unit.text.setText(unit.health);
    var timeDelay = 0;
    if (game.time.now > timeDelay) {
        unit.health = unit.health - ene.attack;
        ene.health = ene.health - ene.attack;
        timeDelay = game.time.now + 1000;
    }
    //console.log(myUnits.health);
    //console.log(ene.health);
    if (unit.health <= 0) {
        unit.kill();
        //ene.body.velocity.x = -200;
        enemy.setAll('body.velocity.x', -200);
    } else if (ene.health <= 0) {
        ene.kill();
        //myUnits.body.velocity.x = 200;
        myUnits.setAll('body.velocity.x', 200);
    }
}

function collisionHandler3(money, ene) {

    ene.kill();

}

function truckCollisionHandler(truck, ene) {
    if (ram_count > 0) {
        ene.kill();
        ram_count--;
    } else {
        truck.kill();
        ram_count = 20;
    }
}

function utCollisionHandler(base, units) {
    units.body.velocity.x = 0;
    var timeDelay = 0;
    if (game.time.now > timeDelay) {
        base.health -= units.attack;
        timeDelay = game.time.now + 1000;
    }
    ut_health.text = base.health;
    if (base.health <= 0) {
        var over = game.add.text(game.world.centerX / 2, game.world.centerY / 2, "Game Over", {
            fontSize: '72px',
            fill: 'black'
        });
        over.fixedToCamera = true;
        game.paused = true;
        ut_health.text = 0;
    }
}

function amCollisionHandler(base, units) {
    units.body.velocity.x = 0;
    var timeDelay = 0;
    if (game.time.now > timeDelay) {
        base.health -= units.attack;
        timeDelay = game.time.now + 1000;
    }
    am_health.text = base.health;
    if (base.health <= 0) {
        var over = game.add.text(game.world.centerX / 2, game.world.centerY / 2, "You Win!", {
            fontSize: '72px',
            fill: 'black'
        });
        over.fixedToCamera = true;
        game.paused = true;
        am_health.text = 0;
    }
}

function collisionHandler4(unit, base) {

    unit.body.velocity.x = 0;
    base.health = base.health - unit.attack;
    if (base.health < 0) {
        base.kill();
    }

}

function deploy_lvl1() {
    //console.log("units made");
    var e = enemy.create(2200 + Math.random() * 400, game.world.height - 330 + Math.random() * 10, 'ene_student', 0);
    e.health = 500;
    e.attack = 5;
    e.frame = 0;
    e.body.velocity.x = -200;
    e.scale.setTo(.5, .5);
    e.scale.x *= -1;
    e.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    e.animations.play('left');

}

function deploy_lvl2() {
    //console.log("units made");
    var e = enemy.create(2200 + Math.random() * 400, game.world.height - 325 + Math.random() * 10, 'ene_faculty', 0);
    e.health = 1000;
    e.attack = 15;
    e.anchor.setTo(.5, .5);
    e.frame = 0;
    e.body.velocity.x = -200;
    e.scale.setTo(.4, .4);
    e.scale.x *= -1;
    e.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    e.animations.play('run');

}

function deploy_lvl3() {
    //console.log("units made");
    var e = enemy.create(2200 + Math.random() * 400, game.world.height - 300 + Math.random() * 10, 'ene_football_player', 4);
    e.health = 1500;
    e.attack = 50;
    e.anchor.setTo(.5, .5);
    e.scale.setTo(2, 2);
    e.scale.x *= -1;
    e.frame = 0;
    e.body.velocity.x = -200;
    e.animations.add('run', [3, 4, 5, 6, 7], 5, true);
    e.animations.play('run');

}

function buttonReset(button) {
    button.inputEnabled = true;
}

function keyReset(key) {
    key.enabled = true;
}

function cooldown(x, y, time) {
    //timeInSeconds = time / 1000;
    //timeText = game.add.text(x + 15, y - 20, timeInSeconds);
    //timer = game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this, timeInSeconds, timeText, timer);
    cover = game.add.sprite(x - 10, y - 80, 'cover');
    game.time.events.add(time, function () {
        cover.kill()
    }, cover);
}

function updateTimer(timeInSeconds, timeText, timer) {
    this.timeInSeconds--;
    timeText.text = this.timeInSeconds;
    console.log(this.timeInSeconds);
    if (this.timeInSeconds == 0) {
        game.world.remove(timeText);
        game.time.events.stop();
        game.world.remove(timer)
        console.log('cooldown done');
    }
}

function sendUnit1(stu_button) {
    console.log('student sent');
    var stu_sound = game.add.audio('stu_sound');
    stu_sound.play();
    var stu = myUnits.create(400, game.world.height - 335 + Math.random() * 30, 'student', 0);
    cool = 3000
    stu_button.inputEnabled = false;
    game.time.events.add(cool, buttonReset, this, stu_button);
    stu.scale.setTo(.5, .5);
    stu.health = 500;
    stu.attack = 5;
    stu.body.velocity.x = 200;
    stu.text = game.add.text(stu.x - 350, stu.y - 510, stu.health);
    stu.addChild(stu.text);
    keyZ = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    keyZ.enabled = false;
    game.time.events.add(cool, keyReset, this, keyZ);
    //timer.add(3000, restoreButton, this);
    //timer.start();
    //game.debug.text(timer.duration.toFixed(0), 410, 755, '#0000');
    //cooldown(410, 755, 3000);
    //stu_button.frame = 3;
    var cov = game.add.sprite(game.camera.y + 400, 675, 'cover');
    cov.fixedToCamera = true;
    //game.time.events.add(cool, function(){stu_button.frame = 0}, stu_button);
    game.time.events.add(cool, function () {
        cov.destroy()
    }, stu_button);
    stu.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    stu.animations.play('run');
}

function sendUnit2(fac_button) {
    console.log('faculty sent');
    var fac_sound = game.add.audio('fac_sound');
    fac_sound.play();
    var fac = myUnits.create(400, game.world.height - 375 + Math.random() * 30, 'faculty', 0);
    cool = 3000
    fac_button.inputEnabled = false;
    game.time.events.add(cool, buttonReset, this, fac_button);
    fac.scale.setTo(.4, .4);
    fac.body.velocity.x = 200;
    fac.health = 400;
    fac.attack = 5;
    fac.text = game.add.text(fac.x - 320, fac.y - 460, fac.health);
    fac.addChild(fac.text);
    keyX = game.input.keyboard.addKey(Phaser.Keyboard.X);
    keyX.enabled = false;
    game.time.events.add(cool, keyReset, this, keyX);
    //cooldown(480, 755, 3000);
    var cov = game.add.sprite(game.camera.y + 470, 675, 'cover');
    cov.fixedToCamera = true;
    //fac_button.loadTexture('cover');
    //game.time.events.add(cool, function(){fac_button.loadTexture('unit_buttons', 1)}, fac_button);
    game.time.events.add(cool, function () {
        cov.destroy()
    }, fac_button);
    fac.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    fac.animations.play('run');

}

function sendUnit3(exec_button) {
    console.log('exec sent');
    var exec_sound = game.add.audio('exec_sound');
    exec_sound.play();
    var exec = myUnits.create(400, game.world.height - 375 + Math.random() * 30, 'football_player', 4);
    cool = 6000
    exec_button.inputEnabled = false;
    game.time.events.add(cool, buttonReset, this, exec_button);
    exec.body.velocity.x = 200;
    exec.scale.setTo(2, 2);
    exec.health = 1000;
    exec.attack = 20;
    exec.text = game.add.text(exec.x - 390, exec.y - 450, exec.health, {
        font: '12px'
    });
    exec.addChild(exec.text);
    keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
    keyC.enabled = false;
    game.time.events.add(cool, keyReset, this, keyC);
    var cov = game.add.sprite(game.camera.y + 540, 675, 'cover');
    cov.fixedToCamera = true;
    //exec_button.loadTexture('cover');
    //game.time.events.add(cool, function(){exec_button.loadTexture('unit_buttons', 2)}, exec_button);
    game.time.events.add(cool, function () {
        cov.destroy()
    }, exec_button);
    exec.animations.add('run', [3, 4, 5, 6, 7], 5, true);
    exec.animations.play('run');
}

function deploy_truck(truck_pow, keyQ) {
    console.log('truck sent');
    var bevo_moo = game.add.audio('bevo_moo');
    bevo_moo.play();
    var e = truck.create(0, game.world.height - 400, 'truck_body');
    e.scale.setTo(.5, .5);
    cool = 10000
    truck_pow.inputEnabled = false;
    game.time.events.add(cool, buttonReset, this, truck_pow);
    keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    keyQ.enabled = false;
    game.time.events.add(cool, keyReset, this, keyQ);
    //truck_pow.loadTexture('cover');
    //truck_pow.visible = false;
    var cov = game.add.sprite(game.camera.y + 50, 675, 'cover');
    cov.fixedToCamera = true;
    //game.time.events.add(cool, function(){truck_pow.visible = true}, truck_pow);
    game.time.events.add(cool, function () {
        cov.destroy()
    }, truck_pow);
    e.body.velocity.x = 500;
    special = true;
}

function deploy_matt(matt_pow, keyW) {
    console.log('matt deployed');
    var matt_sound = game.add.audio('matt_sound');
    matt_sound.play();
    var m = matt.create(425, game.world.height - 395, 'matt', 2);
    cool = 10000
    matt_pow.inputEnabled = false;
    game.time.events.add(cool, buttonReset, this, matt_pow);
    keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyW.enabled = false;
    game.time.events.add(cool, keyReset, this, keyW);
    m.scale.setTo(2.5, 2.5);
    m.health = 10000;
    m.attack = 150;
    m.text = game.add.text(m.x - 350, m.y - 420, m.health, {
        font: '12px'
    });
    m.addChild(m.text);
    var cov = game.add.sprite(game.camera.y + 120, 675, 'cover');
    cov.fixedToCamera = true;
    //matt_pow.loadTexture('cover');
    //game.time.events.add(cool, function(){matt_pow.loadTexture('powerups', 1)}, matt_pow);
    game.time.events.add(cool, function () {
        cov.destroy()
    }, matt_pow);
    m.animations.add('attack', [2, 6, 7, 8, 9, 10, 11], 7, true);
    m.animations.play('attack');
    special = true;
}

var horde_num = 0;

function horde_send() {
    setTimeout(function () {
        var h = horde.create(400, game.world.height - 325 + Math.random() * 30, 'horde', 4);
        h.scale.x *= -1;
        h.body.velocity.x = 250;
        h.animations.add('run', [4, 3, 2], 3, true);
        h.animations.play('run');
        horde_num++;
        if (horde_num < 20) {
            horde_send();
        }
        if (horde_num >= 20) {
            horde_num = 0;
        }
    }, 100);
}

function deploy_horde(horde_pow, keyE) {
    var horde_sound = game.add.audio('horde_sound');
    horde_sound.play();
    horde_pow.inputEnabled = false;
    cool = 10000
    game.time.events.add(cool, buttonReset, this, horde_pow);
    keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
    keyE.enabled = false;
    game.time.events.add(cool, keyReset, this, keyE);
    var cov = game.add.sprite(game.camera.y + 190, 675, 'cover');
    cov.fixedToCamera = true;
    //horde_pow.loadTexture('cover');
    //game.time.events.add(cool, function(){horde_pow.loadTexture('powerups', 2)}, horde_pow);
    game.time.events.add(cool, function () {
        cov.destroy()
    }, horde_pow);
    horde_send()
    special = true;
}

function make_it_rain(rain_pow, keyR) {
    console.log("making it rain!");
    var cha_ching = game.add.audio('cha_ching');
    cha_ching.play();
    rain_pow.inputEnabled = false;
    cool = 10000
    game.time.events.add(cool, buttonReset, this, rain_pow);
    keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
    keyR.enabled = false;
    game.time.events.add(cool, keyReset, this, keyR);
    var cov = game.add.sprite(game.camera.y + 260, 675, 'cover');
    cov.fixedToCamera = true;
    //rain_pow.loadTexture('cover');
    //game.time.events.add(cool, function(){rain_pow.loadTexture('powerups', 3)}, rain_pow);
    game.time.events.add(cool, function () {
        cov.destroy()
    }, rain_pow);
    for (i = 0; i < 50; i++) {
        var e = rain.create(Math.random() * game.world.width, 0, 'money', 0);
        e.frame = 0;
        e.body.velocity.y = 200;
    }
    special = true;
}

function playerUpdate() {
    //game.physics.arcade.collide(something, something);
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    if (d > 0) {
        d--;
    }
    if (s > 0) {
        s--;
    }

    if (cursors.left.isDown) {
        if (dir != "left") {
            player.scale.x *= -1;
        }
        dir = "left";
        if (cursors.up.isDown && (player.world.y > 450)) {
            player.body.velocity.x = -150;
            player.body.velocity.y = -150;
            player.animations.play('walk');
        } else if (cursors.down.isDown && (player.world.y < 600)) {
            player.body.velocity.x = -150;
            player.body.velocity.y = 150;
            player.animations.play('walk');
        } else {
            player.body.velocity.x = -150;
            player.animations.play('walk');
        }

    } else if (cursors.right.isDown) {
        if (dir != "right") {
            player.scale.x *= -1;
        }
        dir = "right";
        if (cursors.up.isDown && (player.world.y > 450)) {
            player.body.velocity.x = 150;
            player.body.velocity.y = -150;
            player.animations.play('walk');
        } else if (cursors.down.isDown && (player.world.y < 600)) {
            player.body.velocity.x = 150;
            player.body.velocity.y = 150;
            player.animations.play('walk');
        } else {
            player.body.velocity.x = 150;
            player.animations.play('walk');
        }
    } else if (cursors.up.isDown && (player.world.y > 450)) {
        player.body.velocity.y = -150;
        player.animations.play('walk');
    } else if (cursors.down.isDown && (player.world.y < 600)) {
        player.body.velocity.y = 150;
        player.animations.play('walk');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
        player.animations.play('attack1');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && (d == 0)) {
        player.animations.play('attack2');
        d = 50;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && (s == 0)) {
        player.animations.play('attack3');
        s = 500;
    } else if(!player.animations.currentAnim.isPlaying){
        player.animations.play('still');
    }
}

function createPlayer(x, y) {
    player = game.add.sprite(x, y, 'player');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.colliderWorldBounds = true;
    player.animations.add('still', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    player.animations.add('walk', [10, 11, 12, 13, 14, 15], 10, false);
    player.animations.add('double', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 10, false);
    player.animations.add('attack1', [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68], 20, false);
    player.animations.add('attack2', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], 20, false);
    player.animations.add('attack3', [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98], 20, false);
    player.anchor.setTo(.5, .5);
}

function playerCollisionHandler(player, ene) {
    //ene.body.velocity.x = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.F) && (f == 0)) {
        ene.health -= 5;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && (d == 0)) {
        ene.health -= 20;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && (s == 0)) {
        ene.kill();
    }
    if (ene.health <= 0) {
        ene.kill();
    }
}

function pause_menu() {
    game.paused = true;
    var style1 = {
        font: "35px Arial",
        fill: "#00000",
        align: "center"
    };
    text1 = game.add.text(game.camera.x + 350, 100, "GAME PAUSED -- CLICK ANYWHERE TO CONTINUE", style1);
    text1.fixedToCamera = true;
    text2 = game.add.text(game.camera.x + 350, 150, "QWER to use Power Ups", style1);
    text2.fixedToCamera = true;
    text3 = game.add.text(game.camera.x + 350, 200, "ZXC to send Units", style1);
    text3.fixedToCamera = true;
    text4 = game.add.text(game.camera.x + 350, 250, "Only Units can damage enemy tower", style1);
    text4.fixedToCamera = true;
    text5 = game.add.text(game.camera.x + 350, 300, "Arrow keys to move player -- SDF to attack", style1);
    text5.fixedToCamera = true;
    game.input.onDown.add(unpause, self);
}

function unpause(event) {
    text1.destroy();
    text2.destroy();
    text3.destroy();
    text4.destroy();
    text5.destroy();
    game.paused = false;
}