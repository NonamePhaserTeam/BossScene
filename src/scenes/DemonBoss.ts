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
    private bossPosition = {
        x: gameSettings.gameWidth-50,
        y: 800,
    };

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
        // this.add.image(
        //   gameSettings.gameWidth * 0.5,
        //   gameSettings.gameHeight * 0.5,
        //   TextureKeys.BossAngel.Background
        // );
        console.log("22")
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

        console.log("23")
        this.platform = this.physics.add
            .staticImage(936, 950, TextureKeys.BossAngel.Platform)
            .setSize(1750, 125)
            .setScale(1.28, 0.2);

        this.player = new Player(
            this,
            this.playerPosition.x,
            this.playerPosition.y,
            TextureKeys.Assets.Player
        );
        this.add.existing(this.player);

        console.log("21")
        this.physics.add.collider(this.player, this.platform);

        //modificare playerHeathbar

        this.playerHealthbar = new Healthbar(
            this,
            100,
            100,
            TextureKeys.Assets.PlayerHealthBar
        );

        console.log("24")
        // this.playerHealthbar.setFrameProperties("hearts");
        this.playerHealthbar.setFrameProperties("vita");

        this.bossHealthbar = new Healthbar(
            this,
            gameSettings.gameWidth - 200,
            100,
            TextureKeys.BossAngel.AngelHealthbar
        );
        this.bossHealthbar.setFrameProperties("healthbar");

        console.log("25")
        this.boss = new Demon(
            this,
            this.bossPosition.x,
            this.bossPosition.y,
            TextureKeys.Texture.Demon
        );
        //this.boss.anims.play(AnimationKeys.DemonBoss.Idle,true)

        console.log("26")
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.createBomb();
            },
        });
        this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                this.BossMovement();
            },
            callbackScope: this,
        });
        console.log("negro12")
        this.colpo = new Bullets(this, this.player.x, this.player.y, "direction");
        if (this.player && this.boss) {
            // Esegui le operazioni solo se this.player e this.boss sono definiti
            // Ad esempio:
            this.physics.add.overlap(
                this.colpo,
                this.boss,
                this.handleBulletBossCollision,
                null,
                this
            );
        }
        this.physics.world.addCollider(this.player,this.boss)
    }

    update(time: number, delta: number) {
        console.log("negro21")
        this.player.HandleMovement(this.A, this.SPACE, this.D);
        this.playerHealthbar.updateBar(gameData.playerHealth);
        // if (Phaser.Input.Keyboard.JustDown()) {
        //   this.createRock();
        // }
        //codice nuovo
        console.log("negro19")
        this.player.HandleAttack(
            this.E,
            this.X,
            this.S,
            this.LEFT,
            this.RIGHT,
            this.UP,
            this.DOWN
        );

        console.log("negro18")
        if (this.Q.isDown && time > 500 + this.lastQ) {
            this.lastQ = time;
            if (!this.player.BossDamaged()) {
                this.countboss++;
                // this.player.HandleDamage();
                // this.playerHealthbar.updateBar(gameData.playerHealth);

                gameData.angelHealth += 1;
                this.bossHealthbar.updateBar(gameData.angelHealth);
                if (this.countboss == 7) {
                    alert("Player wins");
                    //this.scene.start(SceneKeys.DemonBoss);
                }
            }
        }
        console.log("negro20")
        if (this.player.anims.currentAnim.key === AnimationKeys.Player.fionda) {
            this.colpo = new Bullets(
                this,
                this.player.body.x,
                this.player.body.y,
                this.player.getDir()
            );

            /* setTimeout(() => {
              this.colpo.checkCollision()
            }, 300); */
        }
    }

    createBomb() {
        console.log("negro22")
        const bossPositionX = this.boss.x;
        const bossPositionY = this.boss.y + 25;

        this.boss.anims.play(AnimationKeys.DemonBoss.Attack,true)
        const bomb = this.physics.add.sprite(
            bossPositionX,
            bossPositionY,
            TextureKeys.Assets.Bomb
        );
        // bomb.depth = 0.6;
        bomb.setScale(3);
        bomb.setGravity(0, -200);

        // this.groupDanger.add(bomb);

        const characterPositionX = this.player.x;
        const characterPositionY = this.player.y;
        const dx = characterPositionX - bossPositionX;
        const dy = characterPositionY - bossPositionY;
        const angle = Math.atan2(dy, dx);
        const speed = 300;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        bomb.setVelocity(vx, vy);

        this.physics.add.overlap(
            bomb,
            this.platform,
            (obj1, obj2) => {
                obj1.destroy();
            },
            null,
            this
        );
        this.physics.add.overlap(
            bomb,
            this.player,
            (obj1, obj2) => {
                obj1.destroy();
                this.player.HandleDamage();
            },
            null,
            this
        );
    }
    BossMovement() {
        console.log("negro23")
        const PositionX = [100, 300, 550, 675, 995];
        const PositionY = [275, 335, 775, 675, 990];
        this.boss.anims.play(AnimationKeys.DemonBoss.Walk,true)
        const randomIndex = Phaser.Math.Between(0, PositionX.length - 1);

        const targetX = PositionX[randomIndex];
        const targetY = PositionY[randomIndex];

        const dx = targetX - this.boss.x;
        const dy = targetY - this.boss.y;

        // Calculate the angle and speed
        const angle = Math.atan2(dy, dx);
        const speed = 50;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        this.boss.setVelocity(vx, vy);
    }

    // createRock() {
    //   const characterPositionX = this.player.x;
    //   const characterPositionY = this.player.y;

    //   const rock = new Bullets(
    //     this,
    //     characterPositionX,
    //     characterPositionY,
    //     "RIGHT" // Direzione del proiettile (ad esempio, 'RIGHT')
    //   );
    // }

    handleBulletBossCollision(colpo: any, boss: any) {
        alert("Colpito");
        colpo.destroy();
    }
}
