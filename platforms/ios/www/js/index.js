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

var stage, loader, w, h;

// Variables to set state of animation

var DREAMING = false;  //  Are we in reality, or in the dream?

var assets = [
    {   // Scene 1 - Empty room with flashing bulb
        id: 'room_dark',
        src: 'emptyroom/background1.jpg'
    },
    {
        id: 'room_light',
        src: 'emptyroom/background2.jpg'
    },
    {
        id: 'bulb',
        src: 'emptyroom/bulb.png'
    },
    {
        id: 'glow',
        src: 'emptyroom/glow2.png'
    },
    {   // Scene 2 - Room with pacing man
        id: 'bg_s2',
        src: 'pacingman/brainstorms.jpg'
    },
    {
        id: 'man',
        src: 'pacingman/spritesheet.png'
    },
    {   // Scene x - Space
        id: 'space_background',
        src: 'space/space_background.png'
    },
    {   // Scene - Forest
        id: 'swinging_bulb',
        src: 'forest/swinging_bulb2.png'
    },
    {
        id: 'background_forest',
        src: 'forest/background_forest.jpg'
    }
];

var dreamScenes = [
    {
        name: 'forest',
        run : function() {
            /* var a = loader.getResult('bg_s2');
            var background = new createjs.Bitmap(a).set({regY:0, regX:0, x: 0, y: 0});
            stage.addChild(background);
            */
            var spriteSheet = new createjs.SpriteSheet({
                "images": [loader.getResult('swinging_bulb')],
                "frames": {"regX": 0, "height": 590, "regY": 0, "width": 500},
                "animations": {
                    "run": [0, 32, "swing", 0.5]
                }
            });
            var bulb = new createjs.Sprite(spriteSheet, "swing");
            bulb.y = -10; bulb.x = 200;

            var a = loader.getResult('background_forest');
            var background = new createjs.Bitmap(a).set({regY:0, regX:0, x: 0, y: 0});

            stage.addChild(background, bulb);
            createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
            createjs.Ticker.addEventListener("tick", tick);

            function tick(event) {
                stage.update();
            }
        }
    },
    {
        name: 'space',
        run : function() {
            var radius = 5;
            var alpha = 0.1;
            var bg = loader.getResult('space_background');
            var background = new createjs.Bitmap(bg).set({regY:0, regX:0, x: 0, y: 0});

            var nova = new createjs.Shape();
            nova.graphics.beginFill(createjs.Graphics.getRGB(255,255,255,0)).drawCircle(100,100,radius);
            nova.x = nova.y = 200;

            stage.addChild(background, nova);
            //stage.update();

            //createjs.Tween.get(nova).to({scaleX:6, scaleY:6, x:500, y:500, regX:500, regY:375}, 1000, createjs.Ease.getPowInOut(2));
            createjs.Ticker.setFPS(30);
            createjs.Ticker.addEventListener("tick", tick);
            //stage.update();

            function tick(event) {
                radius+=12;
                alpha === 1 ? alpha : alpha += 0.005;
                nova.graphics.clear().beginFill(createjs.Graphics.getRGB(255,255,255,alpha)).drawCircle(100,100,radius);

                stage.update();
                if(radius >= 2500) {
                    createjs.Ticker.removeEventListener("tick", tick);
                }
            }
        }
    },
    {
        name: "city",
        run : function() {
            var iterations = 0;
            var a = loader.getResult('bulb');
            var bulb = new createjs.Bitmap(a).set({regY:0, regX:0, x: 500, y: 0});
            bulb.scaleX = bulb.scaleY = 0.3;

            var b = loader.getResult('glow');
            var glow = new createjs.Bitmap(b).set({regY:0, regX:0, x: 484, y: 23});
            glow.scaleX = glow.scaleY = 0.3;

            stage.addChild(bulb, glow);

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", tick);
            createjs.Tween.get(bulb).to({x:500, y:100}, 1000, createjs.Ease.bounceOut(0.4));
            function tick(event) {
                iterations++;
                stage.update();
                if(iterations === 100) {
                    createjs.Ticker.removeEventListener("tick", tick);
                }
            }
        }
    }
];

var realityScenes = [
    {
        name: "staring",
        run : function() {

        }
    },
    {
        name: "smoking",
        run : function() {

        }
    },
    {
        name: "pushups",
        run : function() {

        }
    },
    {
        name: "emptyroom",
        run : function() {
            var testStopCounter = 0;  // Only here for testing!
            var delay = 1;
            var light = false;

            var a1 = loader.getResult('room_dark');
            var background1 = new createjs.Bitmap(a1).set({regY:0, regX:0, x: 0, y: 0});
            var a2 = loader.getResult('room_light');
            var background2 = new createjs.Bitmap(a2).set({regY:0, regX:0, x: 0, y: 0});
            background1.visible = false;

            var b = loader.getResult('bulb');
            var bulb = new createjs.Bitmap(b).set({regY:0, regX:0, x: 500, y: 0});
            bulb.scaleX = bulb.scaleY = 0.3;

            var c = loader.getResult('glow');
            var glow = new createjs.Bitmap(c).set({regY:0, regX:0, x: 484, y: 23});
            glow.scaleX = glow.scaleY = 0.3;

            stage.addChild(background1, background2, bulb, glow);
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", tick);


            function tick(event) {
                // Bulb random flicker

                testStopCounter++;
                delay--;

                if(delay === 0) {
                    light = Math.floor(Math.random()*2) === 0;
                    delay = Math.floor(Math.random()*20)+1;
                    if(light) {
                        background1.visible = false;
                        background2.visible = true;
                        glow.visible = true;
                    }
                    else {
                        background1.visible = true;
                        background2.visible = false;
                        glow.visible = false;
                    }
                }

                //  Cancel run for testing only
                if(testStopCounter == 1000)
                    createjs.Ticker.removeEventListener("tick", tick);
                stage.update();
            }


        }
    },
    {
        name: "pacingman",
        run : function() {
            var a = loader.getResult('bg_s2');
            var background = new createjs.Bitmap(a).set({regY:0, regX:0, x: 0, y: 0});
            stage.addChild(background);

            var spriteSheet = new createjs.SpriteSheet({
                framerate: 2,
                "images": [loader.getResult('man')],
                "frames": {"regX": 0, "height": 800, "regY": 0, "width": 300},
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {
                    "run": [0, 5, "run", 0.1],
                    "jump": [26, 63, "run"]
                }
            });
            var man = new createjs.Sprite(spriteSheet, "run");
            var reverse = false;
            man.y = 35; man.x = 200;

            stage.addChild(background, man);
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", tick);

            function tick(event) {
                var deltaS = event.delta / 2000;
                var position = reverse ? man.x - 150 * deltaS : man.x + 150 * deltaS;

                if(reverse) {
                    if (position <= 200) {
                        man.scaleX = 1;
                        reverse = false;
                    }
                    else man.x = position;
                }
                else {
                    if(position >= 500) {
                        man.scaleX = -1;
                        reverse = true;
                    }
                    else man.x = position;
                }
                stage.update();
            }
        }
    }
];

// Randomly select a collection and load it's assets before starting animation
function init () {
    stage = new createjs.Stage("demoCanvas");
    w = stage.canvas.width;
    h = stage.canvas.height;

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", run);
    loader.loadManifest(assets, true, IMAGE_FOLDER);
}

function run () {
    if(DREAMING) {
        DREAMING = false;
        var index = 4; //Math.floor(Math.random() * realityScenes.length);
        realityScenes[index].run();
    }
    else {
        DREAMING = true;
        var index = 0; //Math.floor(Math.random() * dreamScenes.length);
        dreamScenes[index].run();
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
