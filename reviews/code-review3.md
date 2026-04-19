# Revue de code détaillée

## 1. `src/views/PostsView.vue`

### Extrait de code

```vue
<div class="pokemon-info">
    <div v-if="players.length">
        {{ players[players.length - 1].pokemons[0].name }}
        HP: {{ players[players.length - 1].pokemons[0].hp }}
    </div>
    <div class="hp-bar">
    <!-- IA: Chatgpt — pour afficher la barre de progression de la vie du pokémon -->
    <div class="hp-fill"
        :style="{ width: players[players.length - 1].pokemons[0].hp + '%' }">
    </div>
```

### Commentaire de revue

**Marc-Antoine Bowes**
> players[players.length - 1] devrait être mit en constante

### Suivi

- Le joueur est devenu est une constante `currentPlayer`.
---

## 1. `src/views/PostsView.vue`

### Extrait de code

```vue
<style>
.card {
    border-radius: 12px;
    background-color: #f8f9fa;
}

.title {
    text-align: center;
    margin-bottom: 10px;
}

.combat-box {
    background-color: #2c3e50;
    color: white;
    border-radius: 8px;
    padding: 10px;
    font-size: 10px;
}

.box-header {
    text-align: center;
    font-weight: bold;
    margin-bottom: 8px;
    background-color: #3f5f9f;
    padding: 4px;
    border-radius: 6px;
}

.box-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.player-info {
    line-height: 1.4;
}

.pokemon-info {
    text-align: right;
}

.hp-bar {
    width: 120px;
    height: 8px;
    background-color: #555;
    border-radius: 4px;
    margin-top: 3px;
}

.hp-fill {
    height: 100%;
    background-color: #4caf50;
    border-radius: 4px;
}

.vs {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
}

.combat-box {
    border-radius: 8px;
    padding: 8px;
    font-size: 10px;
    color: white;
}

/* personnage */
.player-box {
    border: 2px solid #3f5f9f;
}

.player-header {
    background-color: #3f5f9f;
    padding: 4px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 8px;
}

/* ennemi */
.enemy-box {
    border: 2px solid #c0392b;
}

.enemy-header {
    background-color: #c0392b;
    padding: 4px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 8px;
}

.pokemon-img {
    width: 60px;
    height: 60px;
}
```

### Commentaire de revue

**Marc-Antoine Bowes**
> Devrait être mit dans pokemon.css

### Suivi

- `Tasnime` a déplacé toute le code dans pokemon.css.
---

