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

var ballTime = 0;
var ball;

mascot_raid.main_state = function() {};
mascot_raid.main_state.prototype = {

    preload: function() {

        game.load.image('background', 'assets/level_background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('tree', 'assets/trees.png');
        game.load.spritesheet('powerups', 'assets/powerup_buttons.png', 64, 64, 4);
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 100, 100, 4);
        game.load.audio('sprint1_music', 'assets/sprint1_music.mp3')
        game.load.image('ball', 'assets/ball.png');
        game.load.image('money', 'assets/money.png');
        game.load.spritesheet('lvl1', 'assets/enemy.png', 32, 32);
        game.load.spritesheet('lvl2', 'assets/lvl2.png', 50.5, 100);
        game.load.spritesheet('lvl3', 'assets/lvl3.png', 24.5, 32);
        game.load.spritesheet('landmarks', 'assets/landmarks.png', 480, 600, 2);
        game.load.spritesheet('place_buttons', 'assets/placehold_buttons.png', 64, 64, 3);
        game.load.spritesheet('place_unit', 'assets/placehold_unit.png', 64, 64, 3);
        game.load.spritesheet('student', 'assets/student.png', 108, 140, 8);
        game.load.spritesheet('faculty', 'assets/faculty.png', 175, 245, 8);
        game.load.spritesheet('football_player', 'assets/football_player.png', 37.75, 60, 8);
        game.load.image('bevo', 'assets/bevo.png');
        game.load.image('tower', 'assets/tower.png');
        game.load.image('truck_body', 'assets/truck/full.png');
        game.load.image('truck_wheel', 'assets/truck/wheel.png');
        game.load.spritesheet('matt', 'assets/matt_sprites.png', 165, 57, 49);
        game.load.spritesheet('horde', 'assets/horde.png', 15, 32, 8);
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
        var horde_pow = game.add.button(190, 675, 'powerups', "", this, 2, 2, 2);
        horde_pow.fixedToCamera = true;
        horde_pow.onInputDown.add(deploy_horde, this);
        var rain_pow = game.add.button(260, 675, 'powerups', "", this, 3, 3, 3);
        rain_pow.fixedToCamera = true;
        rain_pow.onInputDown.add(make_it_rain, this);
        var truck_pow = game.add.button(50, 675, 'powerups', "", this, 0, 0, 0);
        truck_pow.fixedToCamera = true;
        truck_pow.onInputDown.add(deploy_truck, this);

        var exit = game.add.button(700, 625, 'button', "", this, 1, 1, 1);
        exit.fixedToCamera = true;
        exit.onInputDown.add(exit_pressed, this);

        //add buttons to send units
        var stu_button = game.add.button(400, 675, 'place_buttons', "", this, 0);
        stu_button.fixedToCamera = true;
        stu_button.onInputDown.add(sendUnit1, this);
        var fac_button = game.add.button(470, 675, 'place_buttons', "", this, 1, 1);
        fac_button.fixedToCamera = true;
        fac_button.onInputDown.add(sendUnit2, this);
        var exec_button = game.add.button(540, 675, 'place_buttons', "", this, 2, 2);
        exec_button.fixedToCamera = true;
        exec_button.onInputDown.add(sendUnit3, this);

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

    },
    
    render: function() {
        //game.debug.text('Cooldown time remaining: ' + timer.duration.toFixed(0), 200, 755, '#0000');
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
    var e = enemy.create(2200 + Math.random() * 400, game.world.height - 300 + Math.random() * 10, 'lvl1', 0);
    e.health = 500;
    e.attack = 5;
    e.frame = 0;
    e.body.velocity.x = -200;
    e.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 16, true);
    e.animations.play('left');

}

function deploy_lvl2() {
    //console.log("units made");
    var e = enemy.create(2200 + Math.random() * 400, game.world.height - 325 + Math.random() * 10, 'lvl2', 0);
    e.health = 1000;
    e.attack = 15;
    e.anchor.setTo(.5, .5);
    e.scale.x *= -1;
    e.frame = 0;
    e.body.velocity.x = -200;
    e.animations.add('left', [10, 11, 12, 13, 14, 15, 16], 7, true);
    e.animations.play('left');

}

function deploy_lvl3() {
    //console.log("units made");
    var e = enemy.create(2200 + Math.random() * 400, game.world.height - 300 + Math.random() * 10, 'lvl3', 0);
    e.health = 1500;
    e.attack = 50;
    e.anchor.setTo(.5, .5);
    e.scale.x *= -1;
    e.frame = 0;
    e.body.velocity.x = -200;
    e.animations.add('left', [38, 39, 40], 3, true);
    e.animations.play('left');

}

function buttonReset(button) {
    button.inputEnabled = true;
}

function restoreButton(cover) {
    console.log('cooldown done');
    //cover.kill();
}

function cooldown(x, y, time) {
    //timer.add(time, restoreButton, this);
    //timer.start();
    timeInSeconds = time / 1000;
    timeText = game.add.text(x + 15, y - 20, timeInSeconds);
    timer = game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this, timeInSeconds, timeText);
    //timeString = timeInSeconds.toString();
    //timeText = game.add.text(x + 15, y - 20, timeString);
    //game.debug.text(timer.duration.toFixed(0), x, y, '#0000');
}

function updateTimer(timeInSeconds, timeText) {
    this.timeInSeconds--;
    timeText.text = this.timeInSeconds;
    console.log(this.timeInSeconds);
    if (this.timeInSeconds == 0) {
        game.world.remove(timeText);
        game.time.events.stop();
        console.log('cooldown done');
    }
}

function sendUnit1(stu_button) {
    console.log('student sent');
    var stu = myUnits.create(400, game.world.height - 335 + Math.random() * 30, 'student', 0);
    stu_button.inputEnabled = false;
    game.time.events.add(3000, buttonReset, this, stu_button);
    stu.scale.setTo(.5, .5);
    stu.health = 500;
    stu.attack = 5;
    stu.body.velocity.x = 200;
    //timer.add(3000, restoreButton, this);
    //timer.start();
    //game.debug.text(timer.duration.toFixed(0), 410, 755, '#0000');
    cooldown(410, 755, 3000);
    stu.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    stu.animations.play('run');
}

function sendUnit2(fac_button) {
    console.log('faculty sent');
    var fac = myUnits.create(400, game.world.height - 375 + Math.random() * 30, 'faculty', 0);
    fac_button.inputEnabled = false;
    game.time.events.add(3000, buttonReset, this, fac_button);
    fac.scale.setTo(.4, .4);
    fac.body.velocity.x = 200;
    fac.health = 400;
    fac.attack = 5;
    cooldown(480, 755, 3000);
    fac.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    fac.animations.play('run');

}

function sendUnit3(exec_button) {
    console.log('exec sent');
    var exec = myUnits.create(400, game.world.height - 375 + Math.random() * 30, 'football_player', 4);
    exec_button.inputEnabled = false;
    game.time.events.add(6000, buttonReset, this, exec_button);
    exec.body.velocity.x = 200;
    exec.scale.setTo(2, 2);
    exec.health = 1000;
    exec.attack = 20;
    cooldown(550, 755, 3000);
    exec.animations.add('run', [3, 4, 5, 6, 7], 5, true);
    exec.animations.play('run');
}

function tower_fire() {
    console.log('firing');
}

function deploy_truck(truck_pow) {
    console.log('truck sent');
    var e = truck.create(0, game.world.height - 500, 'truck_body');
    truck_pow.inputEnabled = false;
    game.time.events.add(10000, buttonReset, this, truck_pow);
    e.body.velocity.x = 500;
}

function deploy_matt(matt_pow) {
    console.log('matt deployed');
    var m = matt.create(425, game.world.height - 395, 'matt', 2);
    matt_pow.inputEnabled = false;
    game.time.events.add(10000, buttonReset, this, matt_pow);
    m.scale.setTo(2.5, 2.5);
    m.health = 10000;
    m.attack = 150;
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
function deploy_horde(horde_pow) {
    horde_pow.inputEnabled = false;
    game.time.events.add(10000, buttonReset, this, horde_pow);
    horde_send()
    
}

function make_it_rain(rain_pow) {
    console.log("making it rain!");
    rain_pow.inputEnabled = false;
    game.time.events.add(10000, buttonReset, this, rain_pow);
    for (i = 0; i < 50; i++) {
        var e = rain.create(Math.random() * game.world.width, 0, 'money', 0);
        e.frame = 0;
        e.body.velocity.y = 200;
    }
}