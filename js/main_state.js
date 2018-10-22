student = function(x, y, health, attack) {
    console.log('student sent');
    Phaser.Sprite.call(this, game, x, y, 'place_unit', 0);
    enableBody = true;
    physicsBodyType = Phaser.Physics.ARCADE;
    this.health = health;
    this.attack = attack;
    //this.body.velocity.x = 200;
    game.add.existing(this);
}
student.prototype = Object.create(Phaser.Sprite.prototype);
student.prototype.constructor = student;

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
        game.load.image('bevo', 'assets/bevo.png');
        game.load.image('tower', 'assets/tower.png');
        game.load.image('truck_body', 'assets/truck/full.png');
        game.load.image('truck_wheel', 'assets/truck/wheel.png');
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
        horde = game.add.group();
        rain = game.add.group();
        rain.enableBody = true;
        rain.physicsBodyType = Phaser.Physics.ARCADE;

        myPowers.add(truck, matt, horde, rain);

        // horde_pow.onInputDown.add(deploy_horde, this);
        // rain_pow.onInputDown.add(deploy_rain, this);

        //  This will check Group vs. Group collision (balls vs. enemy!)

        enemy = game.add.group();
        enemy.enableBody = true;
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.setAll('health', 0);
        enemy.setAll('attack', 0);
        var unit_timer = (function() {
            setInterval(deploy_lvl1, 1000);
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
        setTimeout(game.physics.arcade.overlap(myUnits, enemy, collisionHandler2, null, this), 1000);
        game.physics.arcade.overlap(rain, enemy, collisionHandler3, null, this);
        game.physics.arcade.overlap(truck, enemy, truckCollisionHandler, null, this);
        game.physics.arcade.overlap(ut_tower, enemy, utCollisionHandler, null, this);
        game.physics.arcade.overlap(am_tower, myUnits, amCollisionHandler, null, this);
        //game.physics.arcade.overlap(myUnits, bases, collisionHandler4, null, this);
        //game.physics.arcade.overlap(enemy, bases, collisionHandler4, null, this);



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
    var timeDelay = 0;
    if (game.time.now > timeDelay) {
        myUnits.health = myUnits.health - ene.attack;
        ene.health = ene.health - ene.attack;
        timeDelay = game.time.now + 1000;
    }
    console.log(myUnits.health);
    console.log(ene.health);
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

function make_it_rain() {
    console.log("making it rain!");
    for (i = 0; i < 50; i++) {
        var e = rain.create(Math.random() * game.world.width, 0, 'money', 0);
        e.frame = 0;
        e.body.velocity.y = 200;
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

function sendUnit1(stu_button) {
    console.log('student sent');
    var stu = myUnits.create(400, game.world.height - 325 + Math.random() * 30, 'place_unit', 0);
    stu_button.inputEnabled = false;
    game.time.events.add(3000, buttonReset, this, stu_button);
    stu.health = 500;
    stu.attack = 5;
    stu.body.velocity.x = 200;
}

function sendUnit2(fac_button) {
    console.log('faculty sent');
    var fac = myUnits.create(400, game.world.height - 325 + Math.random() * 30, 'place_unit', 1);
    fac_button.inputEnabled = false;
    game.time.events.add(3000, buttonReset, this, fac_button);
    fac.body.velocity.x = 200;
    fac.health = 400;
    fac.attack = 5;

}

function sendUnit3(exec_button) {
    console.log('exec sent');
    var exec = myUnits.create(400, game.world.height - 325 + Math.random() * 30, 'place_unit', 2);
    exec_button.inputEnabled = false;
    game.time.events.add(6000, buttonReset, this, exec_button);
    exec.body.velocity.x = 200;
    exec.health = 1000;
    exec.attack = 20;
}

function tower_fire() {
    console.log('firing');
}

function deploy_truck() {
    console.log('truck sent');
    var e = truck.create(0, game.world.height - 500, 'truck_body');
    e.body.velocity.x = 500;
}

function deploy_matt() {
    console.log('matt deployed');
}

function deploy_horde() {
    console.log('horde deployed');
}
