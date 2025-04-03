-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: utn_cms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agreements`
--

DROP TABLE IF EXISTS `agreements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agreements` (
  `id_agreement` int NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `sign_date` date DEFAULT NULL,
  `signatory` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`id_agreement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agreements`
--

LOCK TABLES `agreements` WRITE;
/*!40000 ALTER TABLE `agreements` DISABLE KEYS */;
/*!40000 ALTER TABLE `agreements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `id_asset` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`id_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit`
--

DROP TABLE IF EXISTS `audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit` (
  `id_audit` int NOT NULL AUTO_INCREMENT,
  `audit_table` varchar(255) DEFAULT NULL,
  `audit_action` varchar(255) DEFAULT NULL,
  `audit_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_in_charge` int DEFAULT NULL,
  PRIMARY KEY (`id_audit`),
  KEY `user_in_charge` (`user_in_charge`),
  CONSTRAINT `audit_ibfk_1` FOREIGN KEY (`user_in_charge`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit`
--

LOCK TABLES `audit` WRITE;
/*!40000 ALTER TABLE `audit` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `certificate_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `year_of_issue` int NOT NULL,
  `is_international` tinyint(1) NOT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`certificate_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `certificate_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `chapter_id` int NOT NULL AUTO_INCREMENT,
  `chapter_name` varchar(255) NOT NULL,
  `hours` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`chapter_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (1,'Networking Today',1,'2022-02-15 20:03:00','2022-02-15 20:04:00','2025-01-16 20:05:11','2025-01-16 20:05:11',NULL),(2,'Basic Switch and End Device Configuration',1,'2022-02-15 20:05:00','2022-02-15 20:06:00','2025-01-16 20:06:13','2025-01-16 20:06:13',NULL),(3,'Protocols and Models',2,'2022-02-16 20:06:00','2022-02-16 20:06:00','2025-01-16 20:07:05','2025-01-16 20:07:05',NULL),(4,'Physical Layer',2,'2022-02-17 20:07:00','2022-02-17 20:07:00','2025-01-16 20:07:58','2025-01-16 20:07:58',NULL),(5,'Laboratorio Capitulo 1 y 2',2,'2022-02-22 20:13:00','2022-02-22 20:13:00','2025-01-16 20:14:08','2025-01-16 20:14:08',NULL),(6,'Laboratorios Capitulo 3',2,'2022-02-23 20:14:00','2022-02-23 20:15:00','2025-01-16 20:15:17','2025-01-16 20:15:17',NULL),(7,'Laboratorios Capitulo 4',2,'2022-02-24 20:15:00','2022-02-24 20:15:00','2025-01-16 20:16:11','2025-01-16 20:16:11',NULL),(8,'Number Systems',1,'2022-03-01 20:17:00','2022-03-01 20:17:00','2025-01-16 20:17:22','2025-01-16 20:17:22',NULL),(9,'Data Link Layer',1,'2022-03-01 20:17:00','2022-03-01 20:17:00','2025-01-16 20:18:08','2025-01-16 20:18:08',NULL),(10,'Ethernet Switching',2,'2022-03-02 20:18:00','2022-03-02 20:18:00','2025-01-16 20:18:58','2025-01-16 20:18:58',NULL),(11,'Network Layer',1,'2022-03-03 20:19:00','2022-03-03 20:19:00','2025-01-16 20:19:39','2025-01-16 20:19:39',NULL),(12,'Addresss Resolution',1,'2022-03-03 20:20:00','2022-03-03 20:20:00','2025-01-16 20:20:31','2025-01-16 20:20:31',NULL),(13,'Laboratorios Capitulos 5 y 6',2,'2022-03-09 01:20:00','2022-03-09 01:21:00','2025-01-16 20:21:15','2025-01-16 20:21:15',NULL),(14,'Laboratorio Capitulo 7',2,'2022-03-09 20:21:00','2022-03-09 20:21:00','2025-01-16 20:22:05','2025-01-16 20:22:05',NULL),(15,'Laboratorios Capitulo 8 y 9',2,'2022-03-10 20:22:00','2022-03-10 20:22:00','2025-01-16 20:22:43','2025-01-16 20:22:43',NULL),(16,'Basic Router Configuration',1,'2022-03-15 19:18:00','2022-03-15 19:19:00','2025-01-17 19:19:27','2025-01-17 19:19:27',NULL),(17,'IPv4 Addressing & subnets',1,'2022-03-15 19:20:00','2022-03-15 19:20:00','2025-01-17 19:20:36','2025-01-17 19:20:36',NULL),(18,'IPv6 Addressing',2,'2022-03-16 18:00:00','2022-03-15 18:00:00','2025-01-17 19:21:29','2025-01-17 19:21:29',NULL),(19,'ICMP',2,'2022-03-17 18:00:00','2022-03-17 18:00:00','2025-01-17 19:22:05','2025-01-17 19:22:05',NULL),(20,'Laboratorios Capitulo 10 y 11',2,'2022-03-22 18:00:00','2022-03-22 18:00:00','2025-01-17 19:23:16','2025-01-17 19:23:16',NULL),(21,'Laboratorios Capitulo 12',2,'2022-03-23 18:00:00','2022-03-23 18:00:00','2025-01-17 19:24:06','2025-01-17 19:24:06',NULL),(22,'Laboratorios Capitulo 13',2,'2022-03-24 18:00:00','2022-03-24 18:00:00','2025-01-17 19:24:50','2025-01-17 19:24:50',NULL),(23,'Transport Layer',2,'2022-03-29 18:00:00','2022-03-29 18:00:00','2025-01-17 19:28:17','2025-01-17 19:28:17',NULL),(24,'Application Layer',1,'2022-03-30 18:00:00','2022-03-30 18:00:00','2025-01-17 19:29:23','2025-01-17 19:29:23',NULL),(25,'Network Security Fundamentals',1,'2022-03-30 18:30:00','2022-03-30 18:30:00','2025-01-17 19:30:10','2025-01-17 19:30:10',NULL),(26,'Build a Small Network',2,'2022-03-31 18:00:00','2022-03-31 18:00:00','2025-01-17 19:30:54','2025-01-17 19:30:54',NULL),(27,'Laboratorios Capitulo 14',2,'2022-04-05 18:00:00','2022-04-05 18:00:00','2025-01-17 19:32:51','2025-01-17 19:32:51',NULL),(28,'Laboratorios Capitulo 15 y 16',2,'2022-04-06 18:00:00','2022-04-06 18:00:00','2025-01-17 19:33:24','2025-01-17 19:33:24',NULL),(29,'Laboratorios Capitulo 17',2,'2022-04-07 18:00:00','2022-04-07 18:00:00','2025-01-17 19:34:05','2025-01-17 19:34:05',NULL);
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost`
--

DROP TABLE IF EXISTS `cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost` (
  `cost_id` int NOT NULL AUTO_INCREMENT,
  `amount` varchar(255) NOT NULL,
  `description` varchar(600) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`cost_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `cost_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost`
--

LOCK TABLES `cost` WRITE;
/*!40000 ALTER TABLE `cost` DISABLE KEYS */;
INSERT INTO `cost` VALUES (1,'80','Costo Curso','2025-01-23 19:42:10','2025-01-23 19:42:10',1),(2,'130','Costo Curso','2025-01-23 19:42:10','2025-01-23 19:42:10',1);
/*!40000 ALTER TABLE `cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `start_registration_date` datetime DEFAULT NULL,
  `end_registration_date` datetime DEFAULT NULL,
  `start_enrollment_date` datetime DEFAULT NULL,
  `end_enrollment_date` datetime DEFAULT NULL,
  `detail_id` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `created_by` (`created_by`),
  KEY `detail_id` (`detail_id`),
  CONSTRAINT `course_detail_id_foreign_idx` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`detail_id`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `course_ibfk_2` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'CCNAv7 Introduction to Networks (Español - 7.02)','2022-02-15 18:00:00','2022-04-10 18:00:00','Finalizado','2025-01-13 21:02:48','2025-01-13 21:02:48',NULL,'2022-01-20 18:00:00','2022-01-31 18:00:00','2022-02-01 18:00:00','2022-02-10 18:00:00',1);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_chapter`
--

DROP TABLE IF EXISTS `course_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_chapter` (
  `course_chapter_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `chapter_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`course_chapter_id`),
  KEY `course_id` (`course_id`),
  KEY `chapter_id` (`chapter_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `course_chapter_ibfk_4` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `course_chapter_ibfk_5` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`),
  CONSTRAINT `course_chapter_ibfk_6` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_chapter`
--

LOCK TABLES `course_chapter` WRITE;
/*!40000 ALTER TABLE `course_chapter` DISABLE KEYS */;
INSERT INTO `course_chapter` VALUES (1,1,1,'2025-01-16 20:05:11','2025-01-16 20:05:11',NULL),(2,1,2,'2025-01-16 20:06:13','2025-01-16 20:06:13',NULL),(3,1,3,'2025-01-16 20:07:05','2025-01-16 20:07:05',NULL),(4,1,4,'2025-01-16 20:07:58','2025-01-16 20:07:58',NULL),(5,1,5,'2025-01-16 20:14:08','2025-01-16 20:14:08',NULL),(6,1,6,'2025-01-16 20:15:17','2025-01-16 20:15:17',NULL),(7,1,7,'2025-01-16 20:16:11','2025-01-16 20:16:11',NULL),(8,1,8,'2025-01-16 20:17:22','2025-01-16 20:17:22',NULL),(9,1,9,'2025-01-16 20:18:08','2025-01-16 20:18:08',NULL),(10,1,10,'2025-01-16 20:18:58','2025-01-16 20:18:58',NULL),(11,1,11,'2025-01-16 20:19:39','2025-01-16 20:19:39',NULL),(12,1,12,'2025-01-16 20:20:31','2025-01-16 20:20:31',NULL),(13,1,13,'2025-01-16 20:21:15','2025-01-16 20:21:15',NULL),(14,1,14,'2025-01-16 20:22:05','2025-01-16 20:22:05',NULL),(15,1,15,'2025-01-16 20:22:44','2025-01-16 20:22:44',NULL),(16,1,16,'2025-01-17 19:19:27','2025-01-17 19:19:27',NULL),(17,1,17,'2025-01-17 19:20:37','2025-01-17 19:20:37',NULL),(18,1,18,'2025-01-17 19:21:29','2025-01-17 19:21:29',NULL),(19,1,19,'2025-01-17 19:22:05','2025-01-17 19:22:05',NULL),(20,1,20,'2025-01-17 19:23:16','2025-01-17 19:23:16',NULL),(21,1,21,'2025-01-17 19:24:06','2025-01-17 19:24:06',NULL),(22,1,22,'2025-01-17 19:24:50','2025-01-17 19:24:50',NULL),(23,1,23,'2025-01-17 19:28:17','2025-01-17 19:28:17',NULL),(24,1,24,'2025-01-17 19:29:23','2025-01-17 19:29:23',NULL),(25,1,25,'2025-01-17 19:30:10','2025-01-17 19:30:10',NULL),(26,1,26,'2025-01-17 19:30:54','2025-01-17 19:30:54',NULL),(27,1,27,'2025-01-17 19:32:51','2025-01-17 19:32:51',NULL),(28,1,28,'2025-01-17 19:33:24','2025-01-17 19:33:24',NULL),(29,1,29,'2025-01-17 19:34:05','2025-01-17 19:34:05',NULL);
/*!40000 ALTER TABLE `course_chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_participant`
--

DROP TABLE IF EXISTS `course_participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_participant` (
  `course_participant_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `participant_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`course_participant_id`),
  KEY `course_id` (`course_id`),
  KEY `participant_id` (`participant_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `course_participant_ibfk_4` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `course_participant_ibfk_5` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`participant_id`),
  CONSTRAINT `course_participant_ibfk_6` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_participant`
--

LOCK TABLES `course_participant` WRITE;
/*!40000 ALTER TABLE `course_participant` DISABLE KEYS */;
INSERT INTO `course_participant` VALUES (1,1,3,'2025-01-23 20:19:37','2025-01-23 20:19:37',NULL),(2,1,2,'2025-01-23 20:20:26','2025-01-23 20:20:26',NULL),(3,1,1,'2025-01-23 20:20:43','2025-01-23 20:20:43',NULL),(4,1,4,'2025-01-23 20:25:41','2025-01-23 20:25:41',NULL),(5,1,5,'2025-01-23 20:25:42','2025-01-23 20:25:42',NULL),(6,1,6,'2025-01-23 20:25:42','2025-01-23 20:25:42',NULL),(7,1,7,'2025-01-23 20:25:42','2025-01-23 20:25:42',NULL),(8,1,8,'2025-01-23 20:25:43','2025-01-23 20:25:43',NULL),(9,1,9,'2025-01-23 20:25:43','2025-01-23 20:25:43',NULL),(10,1,10,'2025-01-23 20:25:43','2025-01-23 20:25:43',NULL),(11,1,11,'2025-02-11 17:23:26','2025-02-11 17:23:26',NULL),(12,1,12,'2025-02-11 17:23:26','2025-02-11 17:23:26',NULL),(13,1,13,'2025-02-11 17:23:27','2025-02-11 17:23:27',NULL),(14,1,14,'2025-02-11 17:23:27','2025-02-11 17:23:27',NULL),(15,1,15,'2025-02-11 17:23:27','2025-02-11 17:23:27',NULL),(16,1,16,'2025-02-11 17:23:27','2025-02-11 17:23:27',NULL),(17,1,17,'2025-02-11 17:23:28','2025-02-11 17:23:28',NULL),(18,1,18,'2025-02-11 17:23:28','2025-02-11 17:23:28',NULL),(19,1,19,'2025-02-11 17:23:28','2025-02-11 17:23:28',NULL);
/*!40000 ALTER TABLE `course_participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail`
--

DROP TABLE IF EXISTS `detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `instructor_id` int DEFAULT NULL,
  `course_description` varchar(255) NOT NULL,
  `total_hours` int DEFAULT NULL,
  `num_registered` int DEFAULT NULL,
  `num_enrolled` int DEFAULT NULL,
  `num_failed` int DEFAULT NULL,
  `detail_value_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `cost_per_hour` decimal(10,2) DEFAULT NULL,
  `instructor_hours` int DEFAULT NULL,
  `activities_hours` int DEFAULT NULL,
  `participant_requeriment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `instructor_id` (`instructor_id`),
  KEY `detail_value_id` (`detail_value_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`),
  CONSTRAINT `detail_ibfk_2` FOREIGN KEY (`detail_value_id`) REFERENCES `detailvalues` (`detail_value_id`),
  CONSTRAINT `detail_ibfk_4` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`),
  CONSTRAINT `detail_ibfk_5` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`),
  CONSTRAINT `detail_ibfk_6` FOREIGN KEY (`detail_value_id`) REFERENCES `detailvalues` (`detail_value_id`),
  CONSTRAINT `detail_ibfk_7` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail`
--

LOCK TABLES `detail` WRITE;
/*!40000 ALTER TABLE `detail` DISABLE KEYS */;
INSERT INTO `detail` VALUES (1,1,'Descipciòn del curso CCNAv7 Introducciòn a las Redes (Español - 7.02)',70,25,22,3,1,'2025-01-23 19:42:10','2025-01-23 19:42:10',NULL,13.00,48,22,'ninguno');
/*!40000 ALTER TABLE `detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_modality`
--

DROP TABLE IF EXISTS `detail_modality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_modality` (
  `detail_modality_id` int NOT NULL AUTO_INCREMENT,
  `detail_id` int DEFAULT NULL,
  `modality_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`detail_modality_id`),
  KEY `detail_id` (`detail_id`),
  KEY `modality_id` (`modality_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `detail_modality_ibfk_4` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`detail_id`),
  CONSTRAINT `detail_modality_ibfk_5` FOREIGN KEY (`modality_id`) REFERENCES `modality` (`modality_id`),
  CONSTRAINT `detail_modality_ibfk_6` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_modality`
--

LOCK TABLES `detail_modality` WRITE;
/*!40000 ALTER TABLE `detail_modality` DISABLE KEYS */;
INSERT INTO `detail_modality` VALUES (1,1,3,'2025-01-23 19:42:10','2025-01-23 19:42:10',NULL);
/*!40000 ALTER TABLE `detail_modality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_schedule`
--

DROP TABLE IF EXISTS `detail_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_schedule` (
  `detail_schedule_id` int NOT NULL AUTO_INCREMENT,
  `detail_id` int DEFAULT NULL,
  `schedule_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`detail_schedule_id`),
  KEY `detail_id` (`detail_id`),
  KEY `schedule_id` (`schedule_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `detail_schedule_ibfk_4` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`detail_id`),
  CONSTRAINT `detail_schedule_ibfk_5` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`),
  CONSTRAINT `detail_schedule_ibfk_6` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_schedule`
--

LOCK TABLES `detail_schedule` WRITE;
/*!40000 ALTER TABLE `detail_schedule` DISABLE KEYS */;
INSERT INTO `detail_schedule` VALUES (1,1,1,'2025-01-20 16:00:42','2025-01-20 16:00:42',1);
/*!40000 ALTER TABLE `detail_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailcost`
--

DROP TABLE IF EXISTS `detailcost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailcost` (
  `detail_cost_id` int NOT NULL AUTO_INCREMENT,
  `detail_id` int DEFAULT NULL,
  `cost_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`detail_cost_id`),
  KEY `detail_id` (`detail_id`),
  KEY `cost_id` (`cost_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `detailcost_ibfk_1` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`detail_id`),
  CONSTRAINT `detailcost_ibfk_2` FOREIGN KEY (`cost_id`) REFERENCES `cost` (`cost_id`),
  CONSTRAINT `detailcost_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailcost`
--

LOCK TABLES `detailcost` WRITE;
/*!40000 ALTER TABLE `detailcost` DISABLE KEYS */;
INSERT INTO `detailcost` VALUES (1,1,1,1,'2025-01-23 19:42:10','2025-01-23 19:42:10'),(2,1,2,1,'2025-01-23 19:42:10','2025-01-23 19:42:10');
/*!40000 ALTER TABLE `detailcost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailvalues`
--

DROP TABLE IF EXISTS `detailvalues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailvalues` (
  `detail_value_id` int NOT NULL AUTO_INCREMENT,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `instructor_payment` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`detail_value_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `detailvalues_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailvalues`
--

LOCK TABLES `detailvalues` WRITE;
/*!40000 ALTER TABLE `detailvalues` DISABLE KEYS */;
INSERT INTO `detailvalues` VALUES (1,2150.00,624.00,NULL,NULL,NULL);
/*!40000 ALTER TABLE `detailvalues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_utn`
--

DROP TABLE IF EXISTS `info_utn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `info_utn` (
  `info_utn_id` int NOT NULL AUTO_INCREMENT,
  `faculty` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `degree_level` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`info_utn_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `info_utn_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_utn`
--

LOCK TABLES `info_utn` WRITE;
/*!40000 ALTER TABLE `info_utn` DISABLE KEYS */;
/*!40000 ALTER TABLE `info_utn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `identification_number` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ruc_number` varchar(15) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `banck_certificate_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`instructor_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (1,'1001580396001','Cosme Ortega','0999440944','mc.ortega@utn.edu.ec',NULL,'2025-01-23 19:27:17','2025-01-23 19:27:17',NULL,'sin registro');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor_certificate`
--

DROP TABLE IF EXISTS `instructor_certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor_certificate` (
  `instructor_certificate_id` int NOT NULL AUTO_INCREMENT,
  `instructor_id` int DEFAULT NULL,
  `certificate_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`instructor_certificate_id`),
  KEY `instructor_id` (`instructor_id`),
  KEY `certificate_id` (`certificate_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `instructor_certificate_ibfk_4` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`),
  CONSTRAINT `instructor_certificate_ibfk_5` FOREIGN KEY (`certificate_id`) REFERENCES `certificate` (`certificate_id`),
  CONSTRAINT `instructor_certificate_ibfk_6` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor_certificate`
--

LOCK TABLES `instructor_certificate` WRITE;
/*!40000 ALTER TABLE `instructor_certificate` DISABLE KEYS */;
/*!40000 ALTER TABLE `instructor_certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modality`
--

DROP TABLE IF EXISTS `modality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modality` (
  `modality_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`modality_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `modality_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modality`
--

LOCK TABLES `modality` WRITE;
/*!40000 ALTER TABLE `modality` DISABLE KEYS */;
INSERT INTO `modality` VALUES (1,'Virutal','Modalidad Virtual','2024-10-05 17:36:51','2024-10-05 17:36:51',1),(2,'Presencial','Modalidad Presencial','2024-10-05 17:36:51','2024-10-05 17:36:51',1),(3,'Hibrida','Modalidad Virtual/Presencial','2024-10-05 17:36:51','2024-10-05 17:36:51',1);
/*!40000 ALTER TABLE `modality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant` (
  `participant_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cid` int DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `participant_type_id` int DEFAULT NULL,
  `certificate_required` tinyint(1) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `enrolled` tinyint(1) DEFAULT NULL,
  `registered` tinyint(1) DEFAULT NULL,
  `approval` tinyint(1) DEFAULT NULL,
  `total_payment` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`participant_id`),
  KEY `participant_type_id` (`participant_type_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `participant_ibfk_1` FOREIGN KEY (`participant_type_id`) REFERENCES `participant_type` (`participant_type_id`) ON DELETE SET NULL,
  CONSTRAINT `participant_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant`
--

LOCK TABLES `participant` WRITE;
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
INSERT INTO `participant` VALUES (1,'ARMAS GARCIA PAUL ALEXANDER',1004168942,'0998948341','IBARRA','SIN REGISTRO',4,0,'',1,1,1,80.00,'2025-01-20 15:58:06','2025-01-20 15:58:06',NULL,1),(2,'ANDRADE POTOSI JUAN CARLOS',401535000,'sin registro','Ibarrra','no registrado',1,0,'sin registro',1,1,1,130.00,'2025-01-23 19:51:28','2025-01-23 19:51:28',NULL,1),(3,'BENAVIDES FLORES ALVARO FERNANDO',1003566815,'sin registro','Ibarra','sin registro',2,0,NULL,1,1,1,80.00,'2025-01-23 20:19:37','2025-01-23 20:19:37',NULL,1),(4,'BENAVIDES SANCHEZ CARLOS ANDRES',1004134977,'sin registro','Ibarra','sin registro',2,0,NULL,1,1,1,80.00,'2025-01-23 20:25:41','2025-01-23 20:25:41',NULL,1),(5,'CADENA LEMA HÉCTOR DARIO',1004562193,'sin registro','Ibarra','sin registro',2,0,NULL,1,1,1,80.00,'2025-01-23 20:25:41','2025-01-23 20:25:41',NULL,1),(6,'CARRERA VALENCIA JHIMMY ANDRES',1003202841,'sin registro',NULL,'sin registro',1,0,NULL,1,1,1,80.00,'2025-01-23 20:25:42','2025-01-23 20:25:42',NULL,1),(7,'CORAL PAZMIÑO MILTON SANTIAGO',1002340576,'sin registro',NULL,'sin registro',4,0,NULL,1,1,1,130.00,'2025-01-23 20:25:42','2025-01-23 20:25:42',NULL,1),(8,'DOMINGUEZ PASQUEL ANDREA KAROLINA',1003671094,'sin registro',NULL,'sin registro',2,0,NULL,1,1,1,80.00,'2025-01-23 20:25:42','2025-01-23 20:25:42',NULL,1),(9,'ICHAU ICHAÚ CRISTIAN VINICIO',1003834866,'sin registro',NULL,'sin registro',2,0,NULL,1,1,1,80.00,'2025-01-23 20:25:43','2025-01-23 20:25:43',NULL,1),(10,'INUCA GONZA CYNTIA MARIBEL',1003243639,'sin registro',NULL,'sin registro',2,0,NULL,1,1,1,80.00,'2025-01-23 20:25:43','2025-01-23 20:25:43',NULL,1),(11,'JIMENEZ TABANGO LUIS DAVID ',1003817515,'sin registro','Otavalo','sin registro',1,1,NULL,1,1,0,80.00,'2025-02-11 17:23:25','2025-02-11 17:23:25',NULL,1),(12,'LEON VALLEJOS PABLO VINICIO',1003230388,'sin registro','Ibarra','sin registro',1,1,NULL,1,1,1,80.00,'2025-02-11 17:23:26','2025-02-11 17:23:26',NULL,1),(13,'MEDIAVILLA BORJA EDWIN SEBASTIAN',1004563324,'sin registro','Otavalo','sin registro',1,1,NULL,1,1,0,80.00,'2025-02-11 17:23:26','2025-02-11 17:23:26',NULL,1),(14,'OVIEDO PERUGACHI DARIO FERNANDO',1003752084,'sin registro','Ibarra','sin registro',1,1,NULL,1,1,1,80.00,'2025-02-11 17:23:27','2025-02-11 17:23:27',NULL,1),(15,'PALACIOS OCHOA LUIS FERNANDO',1003066535,'sin registro','Ibarra','sin registro',1,1,NULL,1,1,1,80.00,'2025-02-11 17:23:27','2025-02-11 17:23:27',NULL,1),(16,'RODRIGUEZ BAQUE KAREN ELIZABETH',1003668876,'sin registro','Cotacachi','sin registro',1,1,NULL,1,1,1,80.00,'2025-02-11 17:23:27','2025-02-11 17:23:27',NULL,1),(17,'ROSERO CUASPA FREDDY MARLON',1001987989,'sin registro','Ibarra','sin registro',1,1,NULL,1,1,1,80.00,'2025-02-11 17:23:27','2025-02-11 17:23:27',NULL,1),(18,'SANCHEZ PILLAJO ROMEL DANIEL',1754247722,'sin registro','Cayambe','sin registro',1,1,NULL,1,1,0,80.00,'2025-02-11 17:23:28','2025-02-11 17:23:28',NULL,1),(19,'VEGA VEGA ARMANDO',1002160693,'sin registro','Ibarra','sin registro',4,1,NULL,1,1,1,130.00,'2025-02-11 17:23:28','2025-02-11 17:23:28',NULL,1);
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant_info_utn`
--

DROP TABLE IF EXISTS `participant_info_utn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_info_utn` (
  `participant_id` int NOT NULL,
  `info_utn_id` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`participant_id`,`info_utn_id`),
  KEY `info_utn_id` (`info_utn_id`),
  KEY `participant_info_utn_created_by_foreign_idx` (`created_by`),
  CONSTRAINT `participant_info_utn_created_by_foreign_idx` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `participant_info_utn_ibfk_1` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`participant_id`) ON DELETE CASCADE,
  CONSTRAINT `participant_info_utn_ibfk_2` FOREIGN KEY (`info_utn_id`) REFERENCES `info_utn` (`info_utn_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant_info_utn`
--

LOCK TABLES `participant_info_utn` WRITE;
/*!40000 ALTER TABLE `participant_info_utn` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_info_utn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant_payment`
--

DROP TABLE IF EXISTS `participant_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_payment` (
  `participant_payment_id` int NOT NULL AUTO_INCREMENT,
  `participant_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`participant_payment_id`),
  KEY `participant_id` (`participant_id`),
  KEY `payment_id` (`payment_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `participant_payment_ibfk_1` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`participant_id`) ON DELETE CASCADE,
  CONSTRAINT `participant_payment_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE,
  CONSTRAINT `participant_payment_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant_payment`
--

LOCK TABLES `participant_payment` WRITE;
/*!40000 ALTER TABLE `participant_payment` DISABLE KEYS */;
INSERT INTO `participant_payment` VALUES (1,1,1,'2025-02-04 19:28:41','2025-02-04 19:28:41',NULL),(2,2,2,'2025-02-04 19:29:26','2025-02-04 19:29:26',NULL),(3,3,3,'2025-02-04 19:30:03','2025-02-04 19:30:03',NULL),(4,4,4,'2025-02-04 19:30:51','2025-02-04 19:30:51',NULL);
/*!40000 ALTER TABLE `participant_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant_type`
--

DROP TABLE IF EXISTS `participant_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_type` (
  `participant_type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`participant_type_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `participant_type_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant_type`
--

LOCK TABLES `participant_type` WRITE;
/*!40000 ALTER TABLE `participant_type` DISABLE KEYS */;
INSERT INTO `participant_type` VALUES (1,'Estudiante Pregrado Utn','Inactivo','2025-01-20 15:36:59','2025-01-20 15:36:59',NULL),(2,'Egresado Utn','Inactivo','2025-01-20 15:37:11','2025-01-20 15:37:11',NULL),(3,'Estudiante Postgrado Utn','Inactivo','2025-01-20 15:37:26','2025-01-20 15:37:26',NULL),(4,'Particular','Inactivo','2025-01-20 15:37:50','2025-01-20 15:37:50',NULL),(5,'Docente Utn','Inactivo','2025-01-20 15:38:01','2025-01-20 15:38:01',NULL);
/*!40000 ALTER TABLE `participant_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `description` text,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_type_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `payment_type_id` (`payment_type_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_type` (`payment_type_id`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'Pago Curso',100.00,1,'2025-02-04 19:28:41','2025-02-04 19:28:41',NULL),(2,'pago curso',80.00,1,'2025-02-04 19:29:26','2025-02-04 19:29:26',NULL),(3,'pago curso',80.00,1,'2025-02-04 19:30:03','2025-02-04 19:30:03',NULL),(4,'pago curso\n',80.00,1,'2025-02-04 19:30:51','2025-02-04 19:30:51',NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_type`
--

DROP TABLE IF EXISTS `payment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_type` (
  `payment_type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`payment_type_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `payment_type_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_type`
--

LOCK TABLES `payment_type` WRITE;
/*!40000 ALTER TABLE `payment_type` DISABLE KEYS */;
INSERT INTO `payment_type` VALUES (1,'Efectivo','2025-02-04 19:20:43','2025-02-04 19:20:43',NULL),(2,'Tarjeta','2025-02-04 19:20:52','2025-02-04 19:20:52',NULL),(3,'Transferencia','2025-02-04 19:20:59','2025-02-04 19:20:59',NULL),(4,'Dos Pagos','2025-02-04 19:21:04','2025-02-04 19:21:04',NULL);
/*!40000 ALTER TABLE `payment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `status` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `permission_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Dashboard','Vista Dashboard','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(2,'Configuracion','Vista Configuracion','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(3,'Detalles','Vista Detalles','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(4,'Auditoria','Vista Auditoria','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(5,'Roles','Vista Roles','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(6,'Permisos','Vista Permisos','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(7,'Pago','Vista Pago','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(8,'Tipo de Pago','Vista Tipo de Pago','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(9,'Convenios','Vista Convenios','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(10,'Activos','Vista Activos','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(11,'Detalle de Valores','Vista Detalle de Valores','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(12,'Curso','Vista Curso','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(13,'Participante','Vista Participante','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(14,'Capítulos','Vista Capítulos','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(15,'Usuarios','Vista Usuarios','Activo','2024-09-30 14:22:21','2024-09-30 14:22:21',1),(16,'Detalles Test','Vista Dashboard','Inactivo','2024-09-30 14:22:21','2024-09-30 14:22:21',1);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `status` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Administrador','Rol de Administrador','Activo','2024-10-05 17:36:51','2024-10-05 17:36:51',1);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_permission_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `permission_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`role_permission_id`),
  KEY `role_id` (`role_id`),
  KEY `permission_id` (`permission_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `role_permission_ibfk_4` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `role_permission_ibfk_5` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`permission_id`),
  CONSTRAINT `role_permission_ibfk_6` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `days` varchar(50) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`schedule_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,'2-3-4','19:30:00','21:30:00','2025-01-20 16:00:42','2025-01-20 16:00:42',NULL,NULL);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `users_role_id_foreign_idx` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Joan Pastillo','jeipige@gmail.com','Ibarra','$2a$08$giP9/76yGnEfjOV8lW9CW.GEP8qus9OFT8/lejuyqOF9iM1xB9OMu','1','2024-10-05 17:36:51','2024-10-05 17:36:51',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-31 12:12:17
