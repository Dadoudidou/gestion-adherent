CREATE TABLE `comptabilite_facture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_creation` datetime NOT NULL,
  `comptabilite_tiers_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comptabilite_facture_compatbilite_tiers1_idx` (`comptabilite_tiers_id`),
  CONSTRAINT `fk_comptabilite_facture_compatbilite_tiers1` FOREIGN KEY (`comptabilite_tiers_id`) REFERENCES `comptabilite_tiers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `comptabilite_facture_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(45) NOT NULL,
  `description` text,
  `montant` decimal(10,0) NOT NULL,
  `ordre` int(11) DEFAULT NULL,
  `comptabilite_facture_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comptabilite_facture_detail_comptabilite_facture1_idx` (`comptabilite_facture_id`),
  CONSTRAINT `fk_comptabilite_facture_detail_comptabilite_facture1` FOREIGN KEY (`comptabilite_facture_id`) REFERENCES `comptabilite_facture` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

CREATE TABLE `comptabilite_facture_paiement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `montant` decimal(10,0) NOT NULL,
  `date_banque` date DEFAULT NULL,
  `reference` varchar(45) DEFAULT NULL,
  `banque` varchar(45) DEFAULT NULL,
  `valide` tinyint(4) NOT NULL DEFAULT '0',
  `comptabilite_facture_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comptabilite_facture_paiement_comptabilite_facture1_idx` (`comptabilite_facture_id`),
  CONSTRAINT `fk_comptabilite_facture_paiement_comptabilite_facture1` FOREIGN KEY (`comptabilite_facture_id`) REFERENCES `comptabilite_facture` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `comptabilite_tiers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `codepostal` varchar(6) DEFAULT NULL,
  `ville` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telephone_fixe` varchar(10) DEFAULT NULL,
  `telephone_mobile` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
