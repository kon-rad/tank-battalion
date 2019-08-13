const KEY_DOWN = 'keydown';
const KEY_UP = 'keyup';
const keys = {
    up: { key: 'w', code: 87 },
    down: { key: 's', code: 83 },
    right: { key: 'd', code: 68 },
    left: { key: 'a', code: 65 },
    a: { key: ' ', code: 32 }
};

// Key down event creation
const upKeyDown = e => {
    e.preventDefault();
    let event = setEvent(KEY_DOWN, keys.up.key, keys.up.code);
    document.dispatchEvent(event);
};
const downKeyDown = e => {
    e.preventDefault();
    let event = setEvent(KEY_DOWN, keys.down.key, keys.down.code);
    document.dispatchEvent(event);
};
const rightKeyDown = e => {
    e.preventDefault();
    let event = setEvent(KEY_DOWN, keys.right.key, keys.right.code);
    document.dispatchEvent(event);
};
const leftKeyDown = e => {
    e.preventDefault();
    let event = setEvent(KEY_DOWN, keys.left.key, keys.left.code);
    document.dispatchEvent(event);
};
const buttonAKeyDown = e => {
    e.preventDefault();
    let event = setEvent(KEY_DOWN, keys.a.key, keys.a.code);
    document.dispatchEvent(event);
};

// Key up event creation
const upKeyUp = e => {
    e.preventDefault();
    let event = setEvent(KEY_UP, keys.up.key, keys.up.code);
    document.dispatchEvent(event);
};
const downKeyUp = e => {
    e.preventDefault();
    let event = setEvent(KEY_UP, keys.down.key, keys.down.code);
    document.dispatchEvent(event);
};
const rightKeyUp = e => {
    e.preventDefault();
    let event = setEvent(KEY_UP, keys.right.key, keys.right.code);
    document.dispatchEvent(event);
};
const leftKeyUp = e => {
    e.preventDefault();
    let event = setEvent(KEY_UP, keys.left.key, keys.left.code);
    document.dispatchEvent(event);
};
const buttonAKeyUp = e => {
    e.preventDefault();
    let event = setEvent(KEY_UP, keys.a.key, keys.a.code);
    document.dispatchEvent(event);
};

const setEvent = (action, key, code) => {
    let event = new Event(action);
    event.key = key;
    event.keyCode = code;
    event.which = event.keyCode;
    event.altKey = false;
    event.ctrlKey = true;
    event.shiftKey = false;
    event.metaKey = false;

    return event;
};

// Mobile controller button elements
const up = document.getElementsByClassName(
    'mobile_controller__d_pad_up'
)[0];
const down = document.getElementsByClassName(
    'mobile_controller__d_pad_down'
)[0];
const right = document.getElementsByClassName(
    'mobile_controller__d_pad_right'
)[0];
const left = document.getElementsByClassName(
    'mobile_controller__d_pad_left'
)[0];
const buttonA = document.getElementsByClassName(
    'mobile_controller__button_a'
)[0];

//listeners for mobile controller button presses and clicks
down.addEventListener('mousedown', downKeyDown, false);
right.addEventListener('mousedown', rightKeyDown, false);
left.addEventListener('mousedown', leftKeyDown, false);
up.addEventListener('mousedown', upKeyDown, false);

down.addEventListener('mouseup', downKeyUp, false);
right.addEventListener('mouseup', rightKeyUp, false);
left.addEventListener('mouseup', leftKeyUp, false);
up.addEventListener('mouseup', upKeyUp, false);

buttonA.addEventListener('mousedown', buttonAKeyDown, false);
buttonA.addEventListener('mouseup', buttonAKeyUp, false);

down.addEventListener('touchstart', downKeyDown, false);
right.addEventListener('touchstart', rightKeyDown, false);
left.addEventListener('touchstart', leftKeyDown, false);
up.addEventListener('touchstart', upKeyDown, false);

down.addEventListener('touchend', downKeyUp, false);
right.addEventListener('touchend', rightKeyUp, false);
left.addEventListener('touchend', leftKeyUp, false);
up.addEventListener('touchend', upKeyUp, false);

buttonA.addEventListener('touchstart', buttonAKeyDown, false);
buttonA.addEventListener('touchend', buttonAKeyUp, false);
