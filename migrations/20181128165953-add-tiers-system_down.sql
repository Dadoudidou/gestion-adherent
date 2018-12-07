ALTER TABLE `gestion`.`adherent_adherent` 
DROP FOREIGN KEY `tiers_id`;

ALTER TABLE `gestion`.`adherent_adherent` 
DROP INDEX `tiers_id_idx` ;

ALTER TABLE `adherent_adherent` 
DROP COLUMN `tiers_id`;

ALTER TABLE `gestion`.`adherent_adherent` 
ADD COLUMN `nom` varchar(45) NOT NULL AFTER `id`,
ADD COLUMN `prenom` varchar(45) NOT NULL AFTER `nom`,
ADD COLUMN `datenaissance` date NOT NULL AFTER `prenom`,
ADD COLUMN `male` tinyint(4) NOT NULL DEFAULT '0' AFTER `datenaissance`,
ADD COLUMN `adresse` varchar(45) DEFAULT NULL AFTER `male`,
ADD COLUMN `codepostal` varchar(45) DEFAULT NULL AFTER `adresse`,
ADD COLUMN `ville` varchar(45) DEFAULT NULL AFTER `codepostal`,
ADD COLUMN `telephone_fixe` varchar(10) DEFAULT NULL AFTER `numero_licence`,
ADD COLUMN `telephone_mobile` varchar(10) DEFAULT NULL AFTER `telephone_fixe`,
ADD COLUMN `email` varchar(45) DEFAULT NULL AFTER `telephone_mobile`;

DROP TABLE tiers;