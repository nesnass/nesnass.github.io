// Internal variables
var menuActive = false;
var divRefOpen = "";

// Page elements
var $menuContent;
var $root;
var $a;

function anchorClick(href) {
    // var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
}

function playVideo(href) {
    var theVideo = $(href).get(0);
    if (theVideo.paused)
        theVideo.play();
    else
        theVideo.pause();
}

$(document).ready(function() {
    setup();
});

function flipPanel(ref) {
    $(ref).slideToggle("slow");
    if(ref == "#panel1") {
        $('#panel1 img').attr("src", "img/2.1.jpg");
    }
}

function setup() {
    $menuContent = $("#menuContent");
    $root = $('html, body');
    $a = $('a');
}

function toggleMenu() {
    if(menuActive) {
        $menuContent.removeClass("menuActive");
        menuActive = false;
    }
    else {
        $menuContent.addClass("menuActive");
        menuActive = true;
    }
}