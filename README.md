# Installation

Installation des paquets
```
npm install
```
Installation de la base de donnée. Voir la config dans le fichier `config/database.json`
```
npm run db-up
```

## Démarrer StoryBook
Tests des différents composants React (le serveur est démarré sur `http://localhost:6006`)
```
npm run storybook
```

## Démarrer le mode développement
Le serveur est démarré sur `http://localhost:9080/`
```
npm run dev:server
npm run dev:client
npm run dev:appli
```
# Structure

## Dossiers
```
.
+-- .storybook      - configuration de la compilation de StoryBook
+-- build           - résultat de la compilation
+-- config          - configuration de l'application
+-- migrations      - fichiers de mises à jour de la base de donnée
+-- stories         - toutes les stories utilisées par storybook
+-- src
|   +-- client      - dossier contenant le fichier html de l'application
|   +-- server2     - application serveur
|   +-- shared      - application web (React)
|   +-- typings     - définition des objets entre le serveur et le client
```

## Serveur


## Client




