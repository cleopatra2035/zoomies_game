/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Background; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONSTANTS = {
  PLANT_SPEED: 2,
  GAP_HEIGHT: 150,
  PLANT_WIDTH: 50,
  EDGE_BUFFER: 50,
  PLANT_SPACING: 220,
  WARM_UP_SECONDS: 1,
  SCENE_WIDTH: 800,
  SCENE_HEIGHT: 300
};

var Background = /*#__PURE__*/function () {
  function Background(dimensions, ctx, image, posY, imageWidth, speed) {
    _classCallCheck(this, Background);

    this.dimensions = dimensions;
    this.image = image;
    this.ctx = ctx;
    this.x = 0;
    this.y = posY;
    this.imageWidth = imageWidth;
    this.speed = speed;
    var firstPlantDistance = this.dimensions.width + CONSTANTS.WARM_UP_SECONDS * 1 * CONSTANTS.PLANT_SPEED;
    this.plants = [this.randomPlant(firstPlantDistance), this.randomPlant(firstPlantDistance + CONSTANTS.PLANT_SPACING), this.randomPlant(firstPlantDistance + CONSTANTS.PLANT_SPACING * 2), this.randomPlant(firstPlantDistance + CONSTANTS.PLANT_SPACING * 3)];
  }

  _createClass(Background, [{
    key: "randomPlant",
    value: function randomPlant(x) {
      var heightRange = this.dimensions.height - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_HEIGHT;
      var gapTop = Math.random() * heightRange + CONSTANTS.EDGE_BUFFER;
      var plant = {
        topPlant: {
          left: x,
          right: CONSTANTS.PLANT_WIDTH + x,
          top: 0,
          bottom: gapTop
        },
        bottomPlant: {
          left: x,
          right: CONSTANTS.PLANT_WIDTH + x,
          top: gapTop + CONSTANTS.GAP_HEIGHT,
          bottom: this.dimensions.height
        },
        passed: false
      };
      return plant;
    }
  }, {
    key: "animate",
    value: function animate(ctx) {
      this.drawBackground(ctx);
      this.movePlants();
      this.drawPlants(ctx);
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(ctx) {
      ctx.clearRect(0, 0, 800, 300);
      this.ctx.drawImage(this.image, this.x, this.y);
      this.ctx.drawImage(this.image, this.x + this.imageWidth, this.y);

      if (this.imageWidth < 800) {
        this.ctx.drawImage(this.image, this.x + this.imageWidth * 2, this.y);
      }

      if (this.x <= -this.imageWidth) {
        this.x = 0;
      }

      this.scrollImage();
    }
  }, {
    key: "scrollImage",
    value: function scrollImage() {
      this.x -= this.speed;
    }
  }, {
    key: "passedPlant",
    value: function passedPlant(player, callback) {
      this.eachPlant(function (plant) {
        if (plant.bottomPlant.right < player.left) {
          if (!plant.passed) {
            plant.passed = true;
            callback();
          }
        }
      });
    }
  }, {
    key: "movePlants",
    value: function movePlants() {
      this.eachPlant(function (plant) {
        plant.bottomPlant.left -= CONSTANTS.PLANT_SPEED;
        plant.bottomPlant.right -= CONSTANTS.PLANT_SPEED;
      });

      if (this.plants[0].bottomPlant.right <= 0) {
        this.plants.shift();
        var newX = this.plants[1].bottomPlant.left + CONSTANTS.PLANT_SPACING;
        this.plants.push(this.randomPlant(newX));
      }
    }
  }, {
    key: "drawPlants",
    value: function drawPlants(ctx) {
      this.eachPlant(function (plant) {
        ctx.fillStyle = 'rgba(255, 2, 95, 0.7)';
        ctx.fillRect(plant.bottomPlant.left, plant.bottomPlant.top, CONSTANTS.PLANT_WIDTH, plant.bottomPlant.bottom - plant.bottomPlant.top);
      });
    }
  }, {
    key: "eachPlant",
    value: function eachPlant(callback) {
      this.plants.forEach(callback.bind(this));
    }
  }, {
    key: "collidesWith",
    value: function collidesWith(player) {
      var _overlap = function _overlap(rect1, rect2) {
        if (rect1.left > rect2.right || rect1.right < rect2.left) {
          return false;
        }

        if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
          return false;
        }

        return true;
      };

      var collision = false;
      this.eachPlant(function (plant) {
        if (_overlap(plant.bottomPlant, player)) {
          collision = true;
        }
      });
      return collision;
    }
  }]);

  return Background;
}();



/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background */ "./src/background.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Game = /*#__PURE__*/function () {
  function Game(ctx, canvas, backgroundCtx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.canvas = canvas;
    this.backgroundCtx = backgroundCtx;
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.click = this.click.bind(this);
    this.multiplier = 0.5;
    this.registerEvents();
    this.restart();
  }

  _createClass(Game, [{
    key: "play",
    value: function play() {
      this.running = true;
      this.animate();
    }
  }, {
    key: "restart",
    value: function restart() {
      this.running = false;
      this.score = 0;
      this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions);
      var sceneryBackground = new Image();
      sceneryBackground.src = 'http://shyeyez.com/zoomies/assets/scrolling_background_dusk.png';
      this.background = new _background__WEBPACK_IMPORTED_MODULE_0__["default"](this.dimensions, this.backgroundCtx, sceneryBackground, -30, 1438, 1.2);
      this.animate();
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      this.canvas.addEventListener('mousedown', this.click);
    }
  }, {
    key: "click",
    value: function click(e) {
      if (!this.running) {
        this.play();
      }

      this.player.jump();
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      return this.background.collidesWith(this.player.bounds()) || this.player.outOfBounds(this.height);
    }
  }, {
    key: "animate",
    value: function animate() {
      this.background.animate(this.ctx);
      this.player.animate(this.ctx);
      this.drawScore(this.ctx);

      if (this.gameOver()) {
        alert(this.score);
        this.restart();
      }

      if (this.running) {
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  }, {
    key: "drawScore",
    value: function drawScore(ctx) {
      var roundedScore = Math.floor(this.score);
      var text = "Score: ".concat(roundedScore);
      ctx.font = '40px VT323';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';

      if (this.running) {
        ctx.strokeText(text, 600, 40);
        ctx.fillText(text, 600, 40);
      }

      this.incrementScore();
    }
  }, {
    key: "incrementScore",
    value: function incrementScore() {
      this.score += this.multiplier;
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('dog-game');
  var canvasCtx = canvas.getContext('2d');
  var backgroundCanvas = document.getElementById('background-canvas');
  var backgroundCanvasCtx = backgroundCanvas.getContext('2d');
  new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvasCtx, canvas, backgroundCanvasCtx);
});

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONSTANTS = {
  GRAVITY: 0.4,
  JUMP_SPEED: 8,
  TERMINAL_VEL: 12,
  PLAYER_WIDTH: 55,
  PLAYER_HEIGHT: 65
};

var Player = /*#__PURE__*/function () {
  function Player(dimensions) {
    _classCallCheck(this, Player);

    this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    this.y = this.dimensions.height / 2;
    this.vel = 0;
    this.smiley = new Image();
    this.smiley.src = 'http://shyeyez.com/zoomies/assets/coki.png';
  }

  _createClass(Player, [{
    key: "jump",
    value: function jump() {
      this.vel = -1 * CONSTANTS.JUMP_SPEED;
    }
  }, {
    key: "movePlayer",
    value: function movePlayer() {
      this.y += this.vel;
      this.vel += CONSTANTS.GRAVITY;

      if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
        if (this.vel > 0) {
          this.vel = CONSTANTS.TERMINAL_VEL;
        } else {
          this.vel = CONSTANTS.TERMINAL_VEL * -1;
        }
      }
    }
  }, {
    key: "animate",
    value: function animate(ctx) {
      this.movePlayer();
      this.drawPlayer(ctx);
    }
  }, {
    key: "drawPlayer",
    value: function drawPlayer(ctx) {
      ctx.drawImage(this.smiley, this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
    }
  }, {
    key: "bounds",
    value: function bounds() {
      return {
        left: this.x,
        right: this.x + CONSTANTS.PLAYER_WIDTH,
        top: this.y,
        bottom: this.y + CONSTANTS.PLAYER_HEIGHT
      };
    }
  }, {
    key: "outOfBounds",
    value: function outOfBounds() {
      var aboveTheTop = this.y < 0;
      var belowTheBottom = this.y + CONSTANTS.PLAYER_HEIGHT > this.dimensions.height;
      return aboveTheTop || belowTheBottom;
    }
  }]);

  return Player;
}();



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map