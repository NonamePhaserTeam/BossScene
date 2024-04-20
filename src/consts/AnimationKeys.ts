// inserire qui le animazioni sotto forma di chiave valore per un utilizzo più veloce e ordinato nelle scene

namespace AnimationKeys {
  export enum Player {
    Idle = "player-idle",
    // Run = "player-run",
    // Attack1 = "player-attack1",
    // Attack2 = "player-attack2",
    // Attack3 = "player-attack3",
    // Dead = "player-dead",
    // Hurt = "player-hurt",
    // Jump = "player-jump",
    // Walk = "player-walk",
    // Shield = "player-shield",
    // HealthBar = "player-healthbar",
    // fionda = "fionda",
    // Punch = "player-punch",
    // Idle = "player-idle",
    Walk = "player-run",
    Punch = "player-punch",
    Sword = "player-sword",
    Jump = "player-jump",
    Blow = "player-blow",
    Fionda = "player-fionda",
    Walk_fionda = "player-fionda camminata",
    Walk_sword = "player-spada camminata",
    Walk_punch = "player-punch camminata",
    Death = "player-death",
    Ginocchio = "player-ginocchio",
    Dush = "player-dush",
  }

  export enum SkeletonEnemy {
    Idle = "skeleton-idle",
    Walk = "skeleton-walk",
  }

  export enum AngelBoss {
    Idle = "idle",
  }

  export enum DemonBoss {
	Idle = "boss-idle",
	Walk = "walk",
	Attack = "attack",
  }

  export enum MonsterBoss {
    Idle = "idle",
  }

  export enum Boss {
    idle = "bossIdle",
  }

  export enum Bomb {
    Bomb = "bomb-attack",
  }

  export enum Portale {
    Opening = "portale-opening",
    Idle = "portale-idle",
    Closiing = "portale-closing",
  }
}

export default AnimationKeys;
