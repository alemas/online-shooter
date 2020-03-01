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
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = this;
        var config = {
            key: "GameScene",
            active: true
        };
        _this = _super.call(this, config) || this;
        return _this;
    }
    GameScene.prototype.init = function (params) {
    };
    GameScene.prototype.preload = function () {
        this.load.image('player', './assets/images/player_red.png');
    };
    GameScene.prototype.create = function () {
        var maxWidth = this.game.canvasSize.width;
        var maxHeight = this.game.canvasSize.height;
        this.add.image(maxWidth / 2, maxHeight / 2, 'player');
    };
    GameScene.prototype.update = function () {
    };
    return GameScene;
}(phaser_1.default.Scene));
exports.GameScene = GameScene;
//# sourceMappingURL=game-scene.js.map