var humans;
var humanHistory;
var apples;
var trucks;
var waterstorms;
var clouds;
var hoverPos;
var gameOver;
var gameOverReason;
var gameIntervals;
var cash;
var cashHistory;
var costs;
var costsTimer;
var mortalityTimer;
var mortalityFactor;
var points;
var pointsTimer;
var username;
var toplist;
var infectedCount;
var upgrades = {
    'apple': {
        'level': 1,
        'values': {
            1: 1,
            2: 2,
            3: 3,
        },
        'costs': {
            1: 100000,
            2: 250000,
            3: 500000,
        },
    },
    'vaccine': {
        'level': 1,
        'values': {
            1: 1,
            2: 2,
            3: 3,
        },
        'costs': {
            1: 100000,
            2: 250000,
            3: 500000,
        },
    },
    'waterstorm': {
        'level': 1,
        'values': {
            1: 0.5,
            2: 0.4,
            3: 0.3,
        },
        'costs': {
            1: 100000,
            2: 250000,
            3: 500000,
        },
    },
    'mask': {
        'level': 1,
        'values': {
            1: 1,
            2: 2,
            3: 3,
        },
        'costs': {
            1: 100000,
            2: 250000,
            3: 500000,
        },
    },
    'inflation': {
        'level': 1,
        'values': {
            1: 10000,
            2: 12000,
            3: 14000,
        },
        'costs': {
            1: 100000,
            2: 250000,
            3: 500000,
        },
    },
    'truck': {
        'level': 1,
        'values': {
            1: 4,
            2: 6,
            3: 8,
        },
        'costs': {
            1: 100000,
            2: 250000,
            3: 500000,
        },
    },
    'birth': {
        'level': 1,
        'values': {
            1: 1,
            2: 2,
            3: 3,
        },
        'costs': {
            1: 100000,
            2: 250000,
            3: 500000,
        },
    },
    'execute': {
        'level': 1,
        'values': {
            1: 1,
            2: 2,
            3: 3,
        },
        'costs': {
            1: 100000,
            2: 250000,
            3: 500000,
        },
    },
};

const apple_middle      = 270;
const vaccine_middle    = 270 + 68;
const waterstorm_middle = 270 + 68 + 68;
const mask_middle       = 270 + 68 + 68 + 68;
const inflation_middle  = 270 + 68 + 68 + 68 + 68;
const truck_middle      = 270 + 68 + 68 + 68 + 68 + 68;
const birth_middle      = 270 + 68 + 68 + 68 + 68 + 68 + 68;
const execute_middle    = 270 + 68 + 68 + 68 + 68 + 68 + 68 + 68;

function preload() {
    sidebar = createSprite(1024 - 80, 384);
    sidebar.addAnimation('base', 'assets/sidebar.png');

    username = 'anonymous-' + parseInt(random(1, 1000000));

    humans      = new Group();
    apples      = new Group();
    trucks      = new Group();
    clouds      = new Group();
    waterstorms = new Group();

    animation_human_base   = loadAnimation('assets/human-base-frame-01.png', 'assets/human-base-frame-02.png', 'assets/human-base-frame-03.png', 'assets/human-base-frame-04.png', 'assets/human-base-frame-05.png');
    animation_human_ill    = loadAnimation('assets/human-frame-01.png', 'assets/human-frame-02.png', 'assets/human-frame-03.png', 'assets/human-frame-04.png', 'assets/human-frame-05.png');
    animation_human_mask   = loadAnimation('assets/human-mask-frame-01.png', 'assets/human-mask-frame-02.png', 'assets/human-mask-frame-03.png', 'assets/human-mask-frame-04.png', 'assets/human-mask-frame-05.png');
    animation_human_immune = loadAnimation('assets/human-immune-frame-01.png', 'assets/human-immune-frame-02.png', 'assets/human-immune-frame-03.png', 'assets/human-immune-frame-04.png', 'assets/human-immune-frame-05.png');
    animation_human_blood  = loadAnimation('assets/human-blood-frame-01.png', 'assets/human-blood-frame-02.png', 'assets/human-blood-frame-03.png', 'assets/human-blood-frame-04.png', 'assets/human-blood-frame-05.png');
    animation_waterstorm   = loadAnimation('assets/flooding-0.png', 'assets/flooding-1.png', 'assets/flooding-2.png', 'assets/flooding-3.png');
    animation_apple        = loadAnimation('assets/apple-0.png', 'assets/apple-1.png', 'assets/apple-2.png', 'assets/apple-3.png', 'assets/apple-4.png');
    animation_vaccine      = loadAnimation('assets/vaccine-0.png', 'assets/vaccine-1.png', 'assets/vaccine-2.png', 'assets/vaccine-3.png');
    animation_mask         = loadAnimation('assets/mask-0.png', 'assets/mask-1.png', 'assets/mask-2.png', 'assets/mask-3.png', 'assets/mask-4.png', 'assets/mask-5.png');
    animation_inflation    = loadAnimation('assets/inflation-0.png', 'assets/inflation-1.png', 'assets/inflation-2.png', 'assets/inflation-3.png', 'assets/inflation-4.png', 'assets/inflation-5.png');
    animation_truck        = loadAnimation('assets/truck-0.png', 'assets/truck-1.png', 'assets/truck-2.png', 'assets/truck-3.png', 'assets/truck-4.png');
    animation_birth        = loadAnimation('assets/birth-0.png', 'assets/birth-1.png', 'assets/birth-2.png', 'assets/birth-3.png');
    animation_execute      = loadAnimation('assets/execute-0.png', 'assets/execute-1.png', 'assets/execute-2.png', 'assets/execute-3.png', 'assets/execute-4.png');
    animation_cloud        = loadAnimation('assets/cloud-0.png', 'assets/cloud-1.png', 'assets/cloud-2.png', 'assets/cloud-3.png', 'assets/cloud-4.png');
    animation_restart      = loadAnimation('assets/restart-0.png', 'assets/restart-1.png', 'assets/restart-2.png', 'assets/restart-3.png', 'assets/restart-4.png');
    animation_upgrade      = loadAnimation('assets/upgrade-0.png', 'assets/upgrade-1.png', 'assets/upgrade-2.png', 'assets/upgrade-3.png');

    soundFormats('mp3');
    sound_apple  = loadSound('sounds/apple.mp3');
    sound_gun    = loadSound('sounds/gun.mp3');
    sound_love   = loadSound('sounds/love.mp3');
    sound_mask   = loadSound('sounds/mask.mp3');
    sound_money  = loadSound('sounds/money.mp3');
    sound_needle = loadSound('sounds/needle.mp3');
    sound_truck  = loadSound('sounds/truck.mp3');
    sound_woosh  = loadSound('sounds/woosh.mp3');

    var volume = 0.1;
    sound_apple.setVolume(volume);
    sound_gun.setVolume(volume);
    sound_love.setVolume(volume);
    sound_mask.setVolume(volume);
    sound_money.setVolume(volume);
    sound_needle.setVolume(volume);
    sound_truck.setVolume(volume);
    sound_woosh.setVolume(volume);

    apple = createSprite(1024 - 80, apple_middle);
    apple.addAnimation('base', animation_apple);

    vaccine = createSprite(1024 - 80, vaccine_middle);
    vaccine.addAnimation('base', animation_vaccine);

    waterstorm = createSprite(1024 - 80, waterstorm_middle);
    waterstorm.addAnimation('base', animation_waterstorm);

    mask = createSprite(1024 - 80, mask_middle);
    mask.addAnimation('base', animation_mask);

    inflation = createSprite(1024 - 80, inflation_middle);
    inflation.addAnimation('base', animation_inflation);

    truck = createSprite(1024 - 80, truck_middle);
    truck.addAnimation('base', animation_truck);

    birth = createSprite(1024 - 80, birth_middle);
    birth.addAnimation('base', animation_birth);

    execute = createSprite(1024 - 80, execute_middle);
    execute.addAnimation('base', animation_execute);

    restart = createSprite(512, 432);
    restart.addAnimation('base', animation_restart);
    restart.visible = false;

    upgrade = createSprite(1,1);
    upgrade.addAnimation('base', animation_upgrade);
    upgrade.visible = false;

    gameStart();
}

function setup() {
    frameRate(60);
    createCanvas(1024, 768);
}

function draw() {
    if (gameOver) {
        background(0, 0, 0);

        push();
        fill(255, 204, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('GAME OVER', 512, 300);
        pop();

        push();
        fill(255, 204, 0);
        textSize(16);
        textAlign(CENTER, CENTER);
        text('Reason: ' + gameOverReason, 512, 332);
        pop();

        push();
        fill(153, 229, 80);
        textSize(24);
        textAlign(CENTER, CENTER);
        text(points + ' Points', 512, 382);
        pop();

        restart.visible = true;
        restart.display();
        restart.onMouseReleased = function() {
            if (!restart.visible) return;
            restart.visible = false;

            gameStart();
        };

        if (toplist) {
            push();
            fill(255, 204, 0);
            textSize(32);
            text('TOPLIST', 32, 64);
            pop();

            for (var i = 0; i < toplist.length; i++) {
                push();
                if ( toplist[i]['name'] == username ) {
                    fill(153, 229, 80);
                }
                else {
                    fill(360, 100, 100);
                }
                textSize(16);
                text((i + 1) + '. ' + toplist[i]['name'] + ' (' + toplist[i]['points'] + ' points)', 32, 96 + (32 * i));
                pop();
            }
        }

        if (cashHistory) {
            push();
            fill(255, 204, 0);
            textSize(32);
            text('CASH HISTORY', 700, 64);
            pop();

            for (var i = 0; i < cashHistory.length; i++) {
                push();
                fill(360, 100, 100);
                textSize(12);
                text(cashHistory[i], 700, 96 + (i * 16));
                pop();
            }
        }

        if (humanHistory) {
            push();
            fill(255, 204, 0);
            textSize(32);
            text('HUMAN HISTORY', 700, 564);
            pop();

            var i = 0;
            for (let [key, value] of Object.entries(humanHistory)) {
                push();
                fill(360, 100, 100);
                textSize(12);
                text(value + ' ' + key, 700, 596 + (i * 16));
                pop();

                i++;
            }
        }

        return;
    }

    if (waterstorms && waterstorms.length > 0) {
        background(0, 36, 255);
    }
    else if ( (clouds && clouds.length > 0) || (trucks && trucks.length > 0) ) {
        background(150, 150, 150, 50);
    }
    else {
        background(77, 91, 87);
    }

    humans.bounce(humans, function(spriteA, spriteB) {
        if ( parseInt(random(1, mortalityFactor)) != 3) {
            if ( spriteA.getAnimationLabel() != 'ill' && spriteB.getAnimationLabel() != 'ill' ) return;
            if ( parseInt(random(1, 31)) != 30 ) return;
        }

        infectHuman(spriteA);
        infectHuman(spriteB);
    });
    humans.collide(apples, function(spriteA, spriteB) {
        spriteB.remove();
        spriteA.vitamins = spriteA.vitamins || 0;
        spriteA.vitamins += 10;
    });
    humans.collide(trucks, function(spriteA, spriteB) {
        if ( parseInt(random(1, 101)) != 100) return;
        spriteA.truckHit = true;
        killHuman(spriteA, 'killed by truck collision');
    });

    var total_vitamins = 0;
    infectedCount = 0;
    for(var i = 0; i < humans.length; i++) {
        var sprite = humans[i];

        if ( sprite.getAnimationLabel() == 'ill' ) {
            infectedCount += 1;
        }

        if (sprite.vitamins) {
            total_vitamins += sprite.vitamins
        }

        if(sprite.position.x < sprite.width / 2 ) {
            sprite.position.x = sprite.width / 2;
            sprite.velocity.x = abs(sprite.velocity.x);
        }
        if(sprite.position.x > (width - 160) - (sprite.width / 2) ) {
            sprite.position.x = (width - 160) - (sprite.width / 2);
            sprite.velocity.x = -abs(sprite.velocity.x);
        }
        if(sprite.position.y < sprite.height / 2 ) {
            sprite.position.y = sprite.height / 2;
            sprite.velocity.y = abs(sprite.velocity.y);
        }
        if(sprite.position.y > height - (sprite.height / 2) ) {
            sprite.position.y = height - (sprite.height / 2);
            sprite.velocity.y = -abs(sprite.velocity.y);
        }
    }
    for(var i = 0; i < trucks.length; i++) {
        var sprite = trucks[i];
        if(sprite.position.x < (width - 160) - (sprite.width / 2) ) continue;

        sprite.remove();
    }

    drawSprites();

    if (hoverPos) {
        push();
        noStroke();
        fill(255, 204, 0, 150);
        rect(1024 - 154, hoverPos, 150, 57);
        pop();
    }

    push();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(humans.length + ' (' + infectedCount + ' inf.)', 940, 55);
    pop();

    push();
    textSize(32);
    textAlign(CENTER, CENTER);
    text(cash, 940, 130);
    pop();

    push();
    fill(360, 100, 100);
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('-' + costs, 940, 150);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    var mortality = max(1, parseInt((200 - mortalityFactor) / 200 * 100));
    text(mortality + ' % Mortality', 940, 180);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    var vitaminzed = parseInt((total_vitamins / (humans.length * 10 * 3)) * 100);
    text(vitaminzed + ' % Vitaminized', 940, 200);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(points + ' Points', 940, 220);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Vitamin C', 940, apple_middle - 25);
    text('Level ' + upgrades['apple']['level'], 995, apple_middle + 16);
    pop();

    drawUpgrade('apple', apple_middle);

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Vaccinate', 940, vaccine_middle - 25);
    text('Level ' + upgrades['vaccine']['level'], 995, vaccine_middle + 16);
    pop();

    drawUpgrade('vaccine', vaccine_middle);

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Water Storm', 940, waterstorm_middle - 25);
    text('Level ' + upgrades['waterstorm']['level'], 995, waterstorm_middle + 16);
    pop();

    drawUpgrade('waterstorm', waterstorm_middle);

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Mask Up!', 940, mask_middle - 25);
    text('Level ' + upgrades['mask']['level'], 995, mask_middle + 16);
    pop();

    drawUpgrade('mask', mask_middle);

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Print Mooney', 940, inflation_middle - 25);
    text('Level ' + upgrades['inflation']['level'], 995, inflation_middle + 16);
    pop();

    drawUpgrade('inflation', inflation_middle);

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Mortality Trucks', 940, truck_middle - 25);
    text('Level ' + upgrades['truck']['level'], 995, truck_middle + 15);
    pop();

    drawUpgrade('truck', truck_middle);

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Breed', 940, birth_middle - 25);
    text('Level ' + upgrades['birth']['level'], 995, birth_middle + 15);
    pop();

    drawUpgrade('birth', birth_middle);

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Execute sick', 940, execute_middle - 25);
    text('Level ' + upgrades['execute']['level'], 995, execute_middle + 15);
    pop();

    drawUpgrade('execute', execute_middle);
}

function mouseClicked(event) {
    if (gameOver) return;

    if (mouseX >= 1024 - 160 && mouseX <= 1024) {

        if (mouseY >= apple_middle - 34 && mouseY <= apple_middle + 34 ) {
            if (mouseX >= 1000 - 16 && checkUpgrade('apple') ) {
                doUpgrade('apple');
            }
            else {
                actionApple();
                hoverPos = apple_middle - 34;
            }
        }
        else if (mouseY >= vaccine_middle - 34 && mouseY <= vaccine_middle + 34 ) {
            if (mouseX >= 1000 - 16 && checkUpgrade('vaccine') ) {
                doUpgrade('vaccine');
            }
            else {
                actionVaccine();
                hoverPos = vaccine_middle - 35;
            }
        }
        else if (mouseY >= waterstorm_middle - 34 && mouseY <= waterstorm_middle + 34 ) {
            if (mouseX >= 1000 - 16 && checkUpgrade('waterstorm') ) {
                doUpgrade('waterstorm');
            }
            else {
                actionWaterstorm();
                hoverPos = waterstorm_middle - 35;
            }
        }
        else if (mouseY >= mask_middle - 34 && mouseY <= mask_middle + 34 ) {
            if (mouseX >= 1000 - 16 && checkUpgrade('mask') ) {
                doUpgrade('mask');
            }
            else {
                actionMask();
                hoverPos = mask_middle - 36;
            }
        }
        else if (mouseY >= inflation_middle - 34 && mouseY <= inflation_middle + 34 ) {
            if (mouseX >= 1000 - 16 && checkUpgrade('inflation') ) {
                doUpgrade('inflation');
            }
            else {
                actionInflation();
                hoverPos = inflation_middle - 37;
            }
        }
        else if (mouseY >= truck_middle - 34 && mouseY <= truck_middle + 34 ) {
            if (mouseX >= 1000 - 16 && checkUpgrade('truck') ) {
                doUpgrade('truck');
            }
            else {
                actionTruck();
                hoverPos = truck_middle - 38;
            }
        }
        else if (mouseY >= birth_middle - 34 && mouseY <= birth_middle + 34 ) {
            if (mouseX >= 1000 - 16 && checkUpgrade('birth') ) {
                doUpgrade('birth');
            }
            else {
                actionBirth();
                hoverPos = birth_middle - 38;
            }
        }
        else if (mouseY >= execute_middle - 34 && mouseY <= execute_middle + 34 ) {
            if (mouseX >= 1000 - 16 && checkUpgrade('execute') ) {
                doUpgrade('execute');
            }
            else {
                actionExecute();
                hoverPos = execute_middle - 38;
            }
        }

        setTimeout(function() {
            hoverPos = undefined;
        }, 50);
    }
}

function addHumans(count) {
    for (var i = 0; i < count; i++) {
        if ( humans.length >= 100 ) break;

        var human = createSprite(random(200, 800), random(200,600), 32, 32);
        human.addAnimation('base', animation_human_base);
        human.addAnimation('ill', animation_human_ill);
        human.addAnimation('mask', animation_human_mask);
        human.addAnimation('immune', animation_human_immune);

        human.setCollider('rectangle', 0, 0, 32, 32);
        human.setSpeed(random(2, 3), random(0, 360));

        humans.add(human)
    }

    return true;
}

function addApples(count) {
    for (var i = 0; i < count; i++) {
        var apple = createSprite(random(200, 800), random(200,600), 32, 32);
        apple.addAnimation('base', animation_apple);
        apples.add(apple)
    }

    return true;
}

function addTrucks() {
    var startY = 100;
    for (var i = 0; i < 3; i++) {
        var truck = createSprite(32, startY, 32, 32);
        truck.addAnimation('base', animation_truck);
        truck.velocity.x = 5;
        trucks.add(truck)

        startY += 250;
    }

    for (var i = 0; i < 15; i++) {
        var cloud = createSprite(random(50, 800), random(50,700), 32, 32);
        cloud.addAnimation('base', animation_cloud);
        clouds.add(cloud)
    }

    setTimeout(function() {
        for (var i = clouds.length - 1; i >= 0; i--) {
            clouds[i].remove();
        }
    }, 2000);

    return true;
}

function payCash(money, reason) {
    money = parseInt(money);

    cash -= money;

    cashHistory.unshift(cash + ' left after -' + money + ' for ' + reason);
    cashHistory = cashHistory.slice(0, 19);

    if (cash >= 0) return;

    gameStop('Out of cash');
}

function addCash(money) {
    cash += parseInt(money);
}

function vaccinateHuman(sprite, reason = undefined) {
    sprite.changeAnimation('immune');

    if (reason) {
        humanHistory[reason] = humanHistory[reason] || 0;
        humanHistory[reason] += 1;
    }

    setTimeout(function() {
        healHuman(sprite);
    }, 10000);
}
function maskHuman(sprite, reason = undefined) {
    sprite.changeAnimation('mask');

    if (reason) {
        humanHistory[reason] = humanHistory[reason] || 0;
        humanHistory[reason] += 1;
    }
}

function infectHuman(sprite, reason = undefined) {
    if ( sprite.getAnimationLabel() == 'ill' ) return;
    if ( sprite.getAnimationLabel() == 'immune' ) return;
    if ( sprite.getAnimationLabel() == 'mask' ) {
        sprite.changeAnimation('base');
        return;
    }

    if (reason) {
        humanHistory[reason] = humanHistory[reason] || 0;
        humanHistory[reason] += 1;
    }

    sprite.changeAnimation('ill');
    setTimeout(function() {
        killHuman(sprite, 'killed by infection');
    }, 5000);
}

function healHuman(sprite, reason = undefined) {
    sprite.changeAnimation('base');

    if (reason) {
        humanHistory[reason] = humanHistory[reason] || 0;
        humanHistory[reason] += 1;
    }
}

function killHuman(sprite, reason = undefined) {
    if (gameOver) return;

    if (!sprite.truckHit) {
        if ( sprite.getAnimationLabel() == 'base' ) return healHuman(sprite);
        if ( sprite.getAnimationLabel() == 'mask' ) return healHuman(sprite, 'saved by masks');
        if ( sprite.getAnimationLabel() == 'immune' ) return healHuman(sprite, 'saved by mask');

        if (sprite.vitamins && sprite.vitamins >= 30) {
            sprite.vitamins = 0;
            return healHuman(sprite, 'saved by vitamins');
        }
    }

    var blood = createSprite(sprite.position.x, sprite.position.y, 32, 32);
    blood.addAnimation('blood', animation_human_blood);
    sprite.remove();

    if (reason) {
        humanHistory[reason] = humanHistory[reason] || 0;
        humanHistory[reason] += 1;
    }

    setTimeout(function() {
        blood.remove();
    }, 500);

    if ( humans.length > 0 ) return;

    gameStop('All humans are dead.');
}

function actionApple() {
    addApples( actionValue('apple') );
    sound_apple.play();
}

function actionVaccine() {

    var count = 0;
    for (var i = 0; i < humans.length; i++) {
        var sprite = humans[i];
        if ( sprite.getAnimationLabel() == 'ill' ) continue;
        if ( sprite.getAnimationLabel() == 'mask' ) continue;
        if ( sprite.getAnimationLabel() == 'immune' ) continue;

        vaccinateHuman(sprite);
        count += 1;

        if ( count == actionValue('vaccine') ) break;
    }

    sound_needle.play();
}

function actionWaterstorm() {
    if (waterstorms && waterstorms.length > 0) return;

    for (var i = 0; i < 20; i++) {
        var storm = createSprite(random(100, 800), random(100,600), 32, 32);
        storm.addAnimation('base', animation_waterstorm);
        waterstorms.add(storm)

    }

    var healOrInfect = parseInt(random(0, 4));
    for(var i = 0; i < humans.length; i++) {
        var sprite = humans[i];

        if ( healOrInfect == 0 && sprite.getAnimationLabel() == 'ill' ) {
            healHuman(sprite, 'saved by waterstorm');
        }
        else if ( healOrInfect == 1 && sprite.getAnimationLabel() != 'ill' ) {
            infectHuman(sprite, 'infected by waterstorm');
        }
        else if ( healOrInfect == 2 && sprite.getAnimationLabel() == 'ill' ) {
            vaccinateHuman(sprite, 'vaccinated by waterstorm');
        }
        else if ( healOrInfect == 3 && sprite.getAnimationLabel() == 'ill' ) {
            maskHuman(sprite, 'masked by waterstorm');
        }
    }

    payCash( cash * actionValue('waterstorm'), 'Waterstorm');
    mortalityTimer = parseInt(mortalityTimer * 0.9);

    setTimeout(function() {
        for (var i = waterstorms.length - 1; i >= 0; i--) {
            waterstorms[i].remove();
        }
    }, 2000);

    sound_woosh.play();
}

function actionMask() {

    var count = 0;
    for (var i = 0; i < humans.length; i++) {
        var sprite = humans[i];
        if ( sprite.getAnimationLabel() == 'ill' ) continue;
        if ( sprite.getAnimationLabel() == 'mask' ) continue;
        if ( sprite.getAnimationLabel() == 'immune' ) continue;

        maskHuman(sprite);
        count += 1;

        if ( count == actionValue('mask') ) break;
    }
    sound_mask.play();
}

function actionInflation() {
    addCash( actionValue('inflation') );
    sound_money.play();
}

function actionTruck() {
    addTrucks(5);
    payCash( cash * 0.5, 'Truck');
    mortalityFactor += actionValue('truck');
    sound_truck.play();
}

function actionBirth() {
    addHumans( actionValue('birth') );
    sound_love.play();
}

function actionValue(action) {
    return upgrades[action]['values'][ upgrades[action]['level'] ];
}

function actionExecute() {

    var count = 0;
    for (var i = 0; i < humans.length; i++) {
        var sprite = humans[i];
        if ( sprite.getAnimationLabel() != 'ill' ) continue;

        killHuman(sprite, 'Execution');
        count += 1;

        if ( count == actionValue('execute') ) break;
    }
    sound_gun.play();
}

function payCosts() {
    if (gameOver) return;

    costs = ( 100 - humans.length ) * 1000 * (1 + parseInt((200 - mortalityFactor) / 200));
    payCash(costs, 'daily costs (interval ' + parseInt(costsTimer / 1000) + 's)');
}

function setMortality() {
    if (gameOver) return;

    var reduceBy = 4;
    if (mortalityFactor - reduceBy > reduceBy) {
        mortalityFactor -= reduceBy;
    }
}

function setPoints() {
    points += parseInt( 100 * (humans.length / 100) );
}

function gameStop(reason) {
    if (gameOver) return;

    for(var i = apples.length - 1; i >= 0; i--) {
        var sprite = apples[i];

        sprite.remove();
    }

    for(var i = clouds.length - 1; i >= 0; i--) {
        var sprite = clouds[i];

        sprite.remove();
    }

    for(var i = trucks.length - 1; i >= 0; i--) {
        var sprite = trucks[i];

        sprite.remove();
    }

    for(var i = waterstorms.length - 1; i >= 0; i--) {
        var sprite = waterstorms[i];

        sprite.remove();
    }

    for(var i = humans.length - 1; i >= 0; i--) {
        var sprite = humans[i];

        sprite.remove();
    }

    gameOver = true;
    for (var i = gameIntervals.length - 1; i >= 0; i--) {
        clearInterval(gameIntervals[i]);
    }
    gameIntervals = [];

    gameOverReason = reason;

    $.post("https://economy-keeper.bplaced.net/toplist.php", { name: username, points: points }, function( data ) {
        toplist = JSON.parse(data);
    });
}

function gameStart() {
    humanHistory    = {};
    gameOver        = false;
    gameIntervals   = [];
    cash            = 100000;
    cashHistory     = [];
    costs           = 0;
    costsTimer      = 3000;
    mortalityTimer  = 5000;
    mortalityFactor = 200;
    points          = 0;
    pointsTimer     = 1000;
    toplist         = undefined;
    infectedCount   = 0;
    gameOverReason  = undefined;

    addHumans(100);
    gameIntervals.push(setInterval(payCosts, costsTimer));
    gameIntervals.push(setInterval(setMortality, mortalityTimer));
    gameIntervals.push(setInterval(setPoints, pointsTimer));
}

function checkUpgrade(action) {
    upgradeLevel = upgrades[action]['level'] + 1;
    if ( !upgrades[action]['costs'][upgradeLevel] ) return;
    if ( cash < upgrades[action]['costs'][upgradeLevel] ) return;

    return true;
}

function drawUpgrade(action, posY) {
    if ( !checkUpgrade(action) ) return;

    upgrade.animation.draw(1000, posY - 8);
}

function doUpgrade(action) {
    upgradeLevel = upgrades[action]['level'] + 1;
    if ( !upgrades[action]['costs'][upgradeLevel] ) return;
    if ( cash < upgrades[action]['costs'][upgradeLevel] ) return;

    payCash(upgrades[action]['costs'][upgradeLevel], action + ' upgrade');
    upgrades[action]['level'] += 1;

    return true;
}