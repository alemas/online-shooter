"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = __importDefault(require("phaser"));
var game_scene_1 = require("./scenes/game-scene");
var ShooterGame = /** @class */ (function (_super) {
    __extends(ShooterGame, _super);
    function ShooterGame() {
        var _this = this;
        var gameScene = new game_scene_1.GameScene();
        var config = {
            type: phaser_1.default.AUTO,
            parent: 'game',
            width: 1280,
            height: 720,
            backgroundColor: 0xf0f0f0,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 0 }
                }
            },
            scene: [gameScene]
        };
        _this = _super.call(this, config) || this;
        _this.canvasSize = { width: _this.canvas.width, height: _this.canvas.height };
        return _this;
    }
    return ShooterGame;
}(phaser_1.default.Game));
exports.ShooterGame = ShooterGame;
//# sourceMappingURL=shooter-game.js.map