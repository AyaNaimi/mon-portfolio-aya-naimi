# Guide de Sécurité - Interface d'Administration

## Configuration Initiale

### 1. Variables d'Environnement

Configurez les variables suivantes dans votre projet Vercel:

\`\`\`env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=generate-strong-random-key
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
\`\`\`

### 2. Générer une JWT_SECRET Sécurisée

Pour générer une clé JWT sécurisée:

\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

Ou utilisez un générateur en ligne: https://www.uuidgenerator.net/

## Architecture de Sécurité

### Authentification

- **JWT Tokens**: Tokens JWT signés cryptographiquement valides 7 jours
- **SessionStorage**: Stockage sécurisé côté client (effacé à la fermeture du navigateur)
- **Authorization Header**: Transmission sécurisée du token via headers

### Protection

- **CSRF Protection**: Vérification de l'origin et referer
- **Rate Limiting**: Maximum 5 tentatives par 15 minutes par IP
- **Middleware**: Vérification du token sur chaque accès à /admin
- **Token Verification**: Signature et expiration vérifiées côté serveur

## Flux d'Authentification Sécurisé

\`\`\`
┌─────────────────────────────────────────────┐
│ 1. Utilisateur se connecte (login-form)     │
├─────────────────────────────────────────────┤
│ 2. POST /api/auth/login                     │
│    - Vérification credentials               │
│    - CSRF check (origin/referer)            │
│    - Rate limiting (IP)                     │
├─────────────────────────────────────────────┤
│ 3. Si succès: JWT token généré              │
│    - Signature cryptographique               │
│    - Expiration 7 jours                     │
├─────────────────────────────────────────────┤
│ 4. Token stocké en sessionStorage            │
│    - Pas accessible à XSS                   │
│    - Effacé à la fermeture du navigateur    │
├─────────────────────────────────────────────┤
│ 5. Accès aux routes /admin                  │
│    - Middleware vérifie le token            │
│    - Signature validée                      │
│    - Expiration vérifiée                    │
├─────────────────────────────────────────────┤
│ 6. Routes protégées par permissions         │
│    - Admin: accès complet                   │
│    - Editor: gestion projects/messages      │
│    - Viewer: lecture seule                  │
└─────────────────────────────────────────────┘
\`\`\`

## Gestion des Rôles et Permissions

### Rôles Disponibles

#### Admin
- Accès complet au dashboard
- Gestion des projets
- Gestion des messages
- Configuration des paramètres
- Gestion des utilisateurs

#### Editor
- Vue du dashboard
- Gestion des projets
- Consultation des messages

#### Viewer
- Vue du dashboard
- Consultation des projets

### Utiliser PermissionGuard

\`\`\`tsx
import { PermissionGuard } from "@/components/admin/permission-guard"

// Protéger une section complète
<PermissionGuard resource="projects">
  <ProjectsManager />
</PermissionGuard>

// Avec action spécifique
<PermissionGuard resource="users" action="manage">
  <Button>Gérer les utilisateurs</Button>
</PermissionGuard>

// Avec fallback
<PermissionGuard 
  resource="settings" 
  fallback={<p>Accès non autorisé</p>}
>
  <SettingsPanel />
</PermissionGuard>
\`\`\`

## Endpoints Disponibles

### POST /api/auth/login
Authentification utilisateur

**Request:**
\`\`\`json
{
  "username": "admin",
  "password": "password"
}
\`\`\`

**Response (Succès):**
\`\`\`json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
\`\`\`

**Response (Erreur):**
\`\`\`json
{
  "error": "Identifiants invalides"
}
\`\`\`

### GET /api/auth/verify
Vérifier la validité du token

**Header:**
\`\`\`
Authorization: Bearer eyJhbGc...
\`\`\`

**Response:**
\`\`\`json
{
  "authenticated": true,
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
\`\`\`

### POST /api/auth/logout
Déconnexion utilisateur

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Déconnecté avec succès"
}
\`\`\`

## Checklist de Sécurité

- [ ] JWT_SECRET configuré avec une valeur aléatoire forte
- [ ] ADMIN_USERNAME et ADMIN_PASSWORD changés de leurs valeurs par défaut
- [ ] NEXT_PUBLIC_SITE_URL pointant vers votre domaine
- [ ] Rate limiting activé sur /api/auth/login
- [ ] Middleware vérifiant les tokens JWT
- [ ] SessionStorage utilisé pour les tokens (pas localStorage)
- [ ] CSRF protection active
- [ ] Permissions testées pour chaque rôle
- [ ] Routes /admin inaccessibles sans authentification
- [ ] Token expiration vérifiée (7 jours)

## Dépannage

### Erreur "Trop de tentatives"
Le rate limiting (5 tentatives par 15 minutes) est déclenché.
**Solution:** Attendre 15 minutes ou nettoyer le localStorage/sessionStorage.

### Token invalide après actualisation
Le JWT_SECRET ne correspond pas entre sessions.
**Solution:** Vérifier que JWT_SECRET est cohérent en production.

### Accès refusé sans raison apparente
Les permissions peuvent bloquer l'accès à une ressource.
**Solution:** Vérifier le rôle de l'utilisateur et les permissions dans `lib/permissions.ts`.

### CSRF Error
L'origine de la requête n'est pas autorisée.
**Solution:** Vérifier que NEXT_PUBLIC_SITE_URL correspond à votre domaine actuel.

## Mises à Jour de Sécurité

### À Faire en Production

1. **Remplacer JWT** par une vraie librairie JWT (jsonwebtoken)
2. **Hash des passwords** avec bcrypt avant de les comparer
3. **Rate limiting Redis** au lieu de Map en mémoire
4. **Audit logging** pour les tentatives de connexion
5. **2FA/MFA** pour sécurité additionnelle
6. **HTTPS obligatoire** pour toutes les communications
7. **Rotation des tokens** pour les sessions longues
8. **Database** pour la gestion des utilisateurs et rôles

## Support

Pour toute question ou problème de sécurité, veuillez contacter l'équipe de développement.
