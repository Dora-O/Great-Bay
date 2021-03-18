DROP DATABASE IF EXISTS great_bayDB;

CREATE DATABASE great_bayDB;

USE great_bayDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  starting_bid INT DEFAULT(0) NULL,
  highest_bid INT DEFAULT(0) NULL,
  PRIMARY KEY (id)
);

