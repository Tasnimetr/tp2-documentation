# Tableau des scores

Cette page est un tableau des scores, rempli de données temporaires. Les joueurs pourront être affichés avec leur nom, leur score et si le temps le permet, leurs Pokémon.

---

## 1. Récupération des classements

On commence par aller chercher la liste des joueurs ayant eu un bon score.

```typescript
const rankings = ref([] as Ranking[]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    rankings.value = await rankingService.getRankings();
    rankings.value.sort((a, b) => b.score - a.score);
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

## 2. Affichage du tableau des scores

Ensuite, on affiche le tableau des scores de manière dynamique en itérant sur la liste des classements.

```html
<ul>
  <li v-for="rank in rankings" v-bind:key="rank.id">
    <h3>Le dresseur</h3>
    {{ rank.name }}
    <p>Avec le score :</p>
    {{ rank.score }}
  </li>
</ul>
```
