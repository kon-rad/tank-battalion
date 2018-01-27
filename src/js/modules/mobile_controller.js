'use strict';

define(['game'], function(game) {
    // KEYDOWN EVENT CREATION    
    const upKeyDown = (e) => {
        e.preventDefault(); 
        var e = new Event("keydown");
        e.key="w";
        e.keyCode=87;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const downKeyDown = (e) => {
        e.preventDefault(); 
        var e = new Event("keydown");
        e.key="s";
        e.keyCode=83;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const rightKeyDown = (e) => {
        e.preventDefault(); 
        var e = new Event("keydown");
        e.key="d";
        e.keyCode=68;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const leftKeyDown = (e) => {
        e.preventDefault(); 
        var e = new Event("keydown");
        e.key="a";
        e.keyCode=65;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const buttonAKeyDown = (e) => {
        e.preventDefault(); 
        var e = new Event("keydown");
        e.key=" ";
        e.keyCode=32;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }

    // KEYUP EVENT CREATION    
    const upKeyUp = (e) => {
        e.preventDefault(); 
        var e = new Event("keyup");
        e.key="w";
        e.keyCode=87;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const downKeyUp = (e) => {
        e.preventDefault(); 
        var e = new Event("keyup");
        e.key="s";
        e.keyCode=83;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const rightKeyUp = (e) => {
        e.preventDefault(); 
        var e = new Event("keyup");
        e.key="d";
        e.keyCode=68;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const leftKeyUp = (e) => {
        e.preventDefault(); 
        var e = new Event("keyup");
        e.key="a";
        e.keyCode=65;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const buttonAKeyUp = (e) => {
        e.preventDefault(); 
        var e = new Event("keyup");
        e.key=" ";
        e.keyCode=32;
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        document.dispatchEvent(e);
    }
    const up = document.getElementsByClassName('mobile_controller__d_pad_up')[0];
    const down = document.getElementsByClassName('mobile_controller__d_pad_down')[0];
    const right = document.getElementsByClassName('mobile_controller__d_pad_right')[0];
    const left = document.getElementsByClassName('mobile_controller__d_pad_left')[0];
    const buttonA = document.getElementsByClassName('mobile_controller__button_a')[0];
    
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
});