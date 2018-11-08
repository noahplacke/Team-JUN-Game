var ut_health;
var am_health;
var ut_tower;
var am_tower;
var myUnits;
var truck;
var matt;
var horde;
var rain;
var balls;
var enemy;
var lvl1;
var lvl2;
var lvl3;
var cursors;
var myTower;
var ram_count = 20;
var player;
var dir = "right";

var ballTime = 0;
var ball;

mascot_raid.main_state = function() {};
mascot_raid.main_state.prototype = {

    preload: function() {

        game.load.image('background', 'assets/level_background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('tree', 'assets/trees.png');
        game.load.spritesheet('powerups', 'assets/powerup_buttons.png', 64, 64, 5);
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 100, 100, 4);
        game.load.audio('sprint1_music', 'assets/sprint1_music.mp3')
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
        game.load.image('tower', 'assets/tower.png');
        game.load.image('truck_body', 'assets/truck/full.png');
        game.load.image('truck_wheel', 'assets/truck/wheel.png');
        game.load.spritesheet('matt', 'assets/matt_sprites.png', 165, 57, 49);
        game.load.spritesheet('horde', 'assets/horde.png', 15, 32, 8);
        game.load.image('cover', 'assets/cover.png');
        game.load.spritesheet('player', 'assets/player/player.png', 128, 128);
        console.log("In game");

    },

    create: function() {
        var music = game.add.audio('sprint1_music');
        //This music loops everytime. Need to find to have it stop when played alreay so that it doesn't overlap.
        // music.play();

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

        ut_health = game.add.text(50, 50, ut_tower.health, { fontSize: '42px', fill: 'black' });
        ut_health.fixedToCamera = true;
        am_health = game.add.text(1250, 50, am_tower.health, { fontSize: '42px', fill: 'black' });
        am_health.fixedToCamera = true;


        //add in power up buttons
        // var bevo_pow = game.add.button(50, 675, 'powerups', "", this, 0, 0, 0);
        // bevo_pow.fixedToCamera = true;
        // bevo_pow.onInputDown.add(deploy_bevo, this);
        var matt_pow = game.add.button(120, 675, 'powerups', "", this, 1, 1, 1);
        matt_pow.fixedToCamera = true;
        matt_pow.onInputDown.add(deploy_matt, this);
        var keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        keyW.onDown.add(deploy_matt, this, matt_pow);
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
        keyQ.onDown.add(deploy_truck, this, truck_pow);

        var exit = game.add.button(700, 625, 'button', "", this, 1, 1, 1);
        exit.fixedToCamera = true;
        exit.onInputDown.add(exit_pressed, this);

        //add buttons to send units
        var stu_button = game.add.button(400, 675, 'unit_buttons', "", this, 0);
        stu_button.fixedToCamera = true;
        stu_button.onInputDown.add(sendUnit1, this);
        var fac_button = game.add.button(470, 675, 'unit_buttons', "", this, 1, 1);
        fac_button.fixedToCamera = true;
        fac_button.onInputDown.add(sendUnit2, this);
        var exec_button = game.add.button(540, 675, 'unit_buttons', "", this, 2, 2);
        exec_button.fixedToCamera = true;
        exec_button.onInputDown.add(sendUnit3, this);
        
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
        var unit_timer = (function() {
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

        //tower self defense creation
        var myTower = myUnits.create(210, 85, 'tower');
        if (Phaser.Math.distance(myTower.x, myTower.y, enemy.children.x, enemy.children.y) < 600)
            tower_fire()


        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
        //camera follows player
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 200, 0, 1200, 800);


        addKeyListen();

    },

    update: function() {
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

function collisionHandler2(myUnits, ene) {

    myUnits.body.velocity.x = 0;
    ene.body.velocity.x = 0;
    myUnits.text.setText(myUnits.health);
    var timeDelay = 0;
    if (game.time.now > timeDelay) {
        myUnits.health = myUnits.health - ene.attack;
        ene.health = ene.health - ene.attack;
        timeDelay = game.time.now + 1000;
    }
    //console.log(myUnits.health);
    //console.log(ene.health);
    if (myUnits.health <= 0) {
        myUnits.kill();
        ene.body.velocity.x = -200;
    } else if (ene.health <= 0) {
        ene.kill();
        myUnits.body.velocity.x = 200;
    }
}

function collisionHandler3(money, ene) {

    ene.kill();

}
function truckCollisionHandler(truck, ene){
    if(ram_count > 0){
        ene.kill();
        ram_count--;
    } else {
        truck.kill();
        ram_count = 20;
    }
}
function utCollisionHandler(base, units){
    units.body.velocity.x = 0;
    var timeDelay = 0;
    if (game.time.now > timeDelay) {
        base.health -= units.attack;
        timeDelay = game.time.now + 1000;
    }
    ut_health.text = base.health;
    if (base.health <= 0) {
        var over = game.add.text(game.world.centerX/2, game.world.centerY/2, "Game Over", { fontSize: '72px', fill: 'black' });
        over.fixedToCamera = true;
        game.paused = true;
        ut_health.text = 0;
    }
}

function amCollisionHandler(base, units){
    units.body.velocity.x = 0;
    var timeDelay = 0;
    if (game.time.now > timeDelay) {
        base.health -= units.attack;
        timeDelay = game.time.now + 1000;
    }
    am_health.text = base.health;
    if (base.health <= 0) {
        var over = game.add.text(game.world.centerX/2, game.world.centerY/2, "You Win!", { fontSize: '72px', fill: 'black' });
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
    game.time.events.add(time, function(){cover.kill()}, cover);
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
    //timer.add(3000, restoreButton, this);
    //timer.start();
    //game.debug.text(timer.duration.toFixed(0), 410, 755, '#0000');
    //cooldown(410, 755, 3000);
    stu_button.frame = 3;
    game.time.events.add(cool, function(){stu_button.frame = 0}, stu_button);
    stu.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    stu.animations.play('run');
}

function sendUnit2(fac_button) {
    console.log('faculty sent');
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
    //cooldown(480, 755, 3000);
    fac_button.loadTexture('cover');
    game.time.events.add(cool, function(){fac_button.loadTexture('unit_buttons', 1)}, fac_button);
    fac.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    fac.animations.play('run');

}

function sendUnit3(exec_button) {
    console.log('exec sent');
    var exec = myUnits.create(400, game.world.height - 375 + Math.random() * 30, 'football_player', 4);
    cool = 6000
    exec_button.inputEnabled = false;
    game.time.events.add(cool, buttonReset, this, exec_button);
    exec.body.velocity.x = 200;
    exec.scale.setTo(2, 2);
    exec.health = 1000;
    exec.attack = 20;
    exec.text = game.add.text(exec.x - 390, exec.y - 450, exec.health, {font: '12px'});
    exec.addChild(exec.text);
    exec_button.loadTexture('cover');
    game.time.events.add(cool, function(){exec_button.loadTexture('unit_buttons', 2)}, exec_button);
    exec.animations.add('run', [3, 4, 5, 6, 7], 5, true);
    exec.animations.play('run');
}

function tower_fire() {
    console.log('firing');
}

function deploy_truck(truck_pow, keyQ) {
    console.log('truck sent');
    var e = truck.create(0, game.world.height - 500, 'truck_body');
    cool = 10000
    truck_pow.inputEnabled = false;
    game.time.events.add(cool, buttonReset, this, truck_pow);
    keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    keyQ.enabled = false;
    game.time.events.add(cool, keyReset, this, keyQ);
    //truck_pow.loadTexture('cover');
    truck_pow.visible = false;
    game.time.events.add(cool, function(){truck_pow.visible = true}, truck_pow);
    e.body.velocity.x = 500;
}

function deploy_matt(matt_pow, keyW) {
    console.log('matt deployed');
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
    m.text = game.add.text(m.x - 350, m.y - 420, m.health, {font: '12px'});
    m.addChild(m.text);
    matt_pow.loadTexture('cover');
    game.time.events.add(cool, function(){matt_pow.loadTexture('powerups', 1)}, matt_pow);
    m.animations.add('attack', [2, 6, 7, 8, 9, 10, 11], 7, true);
    m.animations.play('attack');
}

var horde_num = 0;
function horde_send() {
    setTimeout(function() {
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
    horde_pow.inputEnabled = false;
    cool = 10000
    game.time.events.add(cool, buttonReset, this, horde_pow);
    keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
    keyE.enabled = false;
    game.time.events.add(cool, keyReset, this, keyE);
    horde_pow.loadTexture('cover');
    game.time.events.add(cool, function(){horde_pow.loadTexture('powerups', 2)}, horde_pow);
    horde_send()
    
}

function make_it_rain(rain_pow, keyR) {
    console.log("making it rain!");
    rain_pow.inputEnabled = false;
    cool = 10000
    game.time.events.add(cool, buttonReset, this, rain_pow);
    keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
    keyR.enabled = false;
    game.time.events.add(cool, keyReset, this, keyR);
    rain_pow.loadTexture('cover');
    game.time.events.add(cool, function(){rain_pow.loadTexture('powerups', 3)}, rain_pow);
    for (i = 0; i < 50; i++) {
        var e = rain.create(Math.random() * game.world.width, 0, 'money', 0);
        e.frame = 0;
        e.body.velocity.y = 200;
    }
}

function playerUpdate(){
    //game.physics.arcade.collide(something, something);
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown){
        if (dir != "left"){
            player.scale.x *= -1;
        }
        dir = "left";
        if (cursors.up.isDown) {
            player.body.velocity.x = -150;
            player.body.velocity.y = -150;
            player.animations.play('walk');
        } else if (cursors.down.isDown) {
            player.body.velocity.x = -150;
            player.body.velocity.y = 150;
            player.animations.play('walk');
        } else {
            player.body.velocity.x = -150;
            player.animations.play('walk');
        }
    
    } else if (cursors.right.isDown){
        if (dir != "right") {
            player.scale.x *= -1;
        }
        dir = "right";
        if (cursors.up.isDown) {
            player.body.velocity.x = 150;
            player.body.velocity.y = -150;
            player.animations.play('walk');
        } else if (cursors.down.isDown) {
            player.body.velocity.x = 150;
            player.body.velocity.y = 150;
            player.animations.play('walk');
        } else {
            player.body.velocity.x = 150;
            player.animations.play('walk');
        }
    } else if (cursors.up.isDown){
        player.body.velocity.y = -150;
        player.animations.play('walk');
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
        player.animations.play('walk');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
        player.animations.play('attack1');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        player.animations.play('attack2');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        player.animations.play('attack3');
    } else {
        player.animations.play('still');
    }
}
function createPlayer(x,y){
    player = game.add.sprite(x, y, 'player');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.colliderWorldBounds = true;
    player.animations.add('still', [0,1,2,3,4,5,6,7,8,9], 10, true);
    player.animations.add('walk', [10, 11, 12, 13, 14, 15], 10, true);
    player.animations.add('double', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 10, true);
    player.animations.add('attack1', [47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68], 20, true);
    player.animations.add('attack2', [32,33,34,35,36,37,38,39,40,41,42,43,44], 20, true);
    player.animations.add('attack3', [71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98], 20, true);
    player.anchor.setTo(.5, .5);
}
function playerCollisionHandler(player, ene) {
    ene.body.velocity.x = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
        ene.health -= 5;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
        ene.health -= 20;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
        ene.kill();
    }
    if (ene.health <= 0){
        ene.kill();
    }
}

/*function keyboardShortcuts() {
    keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    keyQ.onDown.add(deploy_truck, this);
}*/