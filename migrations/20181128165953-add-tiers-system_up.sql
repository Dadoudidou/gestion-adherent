CREATE TABLE `tiers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `datenaissance` date NOT NULL,
  `male` tinyint(4) NOT NULL DEFAULT '0',
  `adresse` varchar(45) DEFAULT NULL,
  `codepostal` varchar(45) DEFAULT NULL,
  `ville` varchar(45) DEFAULT NULL,
  `telephone_fixe` varchar(10) DEFAULT NULL,
  `telephone_mobile` varchar(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `adherent_adherent` 
DROP COLUMN `email`,
DROP COLUMN `telephone_mobile`,
DROP COLUMN `telephone_fixe`,
DROP COLUMN `ville`,
DROP COLUMN `codepostal`,
DROP COLUMN `adresse`,
DROP COLUMN `male`,
DROP COLUMN `datenaissance`,
DROP COLUMN `prenom`,
DROP COLUMN `nom`,
ADD COLUMN `tiers_id` INT NOT NULL AFTER `numero_licence`,
ADD INDEX `tiers_id_idx` (`tiers_id` ASC);

ALTER TABLE `adherent_adherent` 
ADD CONSTRAINT `tiers_id`
  FOREIGN KEY (`tiers_id`)
  REFERENCES `tiers` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;