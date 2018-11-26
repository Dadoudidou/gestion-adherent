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
npm run dev
npm run start
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
|   +-- client2      - dossier contenant le fichier html de l'application
|   +-- server2     - application serveur
|   +-- typings     - définition des objets entre le serveur et le client
```

## Serveur
```
.
+-- config          - programme de configuration du serveur
+-- database2       - couche d'accès à la base de donnée
+-- graphql         - api graphql
+-- routes          - routes de l'application
+-- utils           - divers utilitaires
```

### Config
Utilisation du fichier `.env` afin de configurer l'envirronnement de travail.

### Database2

#### création d'une table
- créer un fichier dans Models
- création de 3 types :
   - instance
   - attributs
   - associations
- création d'un export par défaut d'un objet `DatabaseModel<instance, attributs>`
- compléter les types dans `index.ts` : `ModelsNames` et `InstancesModels`;

Type Instance : le type instance définit les objets retournées par les requêtes. Ce type inclut le type association.

Type Attribut : définit les variables membres de la table bdd

Type Association: définit les associations avec les autres tables

L'objet DataModel: 
```
tableName: string
attributes: DefineAttributes<TAttributes>
options?: Sequelize.DefineOptions<TInstance>
relations?: DatabaseModelRelation<DatabaseModelRelationType>[]
```

### graphql

#### création d'une Query
- créer un fichier dans le dossier V1/queries
- export par défaut d'un objet `GQLField<arguments da la query>`

Le contexte est un `GraphQLContext (index.ts)` qui est configuré dans l'application. Il permet d'accèder à la base de donnée, à la requête Http, aux information d'identifications et au logger.

#### création d'une Mutation
- créer un fichier dans le dossier V1/mutations

### routes

## Client




