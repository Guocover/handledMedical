CREATE DATABASE  IF NOT EXISTS `handheldmedical` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `handheldmedical`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: handheldmedical
-- ------------------------------------------------------
-- Server version	5.5.19

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
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `answer_id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(200) NOT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `doctor_name` varchar(45) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`answer_id`),
  UNIQUE KEY `answer_id_UNIQUE` (`answer_id`),
  KEY `question_id_idx` (`question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` varchar(600) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  UNIQUE KEY `article_id_UNIQUE` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `job` varchar(20) NOT NULL,
  `hospital` varchar(30) NOT NULL,
  `telephone` int(11) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `doctor_account` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `direction` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  UNIQUE KEY `douctor_id_UNIQUE` (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(100) NOT NULL,
  `answer` varchar(200) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `modifyTime` timestamp NULL DEFAULT NULL,
  `user_account` varchar(20) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `doctor_name` varchar(20) DEFAULT NULL,
  `sex` int(1) NOT NULL,
  `age` int(3) NOT NULL,
  PRIMARY KEY (`question_id`),
  UNIQUE KEY `question_id_UNIQUE` (`question_id`),
  KEY `user_id_idx` (`user_account`),
  KEY `doctor_id_idx` (`doctor_id`),
  CONSTRAINT `doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `account` varchar(20) CHARACTER SET latin1 NOT NULL,
  `password` varchar(20) CHARACTER SET latin1 NOT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `type` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `account_UNIQUE` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_doctor`
--

DROP TABLE IF EXISTS `user_doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_doctor` (
  `ud_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `keep` int(1) DEFAULT '0',
  `evaluate` int(1) DEFAULT '0',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ud_id`),
  UNIQUE KEY `ud_id_UNIQUE` (`ud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-22 21:48:26
