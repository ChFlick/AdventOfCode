from copy import copy

BOSS_HP = 71
BOSS_DMG = 10

PLAYER_HP = 50
PLAYER_MANA = 500

DEBUG = False

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
        self.manaUsed = 0
        self.armor = 0
        self.shieldTimer = 0
        self.rechargeTimer = 0

    def magicMissle(self, boss: Boss):
        if DEBUG:
            print("Player casts Magic Missle; dealing 4 damage")
        boss.hp -= 4
        self.mana -= 53
        self.manaUsed += 53

    def drain(self, boss: Boss):
        if DEBUG:
            print("Player casts drain; dealing 2 damage and healing 2 hit points")
        boss.hp = boss.hp - 2
        self.hp += 2
        self.mana -= 73
        self.manaUsed += 73

    def shield(self):
        if DEBUG:
            print("Player casts shield")
        self.armor = 7
        self.shieldTimer = 6
        self.mana -= 113
        self.manaUsed += 113

    def poison(self, boss):
        if DEBUG:
            print("Player casts poison")
        boss.poisonTimer = 6
        self.mana -= 173
        self.manaUsed += 173

    def recharge(self):
        if DEBUG:
            print("Player casts recharge")
        self.rechargeTimer = 5
        self.mana -= 229
        self.manaUsed += 229    

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

def fight(player: Player, boss: Boss, minMana: int):
    # Comment line below out for V1
    player.hp -= 1
    if player.mana < 0:
        return minMana
    if player.manaUsed > minMana:
        return minMana
    if boss.hp < 1:
        return player.manaUsed
    if player.hp < 1:
        return minMana

    for i in range(5):
        p: Player = copy(player)
        b: Boss = copy(boss)

        if i == 0:
            p.magicMissle(b)
        elif i == 1:
            p.drain(b)
        elif i == 2:
            if player.shieldTimer > 0:
                continue
            p.shield()
        elif i == 3:
            if b.poisonTimer > 0:
                continue
            p.poison(b)
        elif i == 4:
            if p.rechargeTimer > 0:
                continue
            p.recharge()
        

        tick(p, b)
        if b.hp < 1:
            minMana = min([minMana, p.manaUsed])
            continue
        if p.hp < 1:
            continue
        b.attack(p)
        tick(p, b)
        minMana = fight(p, b, minMana)

    return minMana
    

def main():
    player = Player(PLAYER_HP, PLAYER_MANA)
    boss = Boss(BOSS_HP, BOSS_DMG)

    minMana = 9999999999999999

    minMana = fight(player, boss, minMana)
    print(minMana)

    exit(0)
    # print(player)
    # print(boss)
    # player.recharge()
    # tick(player, boss)

    # print(player)
    # print(boss)
    # boss.attack(player)
    # tick(player, boss)

    # print(player)
    # print(boss)
    # player.shield()
    # tick(player, boss)

    # print(player)
    # print(boss)
    # boss.attack(player)
    # tick(player, boss)

    # print(player)
    # print(boss)
    # player.drain(boss)
    # tick(player, boss)

    # print(player)
    # print(boss)
    # boss.attack(player)
    # tick(player, boss)

    # print(player)
    # print(boss)
    # player.poison(boss)
    # tick(player, boss)


if __name__ == "__main__":
   main() 