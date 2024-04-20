// import { globalEval } from "jquery";
import Phaser from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import Player from "../game/Player";
import Healthbar from "../game/HealthBar";
import Demon from "../game/Demon";
import { gameData } from "../consts/GameData";
import Bullets from "../game/Bullets";

export default class DemonBoss extends Phaser.Scene {
    private platform: Phaser.Physics.Arcade.Image;

    private player: Player;
    private playerPosition = {
        x: 400,
        y: 800,
    };

    private boss: Demon;
    private colpo: Bullets;

    private playerHealthbar: Healthbar;
    private bossHealthbar: Healthbar;

    private SPACE: Phaser.Input.Keyboard.Key;
    private A: Phaser.Input.Keyboard.Key;
    private S: Phaser.Input.Keyboard.Key;
    private D: Phaser.Input.Keyboard.Key;
    private Q: Phaser.Input.Keyboard.Key;
    private E: Phaser.Input.Keyboard.Key;
    private X: Phaser.Input.Keyboard.Key;
    private P: Phaser.Input.Keyboard.Key;
    private LEFT: Phaser.Input.Keyboard.Key;
    private RIGHT: Phaser.Input.Keyboard.Key;
    private UP: Phaser.Input.Keyboard.Key;
    private DOWN: Phaser.Input.Keyboard.Key;

    private lastQ = 0;
    private countplayer = 0;
    private countboss = 0;
    private bombs: Phaser.GameObjects.Container;

    constructor() {
        super(SceneKeys.DemonBoss);
    }

    init() {
        this.SPACE = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.RIGHT = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );
        this.UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    create() {
        const map9 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaNine
        );
        map9.setDepth(-1000);

        const map8 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaEight
        );
        map8.setDepth(-990);

        const map7 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaSeven
        );
        map7.setDepth(-980);

        const map6 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaSix
        );
        map6.setDepth(-970);

        const map5 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaFive
        );
        map5.setDepth(-960);

        const map4 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaFour
        );
        map4.setDepth(-950);

        const map3 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaThree
        );
        map3.setDepth(-940);

        const map2 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaTwo
        );
        map2.setDepth(-930);

        const map1 = this.add.image(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5,
            TextureKeys.Caverna.CavernaOne
        );
        map1.setDepth(-920);
        this.platform = this.physics.add
            .staticImage(gameSettings.gameWidth / 2, 1090, TextureKeys.BossAngel.Platform)
            .setSize(1, 1)
            .setScale(4, 1)

        this.player = new Player(
            this,
            this.playerPosition.x,
            this.playerPosition.y,
            TextureKeys.Assets.Player,
            //this.boss
        );
        this.physics.add.collider(this.player, this.platform);


        this.playerHealthbar = new Healthbar(
            this,
            100,
            100,
            TextureKeys.Assets.PlayerHealthBar
        );
        // this.playerHealthbar.setFrameProperties("hearts");
        this.playerHealthbar.setFrameProperties("vita");

        this.bossHealthbar = new Healthbar(
            this,
            gameSettings.gameWidth - 200,
            100,
            TextureKeys.BossAngel.AngelHealthbar
        );
        this.bossHealthbar.setFrameProperties("healthbar");

        //this.boss = new Demon(this, gameSettings.gameWidth-200, this.platform.y-194, TextureKeys.Texture.Demon,);
        this.boss = new Demon(
            this,
            gameSettings.gameWidth - 20,
            this.platform.y - 194,
            150,
            40,
            this.playerHealthbar,
            TextureKeys.DemonBoss.Demon,
        )
        this.boss.setScale(2)
        this.boss.body.setSize(180, 130, true)
        this.boss.anims.play(AnimationKeys.DemonBoss.Idle, true)

        this.physics.world.addCollider(this.boss, this.platform)
        this.physics.world.addOverlap(this.player, this.boss)
    }

    update(time: number, delta: number) {
        this.player.HandleMovement(this.A, this.SPACE, this.D);
        this.playerHealthbar.updateBar(gameData.playerHealth);

        this.player.HandleAttack(
            this.E,
            this.X,
            this.S,
            this.LEFT,
            this.RIGHT,
            this.UP,
            this.DOWN
        );
        this.player.HandleDamage()
        this.boss.OnGuard(this.player)
        if (this.Q.isDown && time > 500 + this.lastQ) {
            this.lastQ = time;
            if (!this.player.BossDamaged()) {
                this.countboss++;

                // this.player.HandleDamage();
                // this.playerHealthbar.updateBar(gameData.playerHealth);

                gameData.angelHealth += 1;
                this.bossHealthbar.updateBar(gameData.angelHealth);
                if (this.countboss >= 7) {
                    //alert("Player wins");
                }
            }
        }
        if (
            this.player.anims.currentAnim.key === AnimationKeys.Player.Fionda
        ) {
            //this.colpo = new Bullets(this, this.player.body.x, this.player.body.y, this.player.getDir());
        }
    }

}
