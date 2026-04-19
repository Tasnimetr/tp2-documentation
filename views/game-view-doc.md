Texte de Marc-Antoine, formater en Markdown par IA

# 🎮 GameView – Page principale de combat

GameView est la page de jeu principale.

## 🔹 Initialisation du joueur et du Pokémon

On commence par aller chercher le joueur et son Pokémon :

```ts
const currentPlayer = ref(players.value[players.value.length - 1]);
const currentPokemon = ref<Pokemon | null>(currentPlayer.value.pokemons[0]);
```

Même chose avec notre premier ennemi :

```ts
const enemy = ref<Trainer | null>(null);

onMounted(async () => {
  isLoading.value = true;

  try {
    trainers.value = await trainersService.getTrainers();

    const randomIndex = Math.floor(Math.random() * trainers.value.length);
    enemy.value = trainers.value[randomIndex];
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 },
    );
  } finally {
    isLoading.value = false;
  }
});
```

---

## 👤 Affichage du joueur et de son Pokémon

```html
<div class="combat-box player-box">
  <div class="player-header">PERSONNAGE</div>

  <div class="box-content">
    <!-- Infos joueur -->
    <div class="player-info">
      <div>Nom: {{ currentPlayer.name }}</div>
      <div>Expérience: {{ currentPlayer.experience }}</div>
      <div>P$: {{ Math.round(currentPlayer.points) }}</div>
    </div>

    <!-- Pokémon actif -->
    <div class="pokemon-info">
      <div v-if="players.length && currentPokemon">
        {{ currentPokemon.name }}
      </div>
      <div v-if="players.length && currentPokemon">
        HP: {{ Math.round(currentPokemon.hp) }}
      </div>

      <div class="hp-bar">
        <div
          class="hp-fill"
          v-if="currentPokemon"
          :style="{ width: Math.round(currentPokemon.hp) + '%' }"
        ></div>
      </div>

      <img
        v-if="currentPokemon"
        :src="`https://img.pokemondb.net/sprites/home/normal/${currentPokemon.name.toLowerCase()}.png`"
        class="pokemon-img"
      />
    </div>
  </div>

  <div class="attack-log player-attack">{{ PlayerAttack }}</div>
</div>
```

---

## 👾 Affichage de l’ennemi

```html
<div class="combat-box enemy-box">
  <div class="enemy-header">ENNEMI</div>

  <div class="box-content">
    <!-- Pokémon ennemi -->
    <div class="enemy-pokemon-info" v-if="enemy">
      <div>{{ enemy.pokemon.name }}</div>
      <div>HP: {{ Math.round(enemy.pokemon.hp) }}</div>

      <div class="hp-bar">
        <div
          v-if="enemy"
          class="hp-fill"
          :style="{ width: Math.round(enemy.pokemon.hp) + '%' }"
        ></div>
      </div>

      <img
        :src="`https://img.pokemondb.net/sprites/home/normal/${enemy.pokemon.name.toLowerCase()}.png`"
        class="pokemon-img"
      />
    </div>

    <!-- Infos ennemi -->
    <div class="enemy-info" v-if="enemy">
      <div>Nom: {{ enemy.name }}</div>
      <div>Expérience: {{ enemy.experience }}</div>
      <div>P$: {{ Math.round(enemy.reward) }}</div>
    </div>
  </div>

  <div class="attack-log enemy-attack">{{ EnemyAttack }}</div>
</div>
```

---

## 🖼️ Récupération des images Pokémon (API)

```html
<img
  :src="`https://img.pokemondb.net/sprites/home/normal/${enemy.pokemon.name.toLowerCase()}.png`"
  class="pokemon-img"
/>

<img
  v-if="currentPokemon"
  :src="`https://img.pokemondb.net/sprites/home/normal/${currentPokemon.name.toLowerCase()}.png`"
  class="pokemon-img"
/>
```

---

# ⚔️ Logique du combat

## 🔘 Actions disponibles

```html
<button class="button-heal" @click="healActivePokemon" :disabled="isLoading">
  Soigner et quitter le combat
</button>

<button
  class="button-attack"
  @click="playerTurn"
  :disabled="hasToChangePokemon || isLoading"
>
  Attaquer
</button>

<button class="button-attack" @click="quitCurrentFight" :disabled="isLoading">
  Quitter le combat
</button>
```

Ces boutons appellent les méthodes principales du combat.

---

## 🧍 Tour du joueur — `playerTurn`

```ts
async function playerTurn() {
  let random = getRandomInt(1, 100);

  if (random > 70 && isLoading.value == false) {
    if (enemy.value && currentPokemon.value) {
      let damage = enemy.value.pokemon.hp * (getRandomInt(25, 40) / 100);

      if (damage < 1) {
        damage = 1;
      }

      enemy.value.pokemon.hp -= damage;

      if (enemy.value.pokemon.hp < 1) {
        if (nbFight.value == 5) {
          VictoryMessage.value =
            currentPlayer.value.name +
            " à gagner " +
            currentPlayer.value.points +
            " P$";

          await rankingService.addRanking({
            id: rankings.value.length + 1,
            name: currentPlayer.value.name,
            score: currentPlayer.value.points,
          });

          setTimeout(() => {
            router.push({ name: "Ranking" });
          }, 5000);
        } else {
          EnemyAttack.value = enemy.value.pokemon.name + " est K.O";
          currentPlayer.value.points += enemy.value.reward;
          nbFight.value += 1;

          enemy.value = null;
          EnemyAttack.value = "";
          hasChangedPokemon.value = false;

          loadEnemy();
        }
      }

      PlayerAttack.value =
        currentPokemon.value.name +
        " à fait " +
        Math.round(damage) +
        " de dégât";
    }
  } else {
    PlayerAttack.value = currentPokemon.value?.name + " à rater son attaque";
  }

  if (isLoading.value == false) {
    enemyTurn();
  }
}
```

---

## 👾 Tour de l’ennemi — `enemyTurn`

```ts
function enemyTurn() {
  let chance = getAttackChance(Number(enemy.value?.experience));
  let random = getRandomInt(1, 100);

  if (random > chance) {
    if (currentPokemon.value) {
      let damage = currentPokemon.value.hp * (getRandomInt(10, 15) / 100);

      if (damage < 1) {
        damage = 1;
      }

      currentPokemon.value.hp -= damage;

      if (currentPokemon.value.hp < 1) {
        PlayerAttack.value = currentPokemon.value.name + " est K.O";

        hasChangedPokemon.value = false;
        hasToChangePokemon.value = true;

        if (!checkPokemon()) {
          DefeatMessage.value =
            currentPlayer.value.name +
            " n'a plus de pokemon en forme " +
            Math.round(currentPlayer.value.points) +
            " P$ perdu";

          setTimeout(() => {
            router.push({ name: "Home" });
          }, 5000);
        }
      } else {
        EnemyAttack.value =
          enemy.value?.pokemon.name +
          " à fait " +
          Math.round(damage) +
          " de dégât";
      }
    }
  } else {
    EnemyAttack.value = enemy.value?.pokemon.name + " à rater son attaque";
  }
}
```

---

## 🎯 Chance d’attaque ennemie

```ts
function getAttackChance(xp: number): number {
  switch (xp) {
    case 1:
      return 20;
    case 2:
      return 35;
    case 3:
      return 50;
    case 4:
      return 70;
    default:
      return -1;
  }
}
```

---

## 🎲 Génération aléatoire

```ts
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

## 🚪 Quitter un combat

```ts
function quitCurrentFight() {
  if (nbFight.value < 5) {
    nbFight.value += 1;
    hasChangedPokemon.value = false;
    enemy.value = null;
    loadEnemy();
  } else if (nbFight.value == 5) {
    DefeatMessage.value =
      currentPlayer.value.name +
      " a quitté le combat final " +
      Math.round(currentPlayer.value.points) +
      " P$ perdu";

    setTimeout(() => {
      router.push({ name: "Home" });
    }, 5000);
  }
}
```

---

## ❤️ Soin du Pokémon

```ts
function healActivePokemon() {
  if (currentPokemon.value) {
    let healingAmount = 100 - currentPokemon.value.hp;
    let healingCost = healingAmount * 5;

    if (healingAmount <= 0) {
      PlayerAttack.value =
        currentPokemon.value.name + " est déjà en pleine santé";
      return;
    } else if (currentPlayer.value.points >= healingCost) {
      currentPlayer.value.points -= healingCost;
      currentPokemon.value.hp = 100;
    } else {
      PlayerAttack.value =
        "Pas assez de P$ pour soigner " + currentPokemon.value.name;
      return;
    }
  }

  quitCurrentFight();
}
```
