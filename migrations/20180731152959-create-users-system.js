'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable("user_group",{
    id: { type: "int", primaryKey: true, autoIncrement: true },
    nom: { type: "string", notNull: true, length: 45 }
  });
  await db.createTable("user_user",{
    id: { type: "int", primaryKey: true, autoIncrement: true },
    nom: { type: "string", notNull: true, length: 45 },
    prenom: { type: "string", notNull: true, length: 45 },
    login: { type: "string", notNull: true, length: 45 },
    pwd: { type: "string", notNull: true, length: 60 },
  });
  await db.createTable("user_permission",{
    id: { type: "int", primaryKey: true, autoIncrement: true },
    nom: { type: "string", notNull: true, length: 45 },
    description: { type: "string", length: 45 },
  });
  await db.createTable("user_group_has_user_permission",{
    user_group_id: { type: "int", primaryKey: true, notNull: true },
    user_permission_id: { type: "int", primaryKey: true, notNull: true },
  });
  await db.createTable("user_user_has_user_group",{
    user_user_id: { type: "int", primaryKey: true, notNull: true },
    user_group_id: { type: "int", primaryKey: true, notNull: true },
  });
  await db.insert("user_permission", ["id","nom","description"], [1, 'authentification', null],() => {});
  await db.insert("user_permission", ["id","nom","description"], [3,"users/users/view","Voir les utilisateurs"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [4,"users/permissions/view","Voir les droits"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [5,"users/permissions/add","Ajouter un droit"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [6,"users/permissions/remove","Supprimer un droit"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [7,"users/permissions/edit","Modifier les droits"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [8,"users/users/add","Ajouter un utilisateur"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [9,"users/users/edit","Modifier un utilisateur"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [10,"users/users/remove","Supprimer un utilisateur"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [11,"users/groups/add","Ajouter un groupe"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [12,"users/groups/edit","Modifier un groupe"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [13,"users/groups/remove","Supprimer un groupe"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [14,"users/groups/view","Voir les groupes"],() => {});
  await db.insert("user_permission", ["id","nom","description"], [15,"system/logs","Voir les logs de l'application"],() => {});
  return true;
};

exports.down = async function(db) {
  await db.dropTable("user_group");
  await db.dropTable("user_user");
  await db.dropTable("user_permission");
  await db.dropTable("user_group_has_user_permission");
  await db.dropTable("user_user_has_user_group");
  return true;
};

exports._meta = {
  "version": 1
};
