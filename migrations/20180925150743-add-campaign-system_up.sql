CREATE TABLE `adherent_adherent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `datenaissance` date NOT NULL,
  `male` tinyint(4) NOT NULL DEFAULT '0',
  `adresse` varchar(45) DEFAULT NULL,
  `codepostal` varchar(45) DEFAULT NULL,
  `ville` varchar(45) DEFAULT NULL,
  `numero_licence` varchar(45) DEFAULT NULL,
  `telephone_fixe` varchar(10) DEFAULT NULL,
  `telephone_mobile` varchar(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `adherent_adhesion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valide` tinyint(4) NOT NULL DEFAULT '0',
  `adherent_adherent_id` int(11) NOT NULL,
  `admin_activite_section_id` int(11) NOT NULL,
  `admin_tarif_id` int(11) NOT NULL,
  `comptabilite_facture_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

CREATE TABLE `adherent_adhesion_session` (
  `adherent_adhesion_id` int(11) NOT NULL,
  `admin_activite_session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `adherent_admin_licence` (
  `adherent_adherent_id` int(11) NOT NULL,
  `admin_licence_id` int(11) NOT NULL,
  `tshirt` varchar(5) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `dernier_club` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`adherent_adherent_id`,`admin_licence_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `adherent_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `date_creation` datetime NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `document` blob NOT NULL,
  `validite` varchar(45) DEFAULT NULL COMMENT 'durée au format ISO8601',
  `adherent_adherent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `adherent_licence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tshirt` varchar(5) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `dernier_club` varchar(45) DEFAULT NULL,
  `adherent_adherent_id` int(11) NOT NULL,
  `admin_licence_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `admin_activite_activite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `admin_activite_categorie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `admin_activite_categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `admin_saison_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `admin_activite_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `admin_activite_activite_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

CREATE TABLE `admin_activite_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jour` int(11) NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL,
  `place` int(11) NOT NULL,
  `admin_activite_section_id` int(11) NOT NULL,
  `admin_lieu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE `admin_licence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `montant` decimal(10,0) NOT NULL,
  `restriction_age_min` int(11) DEFAULT NULL,
  `restriction_age_max` int(11) DEFAULT NULL,
  `admin_saison_id` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `admin_lieu` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `codepostal` varchar(45) DEFAULT NULL,
  `ville` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `admin_saison` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `admin_tarif` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nbsessionmin` int(11) DEFAULT NULL,
  `nbsessionmax` int(11) DEFAULT NULL,
  `carte` tinyint(4) DEFAULT NULL,
  `carte_nbsession` int(11) DEFAULT NULL,
  `montant` decimal(10,0) NOT NULL,
  `restriction_date_debut` datetime DEFAULT NULL,
  `restriction_date_fin` datetime DEFAULT NULL,
  `admin_saison_id` int(11) NOT NULL,
  `admin_activite_section_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
