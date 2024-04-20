import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import Player from "./Player";
import Healthbar from "../game/HealthBar";
import { gameData } from "../consts/GameData";
interface EnemyClass {
    Idle: string;
    Walk: string;
}

export default class Demon extends Phaser.Physics.Arcade.Sprite {
    private chase_speed: number; //= 100;
    private patrol_speed: number; //= 50;
    private damage: number;
    private distanza_minima: number = 5000;
    private player_hp: Healthbar

    constructor(
        scene: Phaser.Scene,
        xe: number,
        ye: number,
        chase_speed: number,
        patrol_speed: number,
        php:Healthbar,
        texture: string,
        frame?: string
    ) {
        super(scene, xe, ye, texture, frame);
        scene.physics.world.enable(this);
        this.chase_speed = chase_speed;
        this.patrol_speed = patrol_speed;
        this.player_hp = php
        scene.add.existing(this);
        this.create();
    }

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);
    }

    private create() {
        this.setScale(3);
        this.setCollideWorldBounds(true);
        this.anims.play(AnimationKeys.DemonBoss.Idle, true);
    }

    OnGuard(Player: Player) {
        let distanzaX_dal_player: number = Player.body.x - this.x;
        let distanzaY_dal_player: number = Player.body.y - this.y;
        if (distanzaY_dal_player > -100) { // quando sta a terra
            if (
                distanzaX_dal_player < this.distanza_minima && distanzaX_dal_player > 0 && !(distanzaX_dal_player <= 180)
            ) {
                // follow right
                this.setFlipX(true);
                this.anims.play(AnimationKeys.DemonBoss.Walk, true);
                this.setVelocityX(this.chase_speed);
            } else if (
                distanzaX_dal_player > -this.distanza_minima && distanzaX_dal_player < 0 && !(distanzaX_dal_player >= -284)
            ) {
                // follow left
                this.setFlipX(false);
                this.anims.play(AnimationKeys.DemonBoss.Walk, true);
                this.setVelocityX(-this.chase_speed);
            }
            else if (distanzaX_dal_player <= 284) {
                this.setVelocityX(0);
                this.anims.play(AnimationKeys.DemonBoss.Attack, true); // qua ci dovrebbe stare l'animazione di attacco in aria del nemico
                if(this.anims.currentAnim.key === AnimationKeys.DemonBoss.Attack)
                gameData.playerHealth+=1
            } else if (distanzaX_dal_player >= -284) {
                this.setVelocityX(0);
                this.anims.play(AnimationKeys.DemonBoss.Attack, true); // qua ci dovrebbe stare l'animazione di attacco in aria del nemico
                if(this.anims.currentAnim.key === AnimationKeys.DemonBoss.Attack)
                gameData.playerHealth+=1

            }
        }
    }
}
