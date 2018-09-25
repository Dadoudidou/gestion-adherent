CREATE TABLE `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_group_has_user_permission` (
  `user_group_id` int(11) NOT NULL,
  `user_permission_id` int(11) NOT NULL,
  PRIMARY KEY (`user_group_id`,`user_permission_id`)
);


CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `login` varchar(45) NOT NULL,
  `pwd` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `user_user_has_user_group` (
  `user_user_id` int(11) NOT NULL,
  `user_group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_user_id`,`user_group_id`)
);
