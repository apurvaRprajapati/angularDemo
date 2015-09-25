-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2015 at 03:12 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `angulartest`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_Id` int(10) NOT NULL AUTO_INCREMENT,
  `user_Name` varchar(50) DEFAULT NULL,
  `email_Id` varchar(50) NOT NULL,
  `password` varchar(10) NOT NULL,
  `GROUP` enum('ADM','USER') NOT NULL,
  PRIMARY KEY (`user_Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_Id`, `user_Name`, `email_Id`, `password`, `GROUP`) VALUES
(6, 'apurva prajapati', 'apurva.prajapati@synoverge.com', '123', 'ADM'),
(9, 'suresh', 'raina@bcci.com', '1234', 'USER'),
(10, 'ashwin', 'ashwin@bcci.com', '1234', 'USER'),
(12, 'virat', 'virat@bcci.com', '12345', 'USER'),
(13, 'mahendra', 'dhoni@bcci.com', '1234', 'ADM'),
(14, 'ajinkya', 'rahane@bcci.com', '123', 'ADM');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
