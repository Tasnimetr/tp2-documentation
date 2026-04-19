# Revue de code détaillée

## 1. `src/views/PostsView.vue`

### Extrait de code

```vue
<form @submit.prevent="submit">
      <input v-model="form.name" placeholder="Nom" required />
      <br><br>
      <h>Expers disponible (5/5)</h>
      <ul>
        <!-- On parcourt la liste des publications. Pour chaque publication, on affiche le titre et un lien d'édition est créé avec RouterLink -->
        <li v-for="post in posts" v-bind:key="post.id">
          {{ post.name }}  
        </li>
      </ul>
      
      <button type="submit" class="btn btn-dark">Commencer la partie</button>
       <RouterLink :to="{
            name: 'Game'
          }">
      </RouterLink>
    </form>
```

### Commentaire de revue

**Marc-Antoine Bowes**
> Juste changer post pour pokemon ou acceuil, sinon très bon code

### Suivi

- `Tasnime` a corrigé les noms des variables.
---
