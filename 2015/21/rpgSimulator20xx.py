from itertools import permutations

BOSSHP = 103
BOSSDMG = 9
BOSSARM = 2

weapons = [
    (8, 4, 0),
    (10, 5, 0),
    (25, 6, 0),
    (40, 7, 0),
    (74, 8, 0)
]
armors = [
    (13, 0, 1),
    (31, 0, 2),
    (53, 0, 3),
    (75, 0, 4),
    (102, 0, 5),
    (0, 0, 0)
]
rings = [
    (25, 1, 0),
    (50, 2, 0),
    (100, 3, 0),
    (20, 0, 1),
    (40, 0, 2),
    (80, 0, 3),
    (0, 0, 0),
    (0, 0, 0)
]


class GameEntity:
    def __init__(self, hp, damage, armor):
        self.hp = hp
        self.damage = damage
        self.armor = armor

def fight(player, boss):
    while player.hp > 0 or boss.hp > 0:
        boss.hp = boss.hp - (player.damage - boss.armor)
        player.hp = player.hp - (boss.damage - player.armor)
        # print("boss", boss.hp, "player", player.hp)
        if boss.hp < 1:
            return "player"
        elif player.hp < 1:
            return "boss"

minCosts = 9999999
for weapon in weapons:
    for armor in armors:
        for ringperms in permutations(rings):
            costs = weapon[0] + armor[0] + ringperms[0][0] + ringperms[1][0]
            if costs > minCosts:
                continue

            damage = weapon[1] + armor[1] + ringperms[0][1] + ringperms[1][1]
            arm = weapon[2] + armor[2] + ringperms[0][2] + ringperms[1][2]
            player = GameEntity(100, damage, arm)
            boss = GameEntity(BOSSHP, BOSSDMG, BOSSARM)
            if fight(player, boss) == "player":
                minCosts = min([minCosts, costs])

print(minCosts)