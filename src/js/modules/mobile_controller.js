'use strict';

define([], function() {

    // Key down event creation
    const upKeyDown = (e) => {
        e.preventDefault(); 
        let event = new Event("keydown");
        event.key="w";
        event.keyCode=87;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };
    const downKeyDown = (e) => {
        e.preventDefault(); 
        let event = new Event("keydown");
        event.key="s";
        event.keyCode=83;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };
    const rightKeyDown = (e) => {
        e.preventDefault(); 
        let event = new Event("keydown");
        event.key="d";
        event.keyCode=68;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };
    const leftKeyDown = (e) => {
        e.preventDefault(); 
        let event = new Event("keydown");
        event.key="a";
        event.keyCode=65;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };
    const buttonAKeyDown = (e) => {
        e.preventDefault(); 
        let event = new Event("keydown");
        event.key=" ";
        event.keyCode=32;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };

    // Key up event creation
    const upKeyUp = (e) => {
        e.preventDefault(); 
        let event = new Event("keyup");
        event.key="w";
        event.keyCode=87;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };
    const downKeyUp = (e) => {
        e.preventDefault(); 
        let event = new Event("keyup");
        event.key="s";
        event.keyCode=83;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };
    const rightKeyUp = (e) => {
        e.preventDefault(); 
        let event = new Event("keyup");
        event.key="d";
        event.keyCode=68;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };
    const leftKeyUp = (e) => {
        e.preventDefault(); 
        let event = new Event("keyup");
        event.key="a";
        event.keyCode=65;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };
    const buttonAKeyUp = (e) => {
        e.preventDefault(); 
        let event = new Event("keyup");
        event.key=" ";
        event.keyCode=32;
        event.which = event.keyCode;
        event.altKey = false;
        event.ctrlKey = true;
        event.shiftKey = false;
        event.metaKey = false;
        document.dispatchEvent(e);
    };

    // Mobile controller button elements
    const up = document.getElementsByClassName('mobile_controller__d_pad_up')[0];
    const down = document.getElementsByClassName('mobile_controller__d_pad_down')[0];
    const right = document.getElementsByClassName('mobile_controller__d_pad_right')[0];
    const left = document.getElementsByClassName('mobile_controller__d_pad_left')[0];
    const buttonA = document.getElementsByClassName('mobile_controller__button_a')[0];

    //listeners for mobile controller button presses and clicks
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