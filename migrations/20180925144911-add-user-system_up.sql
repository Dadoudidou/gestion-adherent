CREATE TABLE IF NOT EXISTS `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_group_has_user_permission` (
  `user_group_id` int(11) NOT NULL,
  `user_permission_id` int(11) NOT NULL,
  PRIMARY KEY (`user_group_id`,`user_permission_id`)
);

CREATE TABLE IF NOT EXISTS `user_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `login` varchar(45) NOT NULL,
  `pwd` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `user_user_has_user_group` (
  `user_user_id` int(11) NOT NULL,
  `user_group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_user_id`,`user_group_id`)
);

INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (1,'authentification',NULL) ON DUPLICATE KEY UPDATE ID = 1;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (3,'users/users/view','Voir les utilisateurs') ON DUPLICATE KEY UPDATE ID = 3;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (4,'users/permissions/view','Voir les droits') ON DUPLICATE KEY UPDATE ID = 4;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (5,'users/permissions/add','Ajouter un droit') ON DUPLICATE KEY UPDATE ID = 5;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (6,'users/permissions/remove','Supprimer un droit') ON DUPLICATE KEY UPDATE ID = 6;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (7,'users/permissions/edit','Modifier les droits') ON DUPLICATE KEY UPDATE ID = 7;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (8,'users/users/add','Ajouter un utilisateur') ON DUPLICATE KEY UPDATE ID = 8;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (9,'users/users/edit','Modifier un utilisateur') ON DUPLICATE KEY UPDATE ID = 9;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (10,'users/users/remove','Supprimer un utilisateur') ON DUPLICATE KEY UPDATE ID = 10;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (11,'users/groups/add','Ajouter un groupe') ON DUPLICATE KEY UPDATE ID = 11;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (12,'users/groups/edit','Modifier un groupe') ON DUPLICATE KEY UPDATE ID = 12;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (13,'users/groups/remove','Supprimer un groupe') ON DUPLICATE KEY UPDATE ID = 13;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (14,'users/groups/view','Voir les groupes') ON DUPLICATE KEY UPDATE ID = 14;
INSERT INTO `user_permission` (`id`,`nom`,`description`) VALUES (15,'system/logs',"Voir les logs de l'application") ON DUPLICATE KEY UPDATE ID = 15;

INSERT INTO `user_group` (`id`,`nom`) VALUES (1,`administrator`)  ON DUPLICATE KEY UPDATE ID = 1;

INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,1);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,3);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,4);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,5);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,6);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,7);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,8);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,9);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,10);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,11);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,12);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,13);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,14);
INSERT INTO `user_group_has_user_permission` (`user_group_id`,`user_permission_id`) VALUES(1,15);