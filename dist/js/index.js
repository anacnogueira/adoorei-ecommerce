"use strict";

import ENVIROMENT from './env.js';
import Menu from './components/Menu.js';

const menu = null || document.querySelector('#menu_container');
menu.innerHTML = await Menu.render();

