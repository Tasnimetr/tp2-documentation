## 1. `src/components/NavigationBar.vue`

### Extrait de code

```vue
 if (currentPokemon.value.hp < 1) {
        PlayerAttack.value = currentPokemon.value.name + " est K.O";

        hasChangedPokemon.value = false;

        hasToChangePokemon.value = true;
      } else {
        EnemyAttack.value =
          enemy.value?.pokemon.name +
          " à fait " +
          Math.round(damage).toString() +
          " de dégât";
      }
    }
```

### Commentaire de revue

**Tasnime Trabelsi**
> À corriger car ça retourne des fois undefined à la place du nom du pokémon.

### Suivi

- `Marc-Antoine` a corrigé la valeur du pokémon.
---

## 1. `src/components/RankingView.vue`

### Extrait de code

```vue
<div>
    <h1>Ranking</h1>
  </div>
```

### Commentaire de revue

**Tasnime Trabelsi**
> Modifier titre de la page en anglais pour garder la langue uniforme

### Suivi

- Le titre est modifé à `Score`