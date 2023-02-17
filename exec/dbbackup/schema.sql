-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: studify
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge` (
  `badge_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
INSERT INTO `badge` VALUES (1,'ì‹ ìž…'),(2,'ì´ˆë³´'),(3,'ê²¬ìŠµ'),(4,'ìˆ™ë ¨'),(5,'ì „ë¬¸'),(6,'ì¶œì„ 1ë‹¨ê³„'),(7,'ì¶œì„ 2ë‹¨ê³„'),(8,'ì¶œì„ 3ë‹¨ê³„'),(9,'ì¶œì„ 4ë‹¨ê³„'),(10,'ì¶œì„ 5ë‹¨ê³„'),(11,'ì¶œì„ 6ë‹¨ê³„'),(12,'ì¶œì„ 7ë‹¨ê³„'),(13,'1st'),(14,'2nd'),(15,'3rd');
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `study_id` bigint DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `FKj2ro9ulaatlyyayi1h1vnw7c5` (`study_id`),
  CONSTRAINT `FKj2ro9ulaatlyyayi1h1vnw7c5` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (7,'java',5),(26,'java',17),(27,'java',18),(28,'spring',18),(29,'python',19),(30,'python',20),(31,'java',20),(32,'javascript',20),(33,'c++',20),(34,'c',20),(35,'java',21),(36,'java',22),(37,'c++',23),(38,'c',23),(39,'java',24),(40,'spring',24),(41,'java',25),(42,'javascript',25),(43,'react',25),(44,'spring',25),(45,'java',26),(46,'python',27),(47,'vue',28),(48,'javascript',28),(49,'vue',29),(50,'react',29),(51,'c',30),(52,'java',31),(53,'c++',32),(54,'c',32),(55,'javascript',33),(56,'java',34),(57,'spring',34),(58,'spring',35),(59,'java',36),(60,'spring',36),(61,'vue',37),(62,'javascript',37),(63,'react',38),(64,'javascript',38),(65,'python',39),(66,'java',39),(67,'c++',39),(68,'c',39),(69,'java',40),(70,'python',40),(71,'python',41),(79,'java',42),(80,'javascript',43),(83,'java',46),(85,'java',48),(86,'javascript',48),(87,'python',49),(94,'python',52),(95,'javascript',53),(96,'java',53),(97,'react',53),(98,'spring',53),(100,'java',55);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study`
--

DROP TABLE IF EXISTS `study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study` (
  `study_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` int NOT NULL,
  `class_num` int NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `generation` int NOT NULL,
  `headcount` int NOT NULL,
  `is_public` bit(1) NOT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `study_img_id` bigint DEFAULT NULL,
  PRIMARY KEY (`study_id`),
  KEY `FKkbkp0vqu13s87gh93h5kc7saf` (`study_img_id`),
  CONSTRAINT `FKkbkp0vqu13s87gh93h5kc7saf` FOREIGN KEY (`study_img_id`) REFERENCES `study_img` (`study_img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study`
--

LOCK TABLES `study` WRITE;
/*!40000 ALTER TABLE `study` DISABLE KEYS */;
INSERT INTO `study` VALUES (5,'2023-02-16 13:52:31.233000','2023-02-16 16:24:37.437000','protoss1207@gmail.com','ssafy@ssafy.com',6,1,'<p>자바 스터티 인 액션 2달동안 같이하실분 모집해요</p>',8,2,_binary '\0','대전','자바모던인액션 같이하실분',NULL),(17,'2023-02-16 16:05:51.967000','2023-02-17 11:09:06.978000','jbson1998@naver.com','solar2008@naver.com',6,1,'<p>자바스터디 같이 하실분 구합니다.</p>',8,3,_binary '','대전','스터디를 만들어보자(자바)',NULL),(18,'2023-02-16 16:32:59.294000','2023-02-17 00:26:33.523000','jjjp9966@naver.com','ssafyseoul8@ruu.kr',6,1,'<p>8기 대전 1반 스프링 스터디입니다.</p><p><br></p><p>- 요일: 수</p><p>- 기술 스택: Java, Spring</p><p>- 요일: 수</p><p>- 시간: 20:00 ~ 22:00</p>',8,2,_binary '','대전','8기 대전 1반 스프링 스터디',NULL),(19,'2023-02-16 16:36:45.884000','2023-02-17 01:52:58.501000','jjjp9966@gmail.com','ssafytest@ruu.kr',6,1,'<p>역량평가 A형 취득을 위한 알고리즘 스터디</p><p><br></p><p>- 기술 스택: Python</p><p>- 요일: 화, 목</p><p>- 시간: 20:00 ~ 22:00</p><p>- 일정: 하루에 1문제 풀이 및 리뷰</p>',9,2,_binary '','서울','9기 서울 알고리즘 스터디',NULL),(20,'2023-02-16 16:42:30.353000','2023-02-16 23:00:26.026000','jjjp9966@naver.com','yr7256@gmail.com',6,1,'<p>코딩 테스트 준비를 위한 알고리즘 스터디입니다.</p><p><br></p><p>- 기술 스택: 언어 상관없이 모두 가능합니다.</p><p>- 요일: 화, 목</p><p>- 시간: 20:00 ~ 24:00</p><p>- 진행 방향: 문제 풀이 및 코드 리뷰</p>',8,4,_binary '','대전','코테 준비 알고리즘 스터디',NULL),(21,'2023-02-16 17:00:03.208000','2023-02-17 00:27:58.376000','onehee9710@gmail.com','solar2008@naver.com',10,8,'<p>안녕하세요</p>',8,10,_binary '','대전','지바를 자바라',NULL),(22,'2023-02-16 17:18:18.638000','2023-02-16 17:18:18.638000','2js0415@kangwon.ac.kr','2js0415@kangwon.ac.kr',7,1,'<h1>모바일 프로그래밍 스터디</h1><ul><li><p>기술 스택: Java</p></li><li><p>요일: 화, 목</p></li><li><p>시간: 20:00 ~ 24:00</p></li><li><p>내용: 간단한 모바일 서비스 만들기</p></li></ul>',9,1,_binary '','구미','모바일 프로그래밍 스터디',NULL),(23,'2023-02-16 21:00:32.219000','2023-02-16 22:16:46.048000','jjjp9966@gmail.com','mint_828@daum.net',5,1,'<p>C/C++ 학습 스터디입니다.</p><p><br></p><p>매주 수, 금요일 저녁 8시 ~ 10시 두 차례 진행됩니다.</p>',9,2,_binary '','서울','C/C++ 스터디',NULL),(24,'2023-02-16 21:02:17.889000','2023-02-16 21:02:17.889000','jjjp9966@naver.com','jjjp9966@naver.com',3,1,'<p>스프링을 학습하고 각자 간단한 웹 서비스를 만들어 볼 계획입니다.</p><p><br></p><p>매주 화, 목 저녁 10 ~ 12시 진행할 예정입니다.</p><p><br></p><p><br></p>',8,1,_binary '','대전','스프링으로 구현하는 웹 서비스',NULL),(25,'2023-02-16 21:05:29.164000','2023-02-16 21:05:29.164000','jjjp9966@naver.com','jjjp9966@naver.com',4,1,'<p>React와 SpringBoot를 학습하고 프론트와 백엔드에 대한 이해를 높이고 간단한 웹 서비스를 만들 계획입니다.</p><p><br></p><p>매주 수, 일요일에 진행되며 진행 기간은 1개월입니다.</p>',8,1,_binary '','대전','React + SpringBoot 스터디',NULL),(26,'2023-02-16 21:16:56.036000','2023-02-16 21:16:56.036000','2js0415@kangwon.ac.kr','2js0415@kangwon.ac.kr',5,1,'<p>구미 1반 알고리즘 스터디</p><p><br></p><p>- 언어: 자바</p><p>- 목표: IM &amp; A형 취득</p><p>- 과제: 매일 한 문제 풀이</p>',9,1,_binary '','구미','구미 1반 알고리즘 스터디',NULL),(27,'2023-02-16 21:21:53.261000','2023-02-17 09:24:37.027000','2js0415@kangwon.ac.kr','jjjp9966@naver.com',7,1,'<p>IM 역량 평가 대비 스터디</p><p><br></p><p>- 목표: 스터디 전원 IM 취득</p><p>- 요일: 화, 목</p><p>- 진행: 매일 한 문제 풀이 및 리뷰</p>',9,2,_binary '','구미','역량 평가 대비 스터디',NULL),(28,'2023-02-16 21:24:11.634000','2023-02-16 21:24:11.634000','jjjp9966@naver.com','jjjp9966@naver.com',4,1,'<p>JavaScript를 학습하고 Vue 프레임워크를 배워 간단한 TodoList를 만드는 것이 목표입니다.</p><p><br></p><p>- 요일: 주말</p><p>- 시간: 14:00 ~ 16:00</p><p>- 기간: 3주</p>',8,1,_binary '','대전','Vue 스터디',NULL),(29,'2023-02-16 21:25:45.409000','2023-02-16 21:25:45.409000','jjjp9966@naver.com','jjjp9966@naver.com',4,1,'<p>- 목표: 프론트엔드 프레임워크를 학습하고 React와 Vue 기술을 습득한다.</p><p>- 요일: 화, 수</p><p>- 기간: 1개월</p>',8,1,_binary '','대전','TodoList 만들기 스터디',NULL),(30,'2023-02-16 21:30:54.279000','2023-02-17 09:26:34.038000','ssafytest@ruu.kr','jjjp9966@naver.com',3,1,'<p>C언어 초보자들분 모집합니다</p><p><br></p><p><br></p><p>매주 저녁 8:30~10시까지 코딩 온라인 모임 열려고 합니다.</p><p>무엇보다 꾸준함이 중요하다고 생각해서 하루 안나올 경우 벌금을 부과할 예정입니다.(이부분은 함께 토의해서 맞춰갈 예정입니다.)</p><p><br></p><p>향후 기초를 공부하고 공모전도 도전할 예정입니다. 인원이 너무 많으면 힘들것 같아서 3분만 모집하도록 하겠습니다.</p><p><br></p><p><br></p><p>공부방식: 책을 통해서 한챕터 공부한 후 공부한 부분을 백준으로 풀 예정입니다.</p><p><br></p><p><br></p><p>책(이 부분은 제가 갖고 있어서 걱정없이 컴퓨터만 있으면 될 것 같습니다.)</p>',8,2,_binary '','대전','8기 대전 C언어 스터디 모집',NULL),(31,'2023-02-16 21:34:26.337000','2023-02-16 21:34:26.337000','jjjp9966@naver.com','jjjp9966@naver.com',4,1,'<p>모던 자바를 학습한다.</p><p><br></p><p>- 스택: Java</p><p>- 요일: 수, 금, 일</p><p>- 기간: 2개월</p><p>- 목표: 모던 자바 인 액션 책 한 권 끝내기</p>',8,1,_binary '','대전','모던 Java를 자바라',NULL),(32,'2023-02-16 21:38:25.922000','2023-02-16 21:38:25.922000','jjjp9966@gmail.com','jjjp9966@gmail.com',4,1,'<p>C/C++ 개념을 학습하고 임베디드에 도전하자!</p><p><br></p><p>- 스택: C/C++</p><p>- 요일: 수, 일</p><p>- 기간: 1개월</p>',9,1,_binary '','서울','임베디드 스터디',NULL),(33,'2023-02-16 21:42:00.560000','2023-02-16 21:42:00.560000','2js0415@kangwon.ac.kr','2js0415@kangwon.ac.kr',4,1,'<p>자바스크립트를 정복하자! JavaStrike</p><p><br></p><p>매주 수, 토요일 진도를 학습하고 어렵거나 궁금한 점을 서로 이야기하고 해결하는 스터디입니다.</p>',9,1,_binary '','구미','JavaStrike',NULL),(34,'2023-02-16 21:46:27.320000','2023-02-16 21:46:27.320000','jjjp9966@naver.com','jjjp9966@naver.com',4,1,'<p>JWT 학습 스터디입니다.</p><p><br></p><p>JWT의 개념을 이해하고 구현해보는 스터디입니다.</p><p><br></p><p>매주 수요일 2주간 진행할 예정이며</p><p><br></p><p>2023-02-22부터 시작할 예정입니다.</p>',8,1,_binary '','대전','단기간 JWT 학습 스터디',NULL),(35,'2023-02-16 21:53:48.298000','2023-02-16 21:53:48.298000','jjjp9966@naver.com','jjjp9966@naver.com',4,1,'<p>Spring Security를 학습하고 프로젝트에 적용하는 것이 목표입니다.</p><p><br></p><p>인원이 모여지면 1주일 학습을 하고 다음 1주간 프로젝트에 적용할 예정입니다.</p><p><br></p><p>진행 기간은 총 2주입니다.</p>',8,1,_binary '','대전','Spring Security 스터디',NULL),(36,'2023-02-16 21:58:23.935000','2023-02-16 21:58:23.935000','jjjp9966@naver.com','jjjp9966@naver.com',4,1,'<p>ORM을 이해하고 Spring Data Jpa를 배워보자!</p><p><br></p><p>- 요일: 수, 금</p>',8,1,_binary '\0','대전','ORM을 이해하고 JPA를 써보자',NULL),(37,'2023-02-16 21:59:25.739000','2023-02-16 21:59:25.739000','solar2003@daum.net','solar2003@daum.net',5,2,'<p>어서오세요</p><p>이곳은 뷰 맛집입니다.</p>',8,1,_binary '','광주','뷰 맛집',NULL),(38,'2023-02-16 22:04:29.656000','2023-02-16 22:04:29.656000','solar2003@daum.net','solar2003@daum.net',6,2,'<p>특화 프로젝트 때 리액트 써야 하는데 하나도 몰라요 </p><p>같이 공부하실 분 구합니다 </p>',8,1,_binary '','광주','리액트 같이해요~!~',NULL),(39,'2023-02-16 22:09:06.878000','2023-02-16 22:09:06.878000','solar2003@daum.net','solar2003@daum.net',10,2,'<h1> 알고리즘이랑 같이 싸울 파티원 구함 ( 1 / 10 )</h1><p>주 7일 하루 3문제씩 알고리즘 무찌를 파티원 구합니다</p><p>언어는 자유롭게 사용하면 됩니다!</p>',8,1,_binary '','광주','알고리즘이랑 싸우기',NULL),(40,'2023-02-16 22:30:00.321000','2023-02-16 22:30:00.321000','mint_828@daum.net','mint_828@daum.net',10,4,'<p>자바랑 파이썬 둘다 잡기</p><p>^_^</p>',9,1,_binary '\0','광주','자바랑 파이썬',NULL),(41,'2023-02-16 22:36:47.880000','2023-02-16 22:36:47.880000','ssafyseoul8@ruu.kr','ssafyseoul8@ruu.kr',7,6,'<p>파이썬 스터디</p>',9,1,_binary '','서울','파이썬 스터디',NULL),(42,'2023-02-16 22:39:27.059000','2023-02-16 22:44:54.536000','ssafyseoul8@ruu.kr','ssafyseoul8@ruu.kr',5,6,'<h1>모집합니다</h1><p>함께 스터디를 할 인원을 모집합니다</p>',9,1,_binary '','서울','자바 스터디',NULL),(43,'2023-02-16 22:56:27.303000','2023-02-16 22:56:27.303000','jbson1998@naver.com','jbson1998@naver.com',6,1,'<p>자바스크립트를 함께 공부 하실 분을 구합니다.</p>',8,1,_binary '','대전','자바스크립트 같이 하실분 구합니다.',NULL),(46,'2023-02-16 23:10:23.202000','2023-02-16 23:10:23.202000','jbson1998@naver.com','jbson1998@naver.com',6,1,'<p>✔자바를 같이 공부해서 취업 확실하게 하실분을 구합니다!</p>',8,1,_binary '\0','대전','자바 같이 하실분 구합니다.',NULL),(48,'2023-02-16 23:58:05.571000','2023-02-16 23:58:05.571000','jjjp9966@naver.com','jjjp9966@naver.com',3,1,'<p>하루에 알고리즘 한 문제 풀기</p><p>1시간 정도 CS 공부하기</p><p>매주 금요일에 발표하기</p>',8,1,_binary '','대전','8기 대전 1반 스터디',NULL),(49,'2023-02-17 00:07:39.371000','2023-02-17 00:07:39.371000','soulb9@naver.com','soulb9@naver.com',3,1,'',8,1,_binary '','대전','파이썬 빡공 스터디',NULL),(52,'2023-02-17 01:38:04.395000','2023-02-17 01:43:42.934000','didos9430@gmail.com','didos9430@gmail.com',10,3,'<h1>🎃</h1><h1>🎃</h1><h1>🎃</h1>',8,1,_binary '','부울경','🎃파이썬 빡공 스터디🎃',NULL),(53,'2023-02-17 09:13:02.872000','2023-02-17 09:27:25.956000','jbson1998@naver.com','ssafyseoul@ruu.kr',6,2,'<p>모두 고생많으셨어요! 모든팀들 고생많으셨습니다!</p>',8,5,_binary '','대전','8기 1반8팀 공통 스터디',NULL),(55,'2023-02-17 11:14:06.144000','2023-02-17 11:14:06.144000','tablemin_park@daum.net','tablemin_park@daum.net',6,2,'<p>하이루</p>',8,1,_binary '','부울경','일로와',NULL);
/*!40000 ALTER TABLE `study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_day`
--

DROP TABLE IF EXISTS `study_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_day` (
  `study_id` bigint NOT NULL,
  `day` varchar(255) DEFAULT NULL,
  KEY `FKp7qltvr2rwe7oyx74db7m986s` (`study_id`),
  CONSTRAINT `FKp7qltvr2rwe7oyx74db7m986s` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_day`
--

LOCK TABLES `study_day` WRITE;
/*!40000 ALTER TABLE `study_day` DISABLE KEYS */;
INSERT INTO `study_day` VALUES (5,'토'),(17,'수'),(17,'목'),(18,'수'),(19,'화'),(19,'목'),(20,'화'),(20,'목'),(21,'월'),(21,'화'),(21,'수'),(21,'목'),(21,'금'),(21,'토'),(21,'일'),(22,'화'),(22,'목'),(23,'수'),(23,'금'),(24,'화'),(24,'목'),(25,'수'),(25,'일'),(26,'목'),(26,'수'),(27,'화'),(27,'목'),(28,'토'),(28,'일'),(29,'화'),(29,'수'),(30,'화'),(30,'목'),(31,'수'),(31,'금'),(31,'일'),(32,'수'),(32,'일'),(33,'수'),(33,'토'),(34,'수'),(35,'화'),(35,'수'),(35,'목'),(35,'금'),(35,'월'),(36,'수'),(36,'금'),(37,'수'),(37,'금'),(38,'화'),(38,'목'),(39,'월'),(39,'화'),(39,'수'),(39,'목'),(39,'금'),(39,'토'),(39,'일'),(40,'일'),(40,'토'),(41,'월'),(41,'수'),(41,'금'),(42,'화'),(43,'토'),(43,'일'),(46,'월'),(46,'수'),(46,'금'),(48,'금'),(49,'화'),(52,'금'),(53,'월'),(53,'수'),(53,'금'),(55,'월'),(55,'화'),(55,'수'),(55,'목'),(55,'금');
/*!40000 ALTER TABLE `study_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_img`
--

DROP TABLE IF EXISTS `study_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_img` (
  `study_img_id` bigint NOT NULL AUTO_INCREMENT,
  `file_url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`study_img_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_img`
--

LOCK TABLES `study_img` WRITE;
/*!40000 ALTER TABLE `study_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `study_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp_user`
--

DROP TABLE IF EXISTS `temp_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_user` (
  `email` varchar(255) NOT NULL,
  `class_num` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `generation` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_user`
--

LOCK TABLES `temp_user` WRITE;
/*!40000 ALTER TABLE `temp_user` DISABLE KEYS */;
INSERT INTO `temp_user` VALUES ('esmint828@daum.net',4,'a33c9d6f-5bbf-4384-bc02-856ecbd236da',9,'채성아','$2a$10$d0uEeCZkZZYOMvzVubNIV.wKlpwJM4d0xgo4r2LBkTKXWvKuUN7K.','광주'),('nyj3230@ssafy.com',0,'9860ab7f-a37c-4509-8098-594084902808',8,'sss','$2a$10$9XHkCYydXehDAhcxkW0ZSO5eis.A10JM85nFBHkSedJhxHcMV08hS','부울경'),('rkdtks36@gmail.com',3,'2b4d587c-813e-4244-becb-445faf4fdac0',8,'김강산','$2a$10$KQUh4lUtUJRn3mBRJMYE1uxp0wpQOQm35WIbAVyxP84TkY1sCPJmO','서울');
/*!40000 ALTER TABLE `temp_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `class_num` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `generation` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `total_time` bigint NOT NULL DEFAULT '0',
  `user_img_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  KEY `FKk4ukxsxpyfuawiflmo61h53lp` (`user_img_id`),
  CONSTRAINT `FKk4ukxsxpyfuawiflmo61h53lp` FOREIGN KEY (`user_img_id`) REFERENCES `user_img` (`user_img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2023-02-16 11:19:30.311000','2023-02-16 17:04:42.707000',1,'soulb9@naver.com',8,'이방환','$2a$10$VEcD0EFBP14..yXPlrDrpO3ZM78beYVyhWsRSlDes7C/0NbT06o7m','대전',185,NULL),(2,'2023-02-16 12:14:31.190000','2023-02-16 12:14:31.190000',1,'ahg0824@naver.com',8,'안효관','$2a$10$p3iEHORsaazYWJlv6Jcop.UjcpYpYzyuHs4DfcInt4al1ev9usqaW','대전',0,NULL),(3,'2023-02-16 12:36:47.951000','2023-02-16 21:08:59.295000',1,'ssafytest@ruu.kr',8,'하사피','$2a$10$xrlAXtMlw.L/VNQDTBK0neXNiREHa5XDD6dXGHxbsQ1D9thYIlI1K','대전',36,NULL),(4,'2023-02-16 12:38:14.864000','2023-02-17 09:45:55.273000',2,'jbson1998@naver.com',8,'손종효','$2a$10$./miR7TQ48duWfvHpBuN5OaYOw0MHNqZyGR79awImErnBJvKFQiAK','대전',36660,6),(5,'2023-02-16 13:32:35.862000','2023-02-17 09:55:12.067000',1,'yr7256@gmail.com',8,'김영록','$2a$10$qzszXqmVNC2gXN1OziXCoeLB8JzIfP0qcpO78bjb455pH929c7wre','대전',40548,8),(6,'2023-02-16 13:51:34.914000','2023-02-16 13:54:26.576000',1,'protoss1207@gmail.com',8,'devhan','$2a$10$5GuZtI1/0d1jaHQQJpoo8OMvslS2MhJFZr70T/TAFWAHh6tMbRulq','대전',5,NULL),(7,'2023-02-16 05:09:50.000000','2023-02-16 16:28:07.760000',1,'ssafy@ssafy.com',8,'관리자','$2a$12$VU6xZD6qvCNMPIBm01OvJ.px5ZODjYWUA5MGagGBBVBss6B3d4Sde','daejeon',4,NULL),(19,'2023-02-16 05:09:50.000000','2023-02-16 16:29:42.893000',1,'b10811@naver.com',8,'손나은','$2a$12$VU6xZD6qvCNMPIBm01OvJ.px5ZODjYWUA5MGagGBBVBss6B3d4Sde','seoul',8,NULL),(105,'2023-02-16 14:40:50.592000','2023-02-17 09:39:32.895000',2,'ssafyseoul@ruu.kr',8,'하서울','$2a$10$wl5hdXt.7LjZJyCPI2WHe.EGzV0rQdyXCWHG1EhtbxMULlXmCOYpi','서울',21,NULL),(107,'2023-02-16 15:09:52.970000','2023-02-16 15:09:52.970000',2,'ssafyseoul1@ruu.kr',8,'김서울','$2a$10$xd5mKgMtsmwE5r09iNWiIeW6kOArQ/Wvv.atYpKdLjHPaSZTM7t8y','서울',0,NULL),(108,'2023-02-16 15:11:16.954000','2023-02-16 15:11:16.954000',1,'ssafyseoul2@ruu.kr',9,'박서울','$2a$10$EhrAgxci3b1j7veMtOlAuODIGeOehK.S2Sxfp5LuOaf.6YWb97RA6','서울',0,NULL),(109,'2023-02-16 15:12:07.307000','2023-02-16 15:12:07.307000',1,'yixen82537@iucake.com',8,'김지아','$2a$10$LOIuqWLnCDaPY6tIVj1RzuXC4trPTHoX9.ML/XuBe.I6ad1m5faj2','구미',0,NULL),(110,'2023-02-16 15:13:00.573000','2023-02-16 15:13:00.573000',4,'ssafyseoul3@ruu.kr',8,'최서울','$2a$10$UhQ6Uno83hNvC7JvJhS.LO98u9ARLF16MfRN9kmGtPMsuvGFgkJti','서울',0,NULL),(111,'2023-02-16 15:14:12.326000','2023-02-16 15:14:12.326000',9,'ssafyseoul4@ruu.kr',8,'이서울','$2a$10$gx2P6ZRaTlGKudcAr1zDLu8fKqPH5RBktXy9ZOBvVLmBSqogWO.J2','서울',0,NULL),(113,'2023-02-16 15:15:29.327000','2023-02-16 15:15:29.327000',6,'ssafyseoul5@ruu.kr',8,'정서울','$2a$10$5XwwG/oFIuByvPgQ1YZH1e4ygPYioQ9.hsYegV.tryIQfDRZ7EEzG','서울',0,NULL),(114,'2023-02-16 15:17:00.470000','2023-02-16 15:17:00.470000',2,'ssafyseoul6@ruu.kr',9,'박서울','$2a$10$lqU22SWLsc.HNv4O6nqBLugXN4zxR1nlV0XUehe/6x5OVsrBNQnAy','서울',0,NULL),(115,'2023-02-16 15:19:07.809000','2023-02-16 15:19:07.809000',4,'ssafyseoul7@ruu.kr',9,'윤서울','$2a$10$t2IdxNxcDzFtHK8ILtq88eUdN3la/YcYec3vXoGudSufltuijH6n.','서울',0,NULL),(116,'2023-02-16 15:20:09.501000','2023-02-17 02:14:32.931000',6,'ssafyseoul8@ruu.kr',9,'유서울','$2a$10$BnXp60K845O2bf80helvye4lBl/ddvy.i7zWpyGhQv2wH345kod5a','서울',48,NULL),(117,'2023-02-16 16:20:06.824000','2023-02-17 09:41:52.241000',1,'jjjp9966@naver.com',8,'이진섭','$2a$10$EfPVX5etuFJBRDgW5fAo2.oUjntJ9cL0nSL7gfqVQz7j2mrn9OGSy','대전',36181,7),(118,'2023-02-16 16:34:56.863000','2023-02-16 16:34:56.863000',1,'jjjp9966@gmail.com',9,'최이정','$2a$10$q3Bc4B2DfDu1NaZHBh2NNuFeJEwCFLyrhqdt.1ZHfWZRY1v52ja.G','서울',0,NULL),(119,'2023-02-16 16:57:03.879000','2023-02-16 16:57:03.879000',8,'onehee9710@gmail.com',8,'조조조','$2a$10$xj5fXqNmBedwD4gLRwEbae3fjLCdton06yR4KQZ9JXOGu2ci5kxDi','대전',0,NULL),(120,'2023-02-16 17:05:38.900000','2023-02-16 17:05:38.900000',8,'ssafyyyyy@ruu.kr',8,'조조조조','$2a$10$Y0ST/mxLHV9iuopSO/ao.uyK4CS58tey34z.eRKqnQPPE3hKSIDbS','대전',0,NULL),(121,'2023-02-16 17:16:00.867000','2023-02-16 17:16:00.867000',1,'2js0415@kangwon.ac.kr',9,'안제호','$2a$10$dX19OW8rmPB3giWve/zilOmQfb68aEuhiHzfVSwT8JZEnP3UWNudS','구미',0,NULL),(122,'2023-02-16 21:38:13.488000','2023-02-16 21:38:13.488000',1,'smartpodo@kakao.com',8,'동동','$2a$10$BXJ8sUFs/VYIDRNg2JVu9unSHl9oaPNCkzNHVOo1v/v.u4DlwNawO','대전',0,NULL),(123,'2023-02-16 21:52:49.332000','2023-02-17 09:51:39.849000',8,'solar2008@naver.com',8,'조은서','$2a$10$4LYUcuHDSKnjOuLsCKLIsOOOVuauOstQyGHl/Y6voaDYzsHFhHaGG','대전',59467,4),(124,'2023-02-16 21:57:44.233000','2023-02-16 21:57:44.233000',2,'solar2003@daum.net',8,'나미','$2a$10$Lx3xTdiSDaOwk0cJu2rNseLbI0reUyzSzZON.j4x6vSxAfKs7jIpe','광주',0,NULL),(125,'2023-02-16 22:03:12.381000','2023-02-16 22:03:12.381000',3,'ssafyseoul9@ruu.kr',9,'박대전','$2a$10$zthAr96MXccHA7tkueNPoOkJeNEKP0wU8aBXGmxNs33q1TM8Hj.2y','대전',0,NULL),(126,'2023-02-16 22:16:21.244000','2023-02-16 22:31:23.215000',4,'mint_828@daum.net',9,'채성아','$2a$10$giBQyHUeEedR9ao3tXKYrerfvsQnrrInB88LVPl3ZatdaYEHtf3jO','광주',79,NULL),(127,'2023-02-16 22:19:15.225000','2023-02-16 22:19:15.225000',2,'sjonghyo97@gmail.com',8,'손사피','$2a$10$WiuszeFGB65WbEGhpHtHYeBBuqOw38AkTkxHJelvkRQ41WgT82fqG','대전',0,NULL),(128,'2023-02-17 00:24:07.685000','2023-02-17 00:24:07.685000',3,'didos9430@gmail.com',8,'이방환','$2a$10$470EEWDgPmpSbK44CCvUpeIghctW1TzdtrKapRBTUNlPFsZaxoJDy','부울경',0,NULL),(129,'2023-02-17 01:01:10.942000','2023-02-17 01:01:10.942000',1,'spirits1232@gmail.com',10,'김철수','$2a$10$8eZe3Svxs8d8Ir2jaW2gq.DVP1IgC/jVnyDm4QS/HdCvpmvyIi1qG','서울',0,NULL),(130,'2023-02-17 08:53:33.122000','2023-02-17 08:53:33.122000',1,'xkhg0611x@naver.com',8,'하상재','$2a$10$Mf90CoYt0ngny7Q93YcscOubsj3oagkDpCFObbk7gYhcHf5a6Iam6','부울경',0,NULL),(131,'2023-02-17 11:13:16.402000','2023-02-17 11:13:16.402000',2,'tablemin_park@daum.net',8,'박상민','$2a$10$MWZFRTB0RLHT8opHO5bnl.ABD/Bwb87cMB2E7cgwx03UP7CLMZKOG','부울경',0,NULL),(132,'2023-02-17 11:13:40.304000','2023-02-17 11:13:40.304000',2,'nyj3230@naver.com',8,'sss','$2a$10$uOoy3aI6Uz9vkZqxfEUKyOUTrQ4sTsDPCzaoQ783pjcgdmFPxN0b2','부울경',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_badge`
--

DROP TABLE IF EXISTS `user_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_badge` (
  `user_badge_id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `badge_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_badge_id`),
  KEY `FKjqx9n26pk9mqf1qo8f7xvvoq9` (`badge_id`),
  KEY `FK2jw9fpotmmbda07k27qc9t2ul` (`user_id`),
  CONSTRAINT `FK2jw9fpotmmbda07k27qc9t2ul` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKjqx9n26pk9mqf1qo8f7xvvoq9` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`badge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_badge`
--

LOCK TABLES `user_badge` WRITE;
/*!40000 ALTER TABLE `user_badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_img`
--

DROP TABLE IF EXISTS `user_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_img` (
  `user_img_id` bigint NOT NULL AUTO_INCREMENT,
  `file_url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`user_img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_img`
--

LOCK TABLES `user_img` WRITE;
/*!40000 ALTER TABLE `user_img` DISABLE KEYS */;
INSERT INTO `user_img` VALUES (1,'/src/img/profile/7296a496-a96f-4738-a66c-1f913dbd566c_IMG_5465.jpg','IMG_5465.jpg','image/jpeg'),(3,'/src/img/profile/195b6d6b-9f20-45a6-b5cb-c6726cdd39dd_IMG_5465.jpg','IMG_5465.jpg','image/jpeg'),(4,'/src/img/profile/e6cd0c08-84be-4a3c-80a8-603e4dc99161_IMG_5390.jpg','IMG_5390.jpg','image/jpeg'),(5,'/src/img/profile/3c672cb8-37ee-4487-bc88-041d3d110d97_studybackground1.jpg','studybackground1.jpg','image/jpeg'),(6,'/src/img/profile/e65b4a7e-1c6f-47b7-9a22-f2bd374edae7_studybackground1.jpg','studybackground1.jpg','image/jpeg'),(7,'/src/img/profile/18c28afd-0c84-4411-876b-14a5f3a898ac_gagoole.jpg','gagoole.jpg','image/jpeg'),(8,'/src/img/profile/f5a6647a-98c5-4f5b-9e14-ca9d979bb4a5_3.png','3.png','image/png');
/*!40000 ALTER TABLE `user_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_study`
--

DROP TABLE IF EXISTS `user_study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_study` (
  `user_study_id` bigint NOT NULL AUTO_INCREMENT,
  `study_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_study_id`),
  KEY `FK8g3qtmfhqft80t854j2n2gawm` (`study_id`),
  KEY `FKguhhymf5vvsah78agbjdgc3jp` (`user_id`),
  CONSTRAINT `FK8g3qtmfhqft80t854j2n2gawm` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`),
  CONSTRAINT `FKguhhymf5vvsah78agbjdgc3jp` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_study`
--

LOCK TABLES `user_study` WRITE;
/*!40000 ALTER TABLE `user_study` DISABLE KEYS */;
INSERT INTO `user_study` VALUES (6,5,6),(25,17,4),(28,5,7),(29,18,117),(30,18,3),(31,19,118),(32,20,117),(33,21,119),(34,21,117),(36,21,120),(37,21,1),(38,21,4),(39,22,121),(40,23,118),(41,24,117),(42,25,117),(43,20,3),(44,26,121),(45,27,121),(46,28,117),(47,29,117),(48,30,3),(49,31,117),(50,32,118),(51,33,121),(52,34,117),(53,35,117),(54,36,117),(55,37,124),(56,20,124),(57,38,124),(58,39,124),(59,21,124),(60,23,126),(61,17,126),(62,40,126),(63,41,116),(64,42,116),(65,43,4),(66,20,5),(69,46,4),(71,48,117),(72,49,1),(74,21,5),(75,21,116),(76,21,128),(77,21,123),(80,52,128),(81,19,3),(82,53,4),(83,53,117),(84,53,5),(85,27,117),(86,30,117),(87,53,123),(88,53,105),(90,17,123),(91,55,131);
/*!40000 ALTER TABLE `user_study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_time_log`
--

DROP TABLE IF EXISTS `user_time_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_time_log` (
  `user_time_log_id` bigint NOT NULL AUTO_INCREMENT,
  `day` date NOT NULL,
  `study_time` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_time_log_id`),
  KEY `FK5r4pnd75xauytses8gvukcaq4` (`user_id`),
  CONSTRAINT `FK5r4pnd75xauytses8gvukcaq4` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_time_log`
--

LOCK TABLES `user_time_log` WRITE;
/*!40000 ALTER TABLE `user_time_log` DISABLE KEYS */;
INSERT INTO `user_time_log` VALUES (1,'2023-02-16',119,4),(3,'2023-02-16',40425,5),(4,'2023-02-16',5,6),(5,'2023-02-16',8,19),(6,'2023-02-16',4,105),(7,'2023-02-16',4,7),(8,'2023-02-16',185,1),(9,'2023-02-16',36,3),(10,'2023-02-16',79,126),(11,'2023-02-16',29040,123),(12,'2023-02-16',48,116),(13,'2023-01-01',200,123),(14,'2023-02-17',123,5),(16,'2023-02-17',541,4),(17,'2023-02-17',181,117),(18,'2023-02-17',1007,123),(20,'2023-02-17',17,105),(21,'2023-02-17',17,105),(22,'1970-01-01',36000,117),(23,'1970-01-01',36000,4),(24,'2023-02-15',10000,123),(25,'2023-02-14',9300,123),(26,'2023-02-13',9920,123);
/*!40000 ALTER TABLE `user_time_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  2:14:52
