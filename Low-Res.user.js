// ==UserScript==
// @name         Low-Res boxcritters
// @namespace    http://tampermonkey.net/
// @version      yes
// @description  yes blocky blur
// @author       SArpnt
// @match        https://boxcritters.com/play/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let old = window.onresize
    window.onresize = function(event) {
        old();
        let stage = document.getElementById('stage');

        stage.width = 100;
        stage.height = 200;

        world.stage.scaleX = stage.width/850;
        world.stage.scaleY = stage.height/480;
    };
    window.onresize();
    createjs.Ticker.framerate = 8
})();