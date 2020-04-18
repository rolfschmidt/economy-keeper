var humans;
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

    humans               = new Group();
    animation_human_base = loadAnimation('assets/human-base-frame-01.png', 'assets/human-base-frame-02.png', 'assets/human-base-frame-03.png', 'assets/human-base-frame-04.png', 'assets/human-base-frame-05.png');
    animation_human_ill  = loadAnimation('assets/human-frame-01.png', 'assets/human-frame-02.png', 'assets/human-frame-03.png', 'assets/human-frame-04.png', 'assets/human-frame-05.png');
    addHumans(100);

    apple = createSprite(1024 - 80, apple_middle);
    apple.addAnimation('base', 'assets/apple-0.png', 'assets/apple-1.png', 'assets/apple-2.png', 'assets/apple-3.png', 'assets/apple-4.png');

    vaccine = createSprite(1024 - 80, vaccine_middle);
    vaccine.addAnimation('base', 'assets/vaccine-0.png', 'assets/vaccine-1.png', 'assets/vaccine-2.png', 'assets/vaccine-3.png');

    waterstorm = createSprite(1024 - 80, waterstorm_middle);
    waterstorm.addAnimation('base', 'assets/flooding-0.png', 'assets/flooding-1.png', 'assets/flooding-2.png', 'assets/flooding-3.png');

    mask = createSprite(1024 - 80, mask_middle);
    mask.addAnimation('base', 'assets/mask-0.png', 'assets/mask-1.png', 'assets/mask-2.png', 'assets/mask-3.png', 'assets/mask-4.png', 'assets/mask-5.png');

    inflation = createSprite(1024 - 80, inflation_middle);
    inflation.addAnimation('base', 'assets/inflation-0.png', 'assets/inflation-1.png', 'assets/inflation-2.png', 'assets/inflation-3.png', 'assets/inflation-4.png', 'assets/inflation-5.png');

    truck = createSprite(1024 - 80, truck_middle);
    truck.addAnimation('base', 'assets/truck-0.png', 'assets/truck-1.png', 'assets/truck-2.png', 'assets/truck-3.png', 'assets/truck-4.png');

    birth = createSprite(1024 - 80, birth_middle);
    birth.addAnimation('base', 'assets/birth-0.png', 'assets/birth-1.png', 'assets/birth-2.png', 'assets/birth-3.png');

    execute = createSprite(1024 - 80, execute_middle);
    execute.addAnimation('base', 'assets/execute-0.png', 'assets/execute-1.png', 'assets/execute-2.png', 'assets/execute-3.png', 'assets/execute-4.png');
}

function setup() {
  createCanvas(1024, 768);
}

function draw() {
    background(77, 91, 87);

    //humans bounce against each others and against boxes
    humans.bounce(humans, function(spriteA, spriteB) {

        // make ill
        if ( parseInt(random(1, infection_factor)) == 3) {
            spriteA.changeAnimation('ill');
            spriteB.changeAnimation('ill');
            setTimeout(function() {
                killHuman(spriteA);
                killHuman(spriteB);
            }, 5000);
        }
    });

    //all sprites bounce at the screen edges
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

    drawSprites();

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
    text('100 Vaccines', 940, vaccine_middle - 25);
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
    text('100 Face Masks', 940, mask_middle - 25);
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
    text('100 Ban Birth Control', 940, birth_middle - 25);
    pop();

    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('100 Execute sick', 940, execute_middle - 25);
    pop();


    // push();
    // textSize(12);
    // textAlign(CENTER, CENTER);
    // textStyle(BOLD);
    // text('Vaccines', 940, 345);
    // fill(0, 102, 153);
    // pop();

}

function mouseClicked() {
    if (mouseX >= 1024 - 160) {

        if (mouseY >= apple_middle - 34 && mouseY <= apple_middle + 34 ) {
            actionApple();
        }
        else if (mouseY >= vaccine_middle - 34 && mouseY <= vaccine_middle + 34 ) {
            actionVaccine();
        }
        else if (mouseY >= waterstorm_middle - 34 && mouseY <= waterstorm_middle + 34 ) {
            actionWaterstorm();
        }
        else if (mouseY >= mask_middle - 34 && mouseY <= mask_middle + 34 ) {
            actionMask();
        }
        else if (mouseY >= inflation_middle - 34 && mouseY <= inflation_middle + 34 ) {
            actionInflation();
        }
        else if (mouseY >= truck_middle - 34 && mouseY <= truck_middle + 34 ) {
            actionTruck();
        }
        else if (mouseY >= birth_middle - 34 && mouseY <= birth_middle + 34 ) {
            actionBirth();
        }
        else if (mouseY >= execute_middle - 34 && mouseY <= execute_middle + 34 ) {
            actionExecute();
        }
    }
}

function addHumans(count) {
    //if ( humans.length > 100 ) return;

    for (var i = 0; i < count; i++) {
        var human = createSprite(random(200, 800), random(200,600), 32, 32);
        human.addAnimation('base', animation_human_base);
        human.addAnimation('ill', animation_human_ill);

        human.setCollider('rectangle', 0, 0, 32, 32);
        human.setSpeed(random(2, 3), random(0, 360));

        humans.add(human)
    }

    return true;
}

function killHuman(sprite) {
    sprite.remove();
}

function actionApple() {
    console.log('clicked apple');
}

function actionVaccine() {
    console.log('clicked vaccine');
}

function actionWaterstorm() {
    console.log('clicked waterstorm');
}

function actionMask() {
    console.log('clicked mask');
}

function actionInflation() {
    console.log('clicked inflation');
}

function actionTruck() {
    console.log('clicked truck');
}

function actionBirth() {
    console.log('clicked birth');
    addHumans(1);
}

function actionExecute() {
    console.log('clicked execute');
}
