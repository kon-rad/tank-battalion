'use strict';

define(['game'], function (game) {
    // KEYDOWN EVENT CREATION    
    var upKeyDown = function upKeyDown(e) {
        e.preventDefault();
        var e = new Event("keydown");
        e.key = "w";
        e.keyCode = 87;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var downKeyDown = function downKeyDown(e) {
        e.preventDefault();
        var e = new Event("keydown");
        e.key = "s";
        e.keyCode = 83;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var rightKeyDown = function rightKeyDown(e) {
        e.preventDefault();
        var e = new Event("keydown");
        e.key = "d";
        e.keyCode = 68;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var leftKeyDown = function leftKeyDown(e) {
        e.preventDefault();
        var e = new Event("keydown");
        e.key = "a";
        e.keyCode = 65;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var buttonAKeyDown = function buttonAKeyDown(e) {
        e.preventDefault();
        var e = new Event("keydown");
        e.key = " ";
        e.keyCode = 32;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };

    // KEYUP EVENT CREATION    
    var upKeyUp = function upKeyUp(e) {
        e.preventDefault();
        var e = new Event("keyup");
        e.key = "w";
        e.keyCode = 87;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var downKeyUp = function downKeyUp(e) {
        e.preventDefault();
        var e = new Event("keyup");
        e.key = "s";
        e.keyCode = 83;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var rightKeyUp = function rightKeyUp(e) {
        e.preventDefault();
        var e = new Event("keyup");
        e.key = "d";
        e.keyCode = 68;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var leftKeyUp = function leftKeyUp(e) {
        e.preventDefault();
        var e = new Event("keyup");
        e.key = "a";
        e.keyCode = 65;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var buttonAKeyUp = function buttonAKeyUp(e) {
        e.preventDefault();
        var e = new Event("keyup");
        e.key = " ";
        e.keyCode = 32;
        e.which = e.keyCode;
        e.altKey = false;
        e.ctrlKey = true;
        e.shiftKey = false;
        e.metaKey = false;
        document.dispatchEvent(e);
    };
    var up = document.getElementsByClassName('mobile_controller__d_pad_up')[0];
    var down = document.getElementsByClassName('mobile_controller__d_pad_down')[0];
    var right = document.getElementsByClassName('mobile_controller__d_pad_right')[0];
    var left = document.getElementsByClassName('mobile_controller__d_pad_left')[0];
    var buttonA = document.getElementsByClassName('mobile_controller__button_a')[0];

    down.addEventListener("mousedown", downKeyDown, false);
    right.addEventListener("mousedown", rightKeyDown, false);
    left.addEventListener("mousedown", leftKeyDown, false);
    up.addEventListener("mousedown", upKeyDown, false);
    down.addEventListener("mouseup", downKeyUp, false);
    right.addEventListener("mouseup", rightKeyUp, false);
    left.addEventListener("mouseup", leftKeyUp, false);
    up.addEventListener("mouseup", upKeyUp, false);
    buttonA.addEventListener("mousedown", buttonAKeyDown, false);
    buttonA.addEventListener("mouseup", buttonAKeyUp, false);
    down.addEventListener("touchstart", downKeyDown, false);
    right.addEventListener("touchstart", rightKeyDown, false);
    left.addEventListener("touchstart", leftKeyDown, false);
    up.addEventListener("touchstart", upKeyDown, false);
    down.addEventListener("touchend", downKeyUp, false);
    right.addEventListener("touchend", rightKeyUp, false);
    left.addEventListener("touchend", leftKeyUp, false);
    up.addEventListener("touchend", upKeyUp, false);
    buttonA.addEventListener("touchstart", buttonAKeyDown, false);
    buttonA.addEventListener("touchend", buttonAKeyUp, false);
});