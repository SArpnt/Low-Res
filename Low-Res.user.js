// ==UserScript==
// @name         Low-Res boxcritters
// @description  yes blocky blur
// @author       SArpnt
// @version      very mmm gooodyes yes
// @namespace    https://boxcrittersmods.ga/authors/sarpnt/
// @homepage     https://boxcrittersmods.ga/mods/low-res/
// @updateURL    https://github.com/SArpnt/Low-Res/raw/master/Low-Res.user.js
// @downloadURL  https://github.com/SArpnt/Low-Res/raw/master/Low-Res.user.js
// @supportURL   https://github.com/SArpnt/Low-Res/issues
// @icon         https://github.com/SArpnt/Low-Res/raw/master/icon16.png
// @run-at       document-end
// @grant        none
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// ==/UserScript==

(function () {
	'use strict';
	let canvas = document.getElementById('stage');

	function fool(txt) {
		let youFool = document.createElement('span');
		youFool.innerText = txt;
		youFool.style.fontSize = '20pt';
		youFool.style.fontWeight = 'bold';
		youFool.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
		canvas.insertAdjacentElement('afterend', youFool);
		canvas.style.display = 'none';
	}

	function start() {
		if (!window.cardboard) actualStart();
		else if (world.stage.hUpdate)
			fool(`you fool
you blongus
you absolute utter kerplongus
you can't use low-res and hi-res at the same time`);
		else if (window.cardboard.mods && window.cardboard.mods.bigScreen)
			fool(`screen is too big
extra large pixel machine broke
understandable have a nice day`);
		else
			actualStart();
		function actualStart() {
			canvas.width = 100;
			canvas.height = 200;
			world.stage.scaleX = canvas.width / 855;
			world.stage.scaleY = canvas.height / 480;

			let resize = _ => canvas.style.height = canvas.offsetWidth / 855 * 480 + 'px';
			window.addEventListener('resize', resize);
			resize();

			createjs.Ticker.framerate = 8;
			createjs.Sound.on("fileload", function () {
				createjs.Sound.play("music", { loop: -1, volume: .9, delay: 5, });
				createjs.Sound.play("music", { loop: -1, volume: .8, delay: 80, });
				createjs.Sound.play("music", { loop: -1, volume: .6, delay: 160, });
				createjs.Sound.play("music", { loop: -1, volume: .4, delay: 240, });
				createjs.Sound.play("music", { loop: -1, volume: .6, delay: 480, });
			});
		}
	}

	if (canvas) {
		if (world && world.stage)
			start();
		else if (window.cardboard)
			window.cardboard.on('worldStageCreated', _ => setTimeout(start, 0));
		else
			fool(`what kind of backwards garbage mod setup has no
${world ? 'world.stage' : 'world'} on page load but doesn't use cardboard`);
	} else
		throw `Low-Res: what the everloving [redacted] is going on why is there no canvas element`;
})();