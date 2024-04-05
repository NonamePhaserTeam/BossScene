import "phaser";

import BossFight from "./scenes/BossFight";
import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";

import { gameSettings } from "./consts/GameSettings";
import HealthBar from "./scenes/HealthBar";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: gameSettings.bgColor,
  parent: "my-game",
  scale: {
    mode: Phaser.Scale.FIT,
    width: gameSettings.gameWidth,
    height: gameSettings.gameHeight,
    zoom: gameSettings.zoom,
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: gameSettings.gravity,
      debug: gameSettings.debug,
    },
  },

  // scene: [Preloader, Game],
  scene: [Preloader, HealthBar],
};

export default new Phaser.Game(config);
