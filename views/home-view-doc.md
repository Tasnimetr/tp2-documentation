# Page d'accueil : Sélection de l'équipe

Cette page sert de point d'entrée principal au jeu. Elle permet au joueur de configurer son profil et de choisir ses compagnons avant de débuter l'aventure.

---

## 1. Chargement des données

Nous utilisons le hook `onMounted` pour récupérer la liste des Pokémon dès le chargement du composant. L'utilisation de `async/await` permet de charger les données de manière asynchrone sans bloquer le rendu de l'interface.

```typescript
onMounted(async () => {
  isLoading.value = true;
  try {
    // Appel au service pour récupérer la liste des Pokémon
    pokemons.value = await pokemonsService.getPokemons();
  } catch (error) {
    // Notification d'erreur si le backend est injoignable
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

## 2. Affichage et Sélection

Le joueur peut visualiser les Pokémon disponibles. Actuellement, la liste est rendue dynamiquement pour permettre au joueur de composer son équipe (limite de 5).

### Liste des Pokémon

```html
<ul>
  <li v-for="pokemon in pokemons" :key="pokemon.id">{{ pokemon.name }}</li>
</ul>
```

---

## 3. Configuration du Dresseur

Un formulaire permet de définir le nom du dresseur. Ces informations sont liées de manière réactive via un objet `form`.

```html
<form @submit.prevent="submit">
  <input v-model="form.name" placeholder="Nom du dresseur" required />

  <h3>Équipe disponible (5/5)</h3>
  <ul>
    <li v-for="pokemon in pokemons" :key="pokemon.id">{{ pokemon.name }}</li>
  </ul>

  <button type="submit" class="btn btn-dark">Commencer la partie</button>
</form>
```

---

## 4. Gestion de l'état du Joueur

Le nom saisi est stocké dans un objet `Player` créé via une interface temporaire. Une fois l'objet instancié, il est ajouté à la liste des joueurs et l'utilisateur est redirigé vers la page de jeu (`Game`), permettant ainsi de faire persister l'identité du personnage entre les vues.

### Logique de création

```typescript
interface PlayerForm {
  name: string;
  points: string;
}

const form = reactive<PlayerForm>({
  name: "",
  points: "",
});

/**
 * Génère un nouvel objet Joueur avec un ID unique
 */
function createPlayer(): Player {
  return {
    id: crypto.randomUUID(),
    name: form.name,
    points: 0,
  };
}

/**
 * Traite le formulaire et redirige vers la page Game
 */
function submit(): void {
  const player = createPlayer();
  players.value.push(player);

  resetForm();
  router.push({ name: "Game" });
}
```
