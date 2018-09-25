CREATE TABLE `sys_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(30) DEFAULT NULL,
  `level` varchar(16) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `message` text,
  `meta` text,
  `user_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_log_user_user1_idx` (`user_user_id`),
  CONSTRAINT `fk_sys_log_user_user1` FOREIGN KEY (`user_user_id`) REFERENCES `user_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `sys_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `valeur` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
