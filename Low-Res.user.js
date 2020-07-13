// ==UserScript==
// @name         Low-Res boxcritters
// @namespace    http://tampermonkey.net/
// @version      very yes
// @description  yes blocky blur
// @run-at       document-end
// @author       SArpnt
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';
	let canvas = document.getElementById('stage');

	function fool(txt) {
		let youFool = document.createElement('span');
		youFool.innerText = txt;
		canvas.insertAdjacentElement('afterend', youFool);
		canvas.style.display = 'none';
	}

	function start() {
		if (world.stage.hUpdate)
			fool(`you fool
you blongus
you absolute utter kerplongus
you can't use low-res and hi-res at the same time`);
		else {
			let resize = function () {
				canvas.width = 100;
				canvas.height = 200;

				world.stage.scaleX = canvas.width / 855;
				world.stage.scaleY = canvas.height / 480;

				canvas.style.height = canvas.offsetWidth / 855 * 480 + 'px';
			};
			window.addEventListener('resize', resize);
			createjs.Ticker.framerate = 8;
			resize();
		}
	}

	if (canvas) {
		if (world && world.stage)
			start();
		else if (cardboard)
			cardboard.on('worldStageCreated', _ => setTimeout(start, 0));
		else
			fool(`what kind of backwards garbage mod setup has no
${world ? 'world.stage' : 'world'} on page load but doesn't use cardboard`);
	} else
		throw `Low-Res: what the everloving [redacted] is going on why is there no canvas element`;
})();