# Configuration du Panneau d'Administration

## 1. Initialiser la Base de Données

Exécutez le script SQL fourni dans votre dashboard Supabase :

**Chemin** : SQL Editor > `scripts/create-admin-users-table.sql`

Cela crée :
- Table `admin_users` pour stocker les données des administrateurs
- Utilisateur admin par défaut avec email `admin@example.com`

## 2. Créer un Utilisateur Supabase Auth

1. Allez à **Authentication > Users** dans le dashboard Supabase
2. Cliquez sur **Create new user**
3. Entrez :
   - Email: `admin@example.com`
   - Password: Votre mot de passe sécurisé
4. Cliquez **Create user**

## 3. Vérifier la Connexion

1. Accédez à `/admin`
2. Entrez les identifiants :
   - Username: `admin`
   - Password: Le mot de passe créé à l'étape 2
3. Vous devriez être redirigé vers le dashboard

## Dépannage

### "Invalid username or password"
- Assurez-vous que l'utilisateur Supabase existe avec l'email `admin@example.com`
- Vérifiez que la table `admin_users` contient l'utilisateur `admin`

### Les projets ne chargent pas
- La table `projects` doit exister dans Supabase
- Consultez les logs pour les erreurs détaillées

### Session expire rapidement
- C'est normal - Supabase utilise les cookies de session
- Réauthentifiez-vous si nécessaire
