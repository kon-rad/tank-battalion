'use strict';

console.log('index', document, window);
debugger;
import 'modules/audio';
import setup from './setup';
import 'modules/mobile_controller';
import '../stylesheets/main.scss';

setup.control();
