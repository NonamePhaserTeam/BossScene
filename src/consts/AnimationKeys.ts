// inserire qui le animazioni sotto forma di chiave valore per un utilizzo più veloce e ordinato nelle scene

namespace AnimationKeys 
{
    export enum Player {
		Idle = "player-idle",
		Run = "player-run",
		Attack1 = "player-attack1",
		Attack2 = "player-attack2",
		Attack3 = "player-attack3",
		Dead = "player-dead",
		Hurt = "player-hurt",
		Jump = "player-jump",
		Walk = "player-walk",
		Shield = "player-shield",
		HealthBar = 'player-healthbar'
    }
    
    export enum AngelBoss {
     	Idle = "idle",
    }

	export enum Bomb {
		Bomb = 'bomb-attack'
	}
}

export default AnimationKeys