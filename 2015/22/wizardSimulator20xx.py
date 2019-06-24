BOSS_HP = 71
BOSS_DMG = 10

PLAYER_HP = 50
PLAYER_MANA = 500

DEBUG = True

class Boss:
    def __init__(self, hp, damage):
        self.hp = hp
        self.damage = damage
        self.poisonTimer = 0

    def attack(self, player):
        if DEBUG:
            print("Boss attacks for " + str(self.damage) + " damage")
        player.hp = player.hp - (self.damage - player.armor if player.armor < self.damage else 1) 

    def __repr__(self):
        return "Boss has " + str(self.hp) + " hit points"

class Player:
    def __init__(self, hp, mana):
        self.hp = hp
        self.mana = mana
        self.armor = 0
        self.shieldTimer = 0
        self.rechargeTimer = 0

    def magicMissle(self, boss: Boss):
        if DEBUG:
            print("Player casts Magic Missle; dealing 4 damage")
        boss.hp -= 4
        self.mana -= 53

    def drain(self, boss: Boss):
        if DEBUG:
            print("Player casts drain; dealing 2 damage and healing 2 hit points")
        boss.hp = boss.hp - 2
        self.hp += 2
        self.mana -= 73

    def shield(self):
        if DEBUG:
            print("Player casts shield")
        self.armor = 7
        self.shieldTimer = 6
        self.mana -= 113

    def poison(self, boss):
        if DEBUG:
            print("Player casts poison")
        boss.poisonTimer = 6
        self.mana -= 173

    def recharge(self):
        if DEBUG:
            print("Player casts recharge")
        self.rechargeTimer = 5
        self.mana -= 229

    def __repr__(self):
        return "Player has " + str(self.hp) + " hit points, " + str(self.armor) + " armor, " + str(self.mana) + " mana"

def tick(player: Player, boss: Boss):
    if player.rechargeTimer > 0:
        if DEBUG:
            print("Recharge provides 101 mana; its timer is now " + str(player.rechargeTimer))
        player.rechargeTimer -= 1
        player.mana += 101
    if player.shieldTimer > 0:
        if DEBUG:
            print("Shields timer is now " + str(player.shieldTimer))
        player.shieldTimer -= 1
    else:
        player.armor = 0
    if boss.poisonTimer > 0:
        if DEBUG:
            print("Poison deals 3 damage; its timer is now " + str(boss.poisonTimer))
        boss.hp -= 3
        boss.poisonTimer -= 1

def main():
    player = Player(10, 250)
    boss = Boss(14, 8)

    print(player)
    print(boss)
    player.recharge()
    tick(player, boss)

    print(player)
    print(boss)
    boss.attack(player)
    tick(player, boss)

    print(player)
    print(boss)
    player.shield()
    tick(player, boss)

    print(player)
    print(boss)
    boss.attack(player)
    tick(player, boss)

    print(player)
    print(boss)
    player.drain(boss)
    tick(player, boss)

    print(player)
    print(boss)
    boss.attack(player)
    tick(player, boss)

    print(player)
    print(boss)
    player.poison(boss)
    tick(player, boss)


if __name__ == "__main__":
   main() 