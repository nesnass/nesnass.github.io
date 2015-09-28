/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var IMAGE_FOLDER = '../www/img/'; // Enable for testing on local machine
// var IMAGE_FOLDER = '../img/'; // Enable for Cordova use
var FADE_OUT_TIME = 1000;
var SCENE_RUN_TIME = 15000;
var DREAMING = true;  //  Are we in reality, or in the dream?
var DREAM_INDEX = 0
var REALITY_INDEX = 0

// Variables to set state of animation
var stage, loader, w, h;


// Function wrapping code.
// fn - reference to function.
// context - what you want "this" to be.
// params - array of parameters to pass to function.
var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}


var assets = [
    {
        id: 'blackground',
        src: 'black.png'
    },
    {   // Scene 1 - Empty room with flashing bulb
        id: 'room_dark',
        src: 'emptyroom/empty_room_dark.jpg'
    },
    {
        id: 'room_light',
        src: 'emptyroom/empty_room_light.jpg'
    },
    {
        id: 'bulb',
        src: 'emptyroom/bulb3.png'
    },
    {
        id: 'bulb_solid',
        src: 'space/bulb_solid.png'
    },
    {
        id: 'glow',
        src: 'emptyroom/glowbulb.png'
    },
    {   // Scene 2 - Room with pacing man
        id: 'main_room',
        src: 'pacingman/main_room2.jpg'
    },
    {
        id: 'man',
        src: 'pacingman/spritesheet2.png'
    },
    {
        id: 'speaker',
        src: 'pacingman/speaker2.png'
    },
    {
        id: 'main_room_bw',
        src: 'pacingman/main_room_sketch_bw.jpg'
    },
    {   // Scene - Smoking
        id: 'smoking_man',
        src: 'smoking/smoking_man2.png'
    },
    {
        id: 'smoke',
        src: 'smoking/smoke2.png'
    },
    {   // Scene - Space
        id: 'space_background',
        src: 'space/space_background2.png'
    },
    {
        id: 'alien',
        src: 'space/alien.png'
    },
    {
        id: 'bulb_wire',
        src: 'space/bulb2.png'
    },
    {
        id: 'glow_space',
        src: 'space/glow3.png'
    },
    {   // Scene - Forest
        id: 'swinging_bulb',
        src: 'forest/swinging_bulb4.png'
    },
    {
        id: 'background_forest',
        src: 'forest/forest.jpg'
    },
    {
        id: 'trees',
        src: 'forest/trees.png'
    },
    {   // Scene - Staring
        id: 'staring_man',
        src: 'staring/staring_man.png'
    }
];

var dreamScenes = [];
var realityScenes = [];


var runSpace = function(background_5, nova_5, bulb_5, glow_5, blackground) {
    var radius = 5;
    var alpha = 0.1;

    /*
    alien_5.x = 700;
    alien_5.y = 450;
    alien_5.scaleX = alien_5.scaleY = 0.01;
    alien_5.visible = true;
    */
    background_5.visible = true;
    nova_5.visible = true;
    bulb_5.visible = true;
    glow_5.visible = true;

    //createjs.Tween.get(alien_5).wait(800).to({scaleX:6, scaleY:6, x:-1800, y:-1800, regX:2000, regY:500}, 4000, createjs.Ease.getPowInOut(3));

    createjs.Ticker.addEventListener('tick', tick);
    createjs.Tween.get(blackground, {override: true}).to({alpha: 0}, FADE_OUT_TIME);

    setTimeout(function () {
        createjs.Tween.get(blackground, {override: true}).to({alpha: 1}, FADE_OUT_TIME).wait(FADE_OUT_TIME*2).call(cleanUp);
    }, SCENE_RUN_TIME);

    function cleanUp() {
        nova_5.graphics.clear();
        //alien_5.regX = alien_5.regY = 0;

        background_5.visible = bulb_5.visible = nova_5.visible = glow_5.visible = false;
        createjs.Ticker.removeEventListener('tick', tick);
        chooseScene();
    }
    function tick() {
        radius+=12;
        alpha === 1 ? alpha : alpha += 0.005;
        nova_5.graphics.clear().beginFill(createjs.Graphics.getRGB(255,255,100,alpha)).drawCircle(100,100,radius);
        stage.update();
    }

}

var runSmoking = function(background_4, smoke_4, man_4, bulb_solid, blackground) {

    background_4.visible = true;
    smoke_4.visible = true;
    bulb_solid.visible = true;
    var move = 100+Math.floor(Math.random()*600);
    man_4.x = move;
    smoke_4.x = move - 275;
    man_4.visible = true;
    man_4.addEventListener('animationend', startSmoke);

    function startSmoke() {
        man_4.stop();
        setTimeout(function() {
            smoke_4.play();
        }, 2000);
        setTimeout(function() {
            man_4.play();
        }, 7000);
    };

    smoke_4.addEventListener('animationend', stopSmoke);

    function stopSmoke() {
        smoke_4.stop();
    }

    createjs.Ticker.addEventListener('tick', tick);
    createjs.Tween.get(blackground, {override: true}).to({alpha: 0}, FADE_OUT_TIME);

    setTimeout(function () {
        createjs.Tween.get(blackground, {override: true}).to({alpha: 1}, FADE_OUT_TIME).wait(FADE_OUT_TIME*2).call(cleanUp);
    }, SCENE_RUN_TIME);

    function cleanUp() {
        background_4.visible = man_4.visible = smoke_4.visible = bulb_solid.visible = false;
        smoke_4.removeEventListener('animationend', stopSmoke);
        man_4.removeEventListener('animationend', startSmoke);
        createjs.Ticker.removeEventListener('tick', tick);
        chooseScene();
    }
    function tick() {
        stage.update();
    }
}

var runStaring = function(background_4, man_6, bulb_solid, blackground) {

    background_4.visible = true;
    man_6.visible = true;
    bulb_solid.visible = true;
    man_6.x = 100+Math.floor(Math.random()*600);

    createjs.Ticker.addEventListener('tick', tick);
    createjs.Tween.get(blackground, {override: true}).to({alpha: 0}, FADE_OUT_TIME);

    setTimeout(function () {
        createjs.Tween.get(blackground, {override: true}).to({alpha: 1}, FADE_OUT_TIME).wait(FADE_OUT_TIME*2).call(cleanUp);
    }, SCENE_RUN_TIME);

    function cleanUp() {
        background_4.visible = man_6.visible = bulb_solid.visible = false;
        createjs.Ticker.removeEventListener('tick', tick);
        chooseScene();
    }
    function tick() {
        stage.update();
    }
}

var runForest = function (background, bulb, trees, blackground) {

    background.visible = true;
    bulb.visible = true;
    trees.visible = true;

    //createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
    createjs.Ticker.addEventListener('tick', tick);
    createjs.Tween.get(blackground, {override: true}).to({alpha: 0}, FADE_OUT_TIME);

    setTimeout(function () {
        createjs.Tween.get(blackground, {override: true}).to({alpha: 1}, FADE_OUT_TIME).wait(FADE_OUT_TIME*2).call(cleanUp);
    }, SCENE_RUN_TIME);

    function cleanUp() {
        background.visible = bulb.visible = trees.visible = false;
        createjs.Ticker.removeEventListener('tick', tick);
        chooseScene();
    }
    function tick() {
        stage.update();
    }
}

var runEmptyRoom = function (background_dark, background_light, glow, blackground) {
    var delay = 1;
    var light = false;

    background_dark.visible = true;
    background_light.visible = false;
    glow.visible = false;

    //createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', tick_x);
    createjs.Tween.get(blackground, {override: true}).to({alpha: 0}, FADE_OUT_TIME);

    setTimeout(function () {
        createjs.Tween.get(blackground, {override: true}).to({alpha: 1}, FADE_OUT_TIME).wait(FADE_OUT_TIME*2).call(cleanUp);
    }, SCENE_RUN_TIME);

    function cleanUp() {
        background_dark.visible = background_light.visible = glow.visible = false;
        createjs.Ticker.removeEventListener('tick', tick_x);
        chooseScene();
    }
    function tick_x() {
        // Bulb random flicker
        delay--;

        if(delay === 0) {
            light = Math.floor(Math.random()*2) === 0;
            delay = Math.floor(Math.random()*20)+1;
            if(light) {
                background_dark.visible = false;
                background_light.visible = true;
                glow.visible = true;
            }
            else {
                background_dark.visible = true;
                background_light.visible = false;
                glow.visible = false;
            }
        }
        stage.update();
    }
}

var runEmptyRoom2 = function (background, speaker, bulb, glow, blackground) {
    background.visible = true;
    speaker.visible = true;
    glow.visible = true;
    bulb.visible = true;

    //createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', tick_x);
    createjs.Tween.get(blackground, {override: true}).to({alpha: 0}, FADE_OUT_TIME);

    setTimeout(function () {
        createjs.Tween.get(blackground, {override: true}).to({alpha: 1}, FADE_OUT_TIME).wait(FADE_OUT_TIME*2).call(cleanUp);
    }, SCENE_RUN_TIME);

    function cleanUp() {
        background.visible = speaker.visible = glow.visible = bulb.visible = false;
        createjs.Ticker.removeEventListener('tick', tick_x);
        chooseScene();
    }
    function tick_x() {
        stage.update();
    }
};

var runPacingMan = function (background, man, bulb_solid, blackground) {
    var reverse = false;
    var position = 100;
    var deltaS = 0;

    background.visible = true;
    man.visible = true;
    bulb_solid.visible = true;
    man.gotoAndPlay("turn_for_right");

    createjs.Tween.get(blackground, {override: true}).to({alpha: 0}, FADE_OUT_TIME);
    //createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', tick);

    setTimeout(function () {
        createjs.Tween.get(blackground, {override: true}).to({alpha: 1}, FADE_OUT_TIME).wait(FADE_OUT_TIME*2).call(cleanUp);
    }, SCENE_RUN_TIME);

    function cleanUp() {
        background.visible = man.visible = bulb_solid.visible = false;
        createjs.Ticker.removeEventListener('tick', tick);
        chooseScene();
    }

    function tick(event) {
        deltaS = event.delta / 1000;

     //   var position = reverse ? man.x - 150 * deltaS : man.x + 150 * deltaS;

        if(reverse) {
            position = man.x - deltaS * 150;
            if (position <= 100) {
                reverse = false;
                man.gotoAndPlay("turn_for_right");
            }
            else {
                man.x = position;
            }
        }
        else {
            position = man.x + deltaS * 150;
            if(position >= 700) {
                reverse = true;
                man.gotoAndPlay("turn_for_left");
            }
            else man.x = position;
        }

        stage.update();
    }
};

// Place all assets on the stage in correct order
function addAssetsToStage () {

    // Black background for fade out

    var a_0 = loader.getResult('blackground');
    var blackground = new createjs.Bitmap(a_0).set({regY: 0, regX: 0, x: 0, y: 0, alpha: 0});

    // 1 Pacing Man

    var b_0 = loader.getResult('bulb_solid');
    var bulb_solid = new createjs.Bitmap(b_0).set({regY:0, regX:0, x: 300, y: 0});
    bulb_solid.visible = false;

    var a_1 = loader.getResult('main_room_bw');
    var background_1 = new createjs.Bitmap(a_1).set({regY:0, regX:0, x: 0, y: 0});

    var spriteSheet_1 = new createjs.SpriteSheet({
        framerate: 5,
        "images": [loader.getResult('man')],
        "frames": {"regX": 0, "height": 629, "regY": 0, "width": 258},
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            "walk_left": [0, 14, "walk_left", 0.5],
            "walk_right": [21, 33, "walk_right", 0.5],
            "turn_for_right": [15, 20, "walk_right", 0.5],
            "turn_for_left": [34, 39, "walk_left", 0.5]
        }
    });
    var man_1 = new createjs.Sprite(spriteSheet_1, "run");
    man_1.y = 200; man_1.x = 200;
    man_1.scaleX = man_1.scaleY = 0.9;

    background_1.visible = man_1.visible = false;
    realityScenes.push(wrapFunction(runPacingMan, this, [background_1, man_1, bulb_solid, blackground]));


    // 2 Empty Room

    var a_2 = loader.getResult('room_dark');
    var background_2 = new createjs.Bitmap(a_2).set({regY:0, regX:0, x: 0, y: 0});
    var b_2 = loader.getResult('room_light');
    var background_2b = new createjs.Bitmap(b_2).set({regY:0, regX:0, x: 0, y: 0});

    var d_2 = loader.getResult('glow');
    var glow_2 = new createjs.Bitmap(d_2).set({regY:0, regX:0, x: 330, y: 385});

    background_2.visible = background_2b.visible = glow_2.visible = false;
    dreamScenes.push(wrapFunction(runEmptyRoom, this, [background_2, background_2b, glow_2, blackground]));


    // 3 Forest

    var spriteSheet_3 = new createjs.SpriteSheet({
        "images": [loader.getResult('swinging_bulb')],
        "frames": {"regX": 0, "height": 300, "regY": 0, "width": 254},
        "animations": {
            "run": [0, 32, "swing", 0.5]
        }
    });
    var bulb_3 = new createjs.Sprite(spriteSheet_3, "swing");
    bulb_3.y = 0; bulb_3.x = 200;

    var b_3 = loader.getResult('trees');
    var trees_3 = new createjs.Bitmap(b_3).set({regY:0, regX:0, x: 200, y: 0});

    var a_3 = loader.getResult('background_forest');
    var background_3 = new createjs.Bitmap(a_3).set({regY:0, regX:0, x: 0, y: 0});

    bulb_3.visible = background_3.visible = trees_3.visible = false;
    dreamScenes.push(wrapFunction(runForest, this, [background_3, bulb_3, trees_3, blackground]));


    // 4 Smoking man

    var spriteSheet_4 = new createjs.SpriteSheet({
        "images": [loader.getResult('smoking_man')],
        "frames": {"regX": 0, "height": 655, "regY": 0, "width": 192},
        "animations": {
            "man": [0, 15, null, 0.1]
        }
    });
    var man_4 = new createjs.Sprite(spriteSheet_4, "smoking_man");
    man_4.name = 'smoking_man';
    man_4.y = 175; man_4.x = 370;
    man_4.scaleX = man_4.scaleY = 0.9;

    var spriteSheet_4b = new createjs.SpriteSheet({
        "images": [loader.getResult('smoke')],
        "frames": {"regX": 0, "height": 83, "regY": 0, "width": 175},
        "animations": {
            "smoking": [0, 13, null, 0.1]
        }
    });
    var smoke_4 = new createjs.Sprite(spriteSheet_4b, "smoke");
    smoke_4.name = 'smoke';
    smoke_4.y = 80;
    smoke_4.scaleX = smoke_4.scaleY = 3;
    smoke_4.stop();

    var a_4 = loader.getResult('main_room_bw');
    var background_4 = new createjs.Bitmap(a_4).set({regY:0, regX:0, x: 0, y: 0});

    man_4.visible = smoke_4.visible = background_4.visible = false;
    realityScenes.push(wrapFunction(runSmoking, this, [background_4, smoke_4, man_4, bulb_solid, blackground]));


    // Space

    var a_5 = loader.getResult('bulb_wire');
    var bulb_5 = new createjs.Bitmap(a_5).set({regY:0, regX:0, x: 300, y: 0});
    //bulb.scaleX = bulb.scaleY = 0.3;

    var b_5 = loader.getResult('glow_space');
    var glow_5 = new createjs.Bitmap(b_5).set({regY:0, regX:0, x: 225, y: 150});
    //glow.scaleX = glow.scaleY = 0.3;

    //var c_5 = loader.getResult('alien');
    //var alien_5 = new createjs.Bitmap(c_5).set({regY:0, regX:0, x: 700, y: 450});
    //alien_5.scaleX = alien_5.scaleY = 0.01;

    var nova_5 = new createjs.Shape();
    //nova.graphics.beginFill(createjs.Graphics.getRGB(255,255,100,0)).drawCircle(100,100,radius);
    nova_5.x = 220;
    nova_5.y = 150;

    var d_5 = loader.getResult('space_background');
    var background_5 = new createjs.Bitmap(d_5).set({regY:0, regX:0, x: 0, y: 0});

    background_5.visible = bulb_5.visible = nova_5.visible = glow_5.visible = false;
    dreamScenes.push(wrapFunction(runSpace, this, [background_5, nova_5, bulb_5, glow_5, blackground]));

    // 2 Empty Room 2

    var a_2_2 = loader.getResult('main_room');
    var background_2_2 = new createjs.Bitmap(a_2_2).set({regY:0, regX:0, x: 0, y: 0});

    var d_2_2 = loader.getResult('speaker');
    var speaker = new createjs.Bitmap(d_2_2).set({regY:0, regX:0, x: 500, y: 250});
    speaker.scaleX = speaker.scaleY = 0.4;

    background_2_2.visible = speaker.visible = false;
    dreamScenes.push(wrapFunction(runEmptyRoom2, this, [background_2_2, speaker, bulb_5, glow_5, blackground]));

    // Staring man

    var a_6 = loader.getResult('staring_man');
    var man_6 = new createjs.Bitmap(a_6).set({regY:0, regX:0, x: 500, y: 100});
    man_6.scaleX = man_6.scaleY = 0.9;
    man_6.visible = false;

    realityScenes.push(wrapFunction(runStaring, this, [background_4, man_6, bulb_solid, blackground]));


    stage.addChild(background_1, man_1);
    stage.addChild(background_2, background_2b, glow_2);
    stage.addChild(background_2_2, speaker);
    stage.addChild(background_3, bulb_3, trees_3);
    stage.addChild(background_4, man_4, smoke_4);
    stage.addChild(background_5, nova_5, bulb_5, glow_5);
    stage.addChild(man_6, bulb_solid);
    stage.addChild(blackground);

    chooseScene();
}

// Randomly select a collection and load it's assets before starting animation
function init () {
    stage = new createjs.Stage("demoCanvas");
    stage.autoClear = false;
    //createjs.Ticker.setFPS(30);

    w = stage.canvas.width;
    h = stage.canvas.height;

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", addAssetsToStage);
    loader.loadManifest(assets, true, IMAGE_FOLDER);
}

function chooseScene () {
    //dreamScenes[2]();

    // Random selection:
/*
    if(DREAMING) {
        DREAMING = false;
        var index = Math.floor(Math.random() * realityScenes.length);
        realityScenes[index]();
    }
    else {
        DREAMING = true;
        var index = Math.floor(Math.random() * dreamScenes.length);
        dreamScenes[index]();
    }
  */


    // Sequential:


    if(REALITY_INDEX === realityScenes.length)
        REALITY_INDEX = 0;
    if(DREAM_INDEX === dreamScenes.length)
        DREAM_INDEX = 0;

    if(DREAMING) {
        DREAMING = false;
        realityScenes[REALITY_INDEX]();
        REALITY_INDEX++;
    }
    else {
        DREAMING = true;
        dreamScenes[DREAM_INDEX]();
        DREAM_INDEX++;
    }

}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        init(); // Remove this line when running Cordova
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //init();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

createjs.MotionGuidePlugin.install();
