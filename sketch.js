var humans;
var apples;
var trucks;
var waterstorms;
var clouds;
var hoverPos;
var cash              = 100000;
var infection_factor  = 200;
var apple_middle      = 270;
var vaccine_middle    = 270 + 68;
var waterstorm_middle = 270 + 68 + 68;
var mask_middle       = 270 + 68 + 68 + 68;
var inflation_middle  = 270 + 68 + 68 + 68 + 68;
var truck_middle      = 270 + 68 + 68 + 68 + 68 + 68;
var birth_middle      = 270 + 68 + 68 + 68 + 68 + 68 + 68;
var execute_middle    = 270 + 68 + 68 + 68 + 68 + 68 + 68 + 68;

function preload() {
    sidebar = createSprite(1024 - 80, 384);
    sidebar.addAnimation('base', 'assets/sidebar.png');

    humans                 = new Group();
    apples                 = new Group();
    trucks                 = new Group();
    clouds                 = new Group();
    animation_human_base   = loadAnimation('assets/human-base-frame-01.png', 'assets/human-base-frame-02.png', 'assets/human-base-frame-03.png', 'assets/human-base-frame-04.png', 'assets/human-base-frame-05.png');
    animation_human_ill    = loadAnimation('assets/human-frame-01.png', 'assets/human-frame-02.png', 'assets/human-frame-03.png', 'assets/human-frame-04.png', 'assets/human-frame-05.png');
    animation_human_mask   = loadAnimation('assets/human-mask-frame-01.png', 'assets/human-mask-frame-02.png', 'assets/human-mask-frame-03.png', 'assets/human-mask-frame-04.png', 'assets/human-mask-frame-05.png');
    animation_human_immune = loadAnimation('assets/human-immune-frame-01.png', 'assets/human-immune-frame-02.png', 'assets/human-immune-frame-03.png', 'assets/human-immune-frame-04.png', 'assets/human-immune-frame-05.png');
    animation_waterstorm   = loadAnimation('assets/flooding-0.png', 'assets/flooding-1.png', 'assets/flooding-2.png', 'assets/flooding-3.png');
    animation_apple        = loadAnimation('assets/apple-0.png', 'assets/apple-1.png', 'assets/apple-2.png', 'assets/apple-3.png', 'assets/apple-4.png');
    animation_vaccine      = loadAnimation('assets/vaccine-0.png', 'assets/vaccine-1.png', 'assets/vaccine-2.png', 'assets/vaccine-3.png');
    animation_mask         = loadAnimation('assets/mask-0.png', 'assets/mask-1.png', 'assets/mask-2.png', 'assets/mask-3.png', 'assets/mask-4.png', 'assets/mask-5.png');
    animation_inflation    = loadAnimation('assets/inflation-0.png', 'assets/inflation-1.png', 'assets/inflation-2.png', 'assets/inflation-3.png', 'assets/inflation-4.png', 'assets/inflation-5.png');
    animation_truck        = loadAnimation('assets/truck-0.png', 'assets/truck-1.png', 'assets/truck-2.png', 'assets/truck-3.png', 'assets/truck-4.png');
    animation_birth        = loadAnimation('assets/birth-0.png', 'assets/birth-1.png', 'assets/birth-2.png', 'assets/birth-3.png');
    animation_execute      = loadAnimation('assets/execute-0.png', 'assets/execute-1.png', 'assets/execute-2.png', 'assets/execute-3.png', 'assets/execute-4.png');
    animation_cloud        = loadAnimation('assets/cloud-0.png', 'assets/cloud-1.png', 'assets/cloud-2.png', 'assets/cloud-3.png', 'assets/cloud-4.png');
    addHumans(100);

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
}

function setup() {
  createCanvas(1024, 768);
}

function draw() {
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
        if ( parseInt(random(1, infection_factor)) != 3) {
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
        killHuman(spriteA);
    });

    for(var i = 0; i < humans.length; i++) {
        var sprite = humans[i];

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
    text(humans.length, 940, 55);
    pop();

    push();
    textSize(32);
    textAlign(CENTER, CENTER);
    text(cash, 940, 135);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Vitamin C', 940, apple_middle - 25);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Vaccinate', 940, vaccine_middle - 25);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Water Storm', 940, waterstorm_middle - 25);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Mask Up!', 940, mask_middle - 25);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Print Mooney', 940, inflation_middle - 25);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Desinfection Trucks', 940, truck_middle - 25);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Breed', 940, birth_middle - 25);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Execute sick', 940, execute_middle - 25);
    pop();
}

function mouseClicked() {
    if (mouseX >= 1024 - 160 && mouseX <= 1024) {

        if (mouseY >= apple_middle - 34 && mouseY <= apple_middle + 34 ) {
            actionApple();
            hoverPos = apple_middle - 34;
        }
        else if (mouseY >= vaccine_middle - 34 && mouseY <= vaccine_middle + 34 ) {
            actionVaccine();
            hoverPos = vaccine_middle - 35;
        }
        else if (mouseY >= waterstorm_middle - 34 && mouseY <= waterstorm_middle + 34 ) {
            actionWaterstorm();
            hoverPos = waterstorm_middle - 35;
        }
        else if (mouseY >= mask_middle - 34 && mouseY <= mask_middle + 34 ) {
            actionMask();
            hoverPos = mask_middle - 36;
        }
        else if (mouseY >= inflation_middle - 34 && mouseY <= inflation_middle + 34 ) {
            actionInflation();
            hoverPos = inflation_middle - 37;
        }
        else if (mouseY >= truck_middle - 34 && mouseY <= truck_middle + 34 ) {
            actionTruck();
            hoverPos = truck_middle - 38;
        }
        else if (mouseY >= birth_middle - 34 && mouseY <= birth_middle + 34 ) {
            actionBirth();
            hoverPos = birth_middle - 38;
        }
        else if (mouseY >= execute_middle - 34 && mouseY <= execute_middle + 34 ) {
            actionExecute();
            hoverPos = execute_middle - 38;
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

function addCash(money) {
    cash += money;
}

function vaccinateHuman(sprite) {
    sprite.changeAnimation('immune');
}
function maskHuman(sprite) {
    sprite.changeAnimation('mask');
}

function infectHuman(sprite) {
    if ( sprite.getAnimationLabel() == 'ill' ) return;
    if ( sprite.getAnimationLabel() == 'immune' ) return;
    if ( sprite.getAnimationLabel() == 'mask' ) {
        sprite.changeAnimation('base');
        console.log('fix');
        return;
    }

    sprite.changeAnimation('ill');
    setTimeout(function() {
        killHuman(sprite);
    }, 5000);
}

function healHuman(sprite) {
    sprite.changeAnimation('base');
}

function killHuman(sprite) {
    if (!sprite.truckHit) {
        if ( sprite.getAnimationLabel() == 'base' ) return healHuman(sprite);

        if (sprite.vitamins && sprite.vitamins >= 30) {
            sprite.vitamins = 0;
            return healHuman(sprite);
        }
    }

    sprite.remove();
}

function actionApple() {
    console.log('clicked apple');
    addApples(1);
}

function actionVaccine() {
    console.log('clicked vaccine');
    for (var i = 0; i < humans.length; i++) {
        var sprite = humans[i];
        if ( sprite.getAnimationLabel() == 'ill' ) continue;
        if ( sprite.getAnimationLabel() == 'mask' ) continue;
        if ( sprite.getAnimationLabel() == 'immune' ) continue;

        vaccinateHuman(sprite);

        setTimeout(function() {
            healHuman(sprite);
        }, 10000);

        break;
    }
}

function actionWaterstorm() {
    if (waterstorms && waterstorms.length > 0) return;
    console.log('clicked waterstorm');

    waterstorms = new Group();
    for (var i = 0; i < 20; i++) {
        var storm = createSprite(random(100, 800), random(100,600), 32, 32);
        storm.addAnimation('base', animation_waterstorm);
        waterstorms.add(storm)

    }

    var healOrInfect = parseInt(random(0, 2)) == 1 ? true : false;
    for(var i = 0; i < humans.length; i++) {
        var sprite = humans[i];

        if ( healOrInfect == true && sprite.getAnimationLabel() == 'ill' ) {
            healHuman(sprite);
        }
        else if ( healOrInfect == false && sprite.getAnimationLabel() != 'ill' ) {
            infectHuman(sprite);
        }
    }

    setTimeout(function() {
        for (var i = waterstorms.length - 1; i >= 0; i--) {
            waterstorms[i].remove();
        }
    }, 2000);
}

function actionMask() {
    console.log('clicked mask');
    for (var i = 0; i < humans.length; i++) {
        var sprite = humans[i];
        if ( sprite.getAnimationLabel() == 'ill' ) continue;
        if ( sprite.getAnimationLabel() == 'mask' ) continue;
        if ( sprite.getAnimationLabel() == 'immune' ) continue;

        maskHuman(sprite);

        break;
    }
}

function actionInflation() {
    console.log('clicked inflation');
    addCash(10000);
}

function actionTruck() {
    console.log('clicked truck');
    addTrucks(5);
}

function actionBirth() {
    console.log('clicked birth');
    addHumans(1);
}

function actionExecute() {
    console.log('clicked execute');
    for (var i = 0; i < humans.length; i++) {
        var sprite = humans[i];
        if ( sprite.getAnimationLabel() != 'ill' ) continue;

        killHuman(sprite);

        break;
    }
}
