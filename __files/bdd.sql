-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestion
-- ------------------------------------------------------
-- Server version	5.5.39-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adherent_adherent`
--

DROP TABLE IF EXISTS `adherent_adherent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adherent_adherent`
--

LOCK TABLES `adherent_adherent` WRITE;
/*!40000 ALTER TABLE `adherent_adherent` DISABLE KEYS */;
/*!40000 ALTER TABLE `adherent_adherent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adherent_adherent_has_comptabilite_tiers`
--

DROP TABLE IF EXISTS `adherent_adherent_has_comptabilite_tiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adherent_adherent_has_comptabilite_tiers` (
  `adherent_adherent_id` int(11) NOT NULL,
  `compatbilite_tiers_id` int(11) NOT NULL,
  PRIMARY KEY (`adherent_adherent_id`,`compatbilite_tiers_id`),
  KEY `fk_adherent_adherent_has_compatbilite_tiers_compatbilite_ti_idx` (`compatbilite_tiers_id`),
  KEY `fk_adherent_adherent_has_compatbilite_tiers_adherent_adhere_idx` (`adherent_adherent_id`),
  CONSTRAINT `fk_adherent_adherent_has_compatbilite_tiers_adherent_adherent1` FOREIGN KEY (`adherent_adherent_id`) REFERENCES `adherent_adherent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_adherent_adherent_has_compatbilite_tiers_compatbilite_tiers1` FOREIGN KEY (`compatbilite_tiers_id`) REFERENCES `comptabilite_tiers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adherent_adherent_has_comptabilite_tiers`
--

LOCK TABLES `adherent_adherent_has_comptabilite_tiers` WRITE;
/*!40000 ALTER TABLE `adherent_adherent_has_comptabilite_tiers` DISABLE KEYS */;
/*!40000 ALTER TABLE `adherent_adherent_has_comptabilite_tiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adherent_adhesion`
--

DROP TABLE IF EXISTS `adherent_adhesion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adherent_adhesion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valide` tinyint(4) NOT NULL DEFAULT '0',
  `adherent_adherent_id` int(11) NOT NULL,
  `admin_activite_section_id` int(11) NOT NULL,
  `admin_tarif_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_adherent_adhesion_adherent_adherent1_idx` (`adherent_adherent_id`),
  KEY `fk_adherent_adhesion_admin_activite_section1_idx` (`admin_activite_section_id`),
  KEY `fk_adherent_adhesion_admin_tarif1_idx` (`admin_tarif_id`),
  CONSTRAINT `fk_adherent_adhesion_adherent_adherent1` FOREIGN KEY (`adherent_adherent_id`) REFERENCES `adherent_adherent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_adherent_adhesion_admin_activite_section1` FOREIGN KEY (`admin_activite_section_id`) REFERENCES `admin_activite_section` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_adherent_adhesion_admin_tarif1` FOREIGN KEY (`admin_tarif_id`) REFERENCES `admin_tarif` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adherent_adhesion`
--

LOCK TABLES `adherent_adhesion` WRITE;
/*!40000 ALTER TABLE `adherent_adhesion` DISABLE KEYS */;
/*!40000 ALTER TABLE `adherent_adhesion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adherent_adhesion_session`
--

DROP TABLE IF EXISTS `adherent_adhesion_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adherent_adhesion_session` (
  `adherent_adhesion_id` int(11) NOT NULL,
  `admin_activite_session_id` int(11) NOT NULL,
  KEY `fk_adherent_adhesion_session_adherent_adhesion1_idx` (`adherent_adhesion_id`),
  KEY `fk_adherent_adhesion_session_admin_activite_session1_idx` (`admin_activite_session_id`),
  CONSTRAINT `fk_adherent_adhesion_session_adherent_adhesion1` FOREIGN KEY (`adherent_adhesion_id`) REFERENCES `adherent_adhesion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_adherent_adhesion_session_admin_activite_session1` FOREIGN KEY (`admin_activite_session_id`) REFERENCES `admin_activite_session` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adherent_adhesion_session`
--

LOCK TABLES `adherent_adhesion_session` WRITE;
/*!40000 ALTER TABLE `adherent_adhesion_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `adherent_adhesion_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adherent_document`
--

DROP TABLE IF EXISTS `adherent_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adherent_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `date_creation` datetime NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `document` blob NOT NULL,
  `validite` varchar(45) DEFAULT NULL COMMENT 'durée au format ISO8601',
  `adherent_adherent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_adherent_document_adherent_adherent1_idx` (`adherent_adherent_id`),
  CONSTRAINT `fk_adherent_document_adherent_adherent1` FOREIGN KEY (`adherent_adherent_id`) REFERENCES `adherent_adherent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adherent_document`
--

LOCK TABLES `adherent_document` WRITE;
/*!40000 ALTER TABLE `adherent_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `adherent_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adherent_licence`
--

DROP TABLE IF EXISTS `adherent_licence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adherent_licence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tshirt` varchar(5) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `dernier_club` varchar(45) DEFAULT NULL,
  `adherent_adherent_id` int(11) NOT NULL,
  `admin_licence_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_adherent_licence_adherent_adherent1_idx` (`adherent_adherent_id`),
  KEY `fk_adherent_licence_admin_licence1_idx` (`admin_licence_id`),
  CONSTRAINT `fk_adherent_licence_adherent_adherent1` FOREIGN KEY (`adherent_adherent_id`) REFERENCES `adherent_adherent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_adherent_licence_admin_licence1` FOREIGN KEY (`admin_licence_id`) REFERENCES `admin_licence` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adherent_licence`
--

LOCK TABLES `adherent_licence` WRITE;
/*!40000 ALTER TABLE `adherent_licence` DISABLE KEYS */;
/*!40000 ALTER TABLE `adherent_licence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_activite_activite`
--

DROP TABLE IF EXISTS `admin_activite_activite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_activite_activite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `admin_activite_categorie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_activite_activite_activite_categorie_idx` (`admin_activite_categorie_id`),
  CONSTRAINT `fk_activite_activite_activite_categorie` FOREIGN KEY (`admin_activite_categorie_id`) REFERENCES `admin_activite_categorie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_activite_activite`
--

LOCK TABLES `admin_activite_activite` WRITE;
/*!40000 ALTER TABLE `admin_activite_activite` DISABLE KEYS */;
INSERT INTO `admin_activite_activite` VALUES (1,'Bureau',1),(2,'Encadrant',1),(3,'Natation',2),(4,'Water-Polo',2),(5,'Aquaforme',3),(6,'Natation',3);
/*!40000 ALTER TABLE `admin_activite_activite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_activite_categorie`
--

DROP TABLE IF EXISTS `admin_activite_categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_activite_categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `admin_saison_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_activite_categorie_Saison1_idx` (`admin_saison_id`),
  CONSTRAINT `fk_activite_categorie_Saison1` FOREIGN KEY (`admin_saison_id`) REFERENCES `admin_saison` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_activite_categorie`
--

LOCK TABLES `admin_activite_categorie` WRITE;
/*!40000 ALTER TABLE `admin_activite_categorie` DISABLE KEYS */;
INSERT INTO `admin_activite_categorie` VALUES (1,'Bénévoles',1),(2,'Compétition',1),(3,'Loisir',1);
/*!40000 ALTER TABLE `admin_activite_categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_activite_section`
--

DROP TABLE IF EXISTS `admin_activite_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_activite_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `admin_activite_activite_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_activite_section_activite_activite1_idx` (`admin_activite_activite_id`),
  CONSTRAINT `fk_activite_section_activite_activite1` FOREIGN KEY (`admin_activite_activite_id`) REFERENCES `admin_activite_activite` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_activite_section`
--

LOCK TABLES `admin_activite_section` WRITE;
/*!40000 ALTER TABLE `admin_activite_section` DISABLE KEYS */;
INSERT INTO `admin_activite_section` VALUES (1,'President',1),(2,'Trésorier',1),(3,'Secrétaire',1),(4,'Membre',1),(5,'Encadrant',2),(6,'Minime',3),(7,'Cadet',3),(8,'Elite',3),(9,'Creps',3),(10,'Water-Polo',4),(11,'Aquagym',5),(12,'AquaPalming',5),(13,'Adolescent',6),(14,'Adulte',6);
/*!40000 ALTER TABLE `admin_activite_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_activite_session`
--

DROP TABLE IF EXISTS `admin_activite_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_activite_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jour` int(11) NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL,
  `place` int(11) NOT NULL,
  `admin_activite_section_id` int(11) NOT NULL,
  `admin_lieu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_activite_session_activite_section1_idx` (`admin_activite_section_id`),
  KEY `fk_activite_session_lieu1_idx` (`admin_lieu_id`),
  CONSTRAINT `fk_activite_session_activite_section1` FOREIGN KEY (`admin_activite_section_id`) REFERENCES `admin_activite_section` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_activite_session_lieu1` FOREIGN KEY (`admin_lieu_id`) REFERENCES `admin_lieu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_activite_session`
--

LOCK TABLES `admin_activite_session` WRITE;
/*!40000 ALTER TABLE `admin_activite_session` DISABLE KEYS */;
INSERT INTO `admin_activite_session` VALUES (3,2,'20:15:00','21:30:00',50,10,1),(4,4,'20:00:00','21:30:00',50,10,1);
/*!40000 ALTER TABLE `admin_activite_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_licence`
--

DROP TABLE IF EXISTS `admin_licence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_licence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `montant` decimal(10,0) NOT NULL,
  `restriction_age_min` int(11) DEFAULT NULL,
  `restriction_age_max` int(11) DEFAULT NULL,
  `admin_saison_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_admin_licence_admin_saison1_idx` (`admin_saison_id`),
  CONSTRAINT `fk_admin_licence_admin_saison1` FOREIGN KEY (`admin_saison_id`) REFERENCES `admin_saison` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_licence`
--

LOCK TABLES `admin_licence` WRITE;
/*!40000 ALTER TABLE `admin_licence` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_licence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_lieu`
--

DROP TABLE IF EXISTS `admin_lieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_lieu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `codepostal` varchar(45) DEFAULT NULL,
  `ville` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_lieu`
--

LOCK TABLES `admin_lieu` WRITE;
/*!40000 ALTER TABLE `admin_lieu` DISABLE KEYS */;
INSERT INTO `admin_lieu` VALUES (1,'Centre Nautique','avenue du 11 novembre 1918','18000','Bourges');
/*!40000 ALTER TABLE `admin_lieu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_saison`
--

DROP TABLE IF EXISTS `admin_saison`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_saison` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_saison`
--

LOCK TABLES `admin_saison` WRITE;
/*!40000 ALTER TABLE `admin_saison` DISABLE KEYS */;
INSERT INTO `admin_saison` VALUES (1,'2017-09-01 00:00:00','2018-06-30 00:00:00','Saison 2017-2018');
/*!40000 ALTER TABLE `admin_saison` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_tarif`
--

DROP TABLE IF EXISTS `admin_tarif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_tarif` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nbsessionmin` int(11) DEFAULT NULL,
  `nbsessionmax` int(11) DEFAULT NULL,
  `carte` tinyint(4) DEFAULT NULL,
  `carte_nbsession` int(11) DEFAULT NULL,
  `montant` decimal(10,0) NOT NULL,
  `admin_saison_id` int(11) NOT NULL,
  `admin_activite_section_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_admin_tarif_admin_saison1_idx` (`admin_saison_id`),
  KEY `fk_admin_tarif_admin_activite_section1_idx` (`admin_activite_section_id`),
  CONSTRAINT `fk_admin_tarif_admin_saison1` FOREIGN KEY (`admin_saison_id`) REFERENCES `admin_saison` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_admin_tarif_admin_activite_section1` FOREIGN KEY (`admin_activite_section_id`) REFERENCES `admin_activite_section` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_tarif`
--

LOCK TABLES `admin_tarif` WRITE;
/*!40000 ALTER TABLE `admin_tarif` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_tarif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comptabilite_facture`
--

DROP TABLE IF EXISTS `comptabilite_facture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comptabilite_facture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_creation` datetime NOT NULL,
  `compatbilite_tiers_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comptabilite_facture_compatbilite_tiers1_idx` (`compatbilite_tiers_id`),
  CONSTRAINT `fk_comptabilite_facture_compatbilite_tiers1` FOREIGN KEY (`compatbilite_tiers_id`) REFERENCES `comptabilite_tiers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comptabilite_facture`
--

LOCK TABLES `comptabilite_facture` WRITE;
/*!40000 ALTER TABLE `comptabilite_facture` DISABLE KEYS */;
/*!40000 ALTER TABLE `comptabilite_facture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comptabilite_facture_detail`
--

DROP TABLE IF EXISTS `comptabilite_facture_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comptabilite_facture_detail`
--

LOCK TABLES `comptabilite_facture_detail` WRITE;
/*!40000 ALTER TABLE `comptabilite_facture_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `comptabilite_facture_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comptabilite_facture_paiement`
--

DROP TABLE IF EXISTS `comptabilite_facture_paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comptabilite_facture_paiement`
--

LOCK TABLES `comptabilite_facture_paiement` WRITE;
/*!40000 ALTER TABLE `comptabilite_facture_paiement` DISABLE KEYS */;
/*!40000 ALTER TABLE `comptabilite_facture_paiement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comptabilite_tiers`
--

DROP TABLE IF EXISTS `comptabilite_tiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comptabilite_tiers`
--

LOCK TABLES `comptabilite_tiers` WRITE;
/*!40000 ALTER TABLE `comptabilite_tiers` DISABLE KEYS */;
/*!40000 ALTER TABLE `comptabilite_tiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_log`
--

DROP TABLE IF EXISTS `sys_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_log`
--

LOCK TABLES `sys_log` WRITE;
/*!40000 ALTER TABLE `sys_log` DISABLE KEYS */;
INSERT INTO `sys_log` VALUES (1,'2018-02-28T10:45:06.187Z','info','log','Serveur démarré à l\'url : http://localhost:9080','{}',NULL);
/*!40000 ALTER TABLE `sys_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_option`
--

DROP TABLE IF EXISTS `sys_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `valeur` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_option`
--

LOCK TABLES `sys_option` WRITE;
/*!40000 ALTER TABLE `sys_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (1,'administrateur');
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group_has_user_permission`
--

DROP TABLE IF EXISTS `user_group_has_user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group_has_user_permission` (
  `user_group_id` int(11) NOT NULL,
  `user_permission_id` int(11) NOT NULL,
  PRIMARY KEY (`user_group_id`,`user_permission_id`),
  KEY `fk_user_group_has_user_permission_user_permission1_idx` (`user_permission_id`),
  KEY `fk_user_group_has_user_permission_user_group1_idx` (`user_group_id`),
  CONSTRAINT `fk_user_group_has_user_permission_user_group1` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_group_has_user_permission_user_permission1` FOREIGN KEY (`user_permission_id`) REFERENCES `user_permission` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group_has_user_permission`
--

LOCK TABLES `user_group_has_user_permission` WRITE;
/*!40000 ALTER TABLE `user_group_has_user_permission` DISABLE KEYS */;
INSERT INTO `user_group_has_user_permission` VALUES (1,1);
/*!40000 ALTER TABLE `user_group_has_user_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
INSERT INTO `user_permission` VALUES (1,'authentification',NULL),(3,'users/users/view','Voir les utilisateurs'),(4,'users/permissions/view','Voir les droits'),(5,'users/permissions/add','Ajouter un droit'),(6,'users/permissions/remove','Supprimer un droit'),(7,'users/permissions/edit','Modifier les droits'),(8,'users/users/add','Ajouter un utilisateur'),(9,'users/users/edit','Modifier un utilisateur'),(10,'users/users/remove','Supprimer un utilisateur'),(11,'users/groups/add','Ajouter un groupe'),(12,'users/groups/edit','Modifier un groupe'),(13,'users/groups/remove','Supprimer un groupe'),(14,'users/groups/view','Voir les groupes'),(15,'system/logs','Voir les logs de l\'application');
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user`
--

DROP TABLE IF EXISTS `user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `login` varchar(45) NOT NULL,
  `pwd` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user`
--

LOCK TABLES `user_user` WRITE;
/*!40000 ALTER TABLE `user_user` DISABLE KEYS */;
INSERT INTO `user_user` VALUES (1,'Violet','David','dviolet','$2a$10$py8t1UQXS8Oc5w37OvB99.vzNSIvpSKcO9sqna41qwtSKAzBtSAOW');
/*!40000 ALTER TABLE `user_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_has_user_group`
--

DROP TABLE IF EXISTS `user_user_has_user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user_has_user_group` (
  `user_user_id` int(11) NOT NULL,
  `user_group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_user_id`,`user_group_id`),
  KEY `fk_user_user_has_user_group_user_group1_idx` (`user_group_id`),
  KEY `fk_user_user_has_user_group_user_user1_idx` (`user_user_id`),
  CONSTRAINT `fk_user_user_has_user_group_user_user1` FOREIGN KEY (`user_user_id`) REFERENCES `user_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_user_has_user_group_user_group1` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_has_user_group`
--

LOCK TABLES `user_user_has_user_group` WRITE;
/*!40000 ALTER TABLE `user_user_has_user_group` DISABLE KEYS */;
INSERT INTO `user_user_has_user_group` VALUES (1,1);
/*!40000 ALTER TABLE `user_user_has_user_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-02  9:24:29
