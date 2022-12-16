-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2020 at 01:41 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackwebers`
--
CREATE DATABASE IF NOT EXISTS `hackwebers` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hackwebers`;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `teacherId` int(11) NOT NULL,
  `teacherName` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `description`, `teacherId`, `teacherName`, `price`) VALUES
(1, 'Data Structures and Algorithms', 'Advanced Data Structures and algorithms related to graphs, trees and hash tables will be taught in this course.', 2, 'Akshay Jain', '5000'),
(2, 'Full Stack Web Development', 'MERN Stack will be taught in detail in this course.', 2, 'Akshay Jain', '4500'),
(3, 'Python', 'Basics of Python programming language will be taught in this course.', 2, 'Akshay Jain', '3000'),
(4, 'React Native App Development', 'Cross-platform app development will be taught using React Native in this course.', 1, 'Amit Kumar', '4000'),
(5, 'Machine Learning with Python', 'Basics of Machine Learning using Python programming language will be taught in this course.', 1, 'Amit Kumar', '6000');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `tokenStatus` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`, `token`, `tokenStatus`) VALUES
(1, 'Akshay', 'test@gmail.com', 'akshay', 'test@gmail.com@@31$10$2020..$18$38$17', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `tokenStatus` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `password`, `token`, `tokenStatus`) VALUES
(1, 'Amit Kumar', 'test1@gmail.com', 'amitkumar', 'teachertest1@gmail.com@@31$10$2020..$19$16$45', 'false'),
(2, 'Akshay Jain', 'test2@gmail.com', 'akshay123', 'teachertest2@gmail.com@@1$11$2020..$12$53$22', 'false');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
