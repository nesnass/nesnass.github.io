/**
 * Created by richardnesnass on 22/08/15.
 */
var stage = null;
var IMAGES = 'img/';

var collection = [
    {
        name: "flickering_bulb",
        assets: [
            {
                name: 'background',
                src: IMAGES+'1/background.png',
                image: null,
                x: 0,
                y: 0
            },
            {
                name: 'bulb',
                src: IMAGES+'1/bulb.png',
                image: null,
                x: 100,
                y: 100
            },
            {
                name: 'glow',
                src: IMAGES+'1/glow.png',
                image: null,
                x: 93,
                y: 112
            }
        ],
        run : function(ci) {
            var stepCounter = 0;
            var testStopCounter = 0;  // Only here for testing!
            var delay = 1;
            var light = false;

            var a = ci.assets[0];
            var background = new createjs.Bitmap(a.image).set({regY:0, regX:0, x: a.x, y: a.y});
            stage.addChild(background);

            var b = ci.assets[1];
            var bulb = new createjs.Bitmap(b.image).set({regY:0, regX:0, x: b.x, y: b.y});
            stage.addChild(bulb);
            bulb.scaleX = bulb.scaleY = 0.1;

            var c = ci.assets[2];
            var glow = new createjs.Bitmap(c.image).set({regY:0, regX:0, x: c.x, y: c.y});
            stage.addChild(glow);
            glow.scaleX = glow.scaleY = 0.1;

            //var tween = createjs.Tween.get(bird, {loop: true}).to({rotation: 360}, 6000);
            //createjs.Tween.get(glow, {loop: true}).to({guide:{ path:[0,0, 0,100, 100,200, 200,200, 200,100, 100,0, 0,0] }},7000);

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", tick);

            function tick(event) {
                // Bulb random flicker

                testStopCounter++;
                delay--;

                if(delay == 0) {
                    light = Math.floor(Math.random()*2) == 0;
                    delay = Math.floor(Math.random()*20)+1;
                    if(light)
                        createjs.Tween.get(glow).to({alpha: 1});
                    else
                        createjs.Tween.get(glow).to({alpha: 0});
                }

                //  Cancel run for testing only
                if(testStopCounter == 1000)
                    createjs.Ticker.removeEventListener("tick", tick);
                stage.update();
            }


        }
    }
]

createjs.MotionGuidePlugin.install();

// Randomly select a collection and load it's assets before starting animation
function init() {
    var ci = collection[Math.floor(Math.random() * collection.length)];
    var assetsLoaded = Array.apply(null, Array(ci.assets.length)).map(Boolean.prototype.valueOf, false);

    stage = new createjs.Stage("demoCanvas");

    ci.assets.forEach(function (a, i) {
        var image = new Image();
        image.src = a.src;
        a.image = image;
        image.onload = handleOnload(i);
    })

    function handleOnload(i) {
        assetsLoaded[i] = true;
        if (assetsLoaded.every(function (e) {
                return e
            })) {   // If all array values are true
            ci.run(ci);
        }
    }

}

//function run(assets, runFunction) {

    // Visualizing the line
    //bird.graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);

    /*
    createjs.Tween.get(circle, { loop: true })
        .to({ x: currentX })

    createjs.Tween.get(circle, { loop: true })
        .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
        .to({ alpha: 0, y: 225 }, 100)
        .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
        .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
*/

//}