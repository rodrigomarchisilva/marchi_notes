CREATE DATABASE IF NOT EXISTS Animonde;

USE Animonde;

-- Entities

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(12) NOT NULL CHECK (LEN(nickname) > 8),
  email VARCHAR(255) NOT NULL UNIQUE CHECK (email LIKE '%@%'),
  password VARCHAR(256) NOT NULL CHECK (LEN(password) >= 8),
  role ENUM('standard', 'reviewer', 'admin') DEFAULT 'standard'
);

CREATE TABLE reviewers (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(12) NOT NULL CHECK (LEN(nickname) > 8),
  overview TEXT(3000)
);

CREATE TABLE directors (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  overview TEXT(3000)
);

CREATE TABLE studios (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  overview TEXT(3000)
);

CREATE TABLE authors (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  overview TEXT(3000)
);

CREATE TABLE genres (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  overview TEXT(3000)
);

-- Relationships (reviews)

CREATE TABLE animes_previews (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  anime_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  preview TEXT(3000),
  FOREIGN KEY (anime_id) REFERENCES animes(id),
  FOREIGN KEY (reviewer_id) REFERENCES reviewers(id)
);

CREATE TABLE animes_reviews (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  anime_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  rating INT CHECK (rating >= 0 AND rating <= 10),
  review TEXT(3000),
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  FOREIGN KEY (anime_id) REFERENCES animes(id),
  FOREIGN KEY (reviewer_id) REFERENCES reviewers(id)
);

CREATE TABLE episodes_reviews (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  episode_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  rating FLOAT NOT NULL CHECK (rating >= 0 AND rating <= 10),
  review TEXT(3000) NOT NULL,
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  FOREIGN KEY (reviewer_id) REFERENCES reviewers(id),
  FOREIGN KEY (episode_id) REFERENCES episodes(id)
);

-- Relationships (animes)

CREATE TABLE animes_directors (
  anime_id INT NOT NULL,
  director_id INT NOT NULL,
  PRIMARY KEY (anime_id, director_id),
  FOREIGN KEY (anime_id) REFERENCES animes(id),
  FOREIGN KEY (director_id) REFERENCES directors(id)
);

CREATE TABLE animes_studios (
  anime_id INT NOT NULL,
  studio_id INT NOT NULL,
  PRIMARY KEY (anime_id, studio_id),
  FOREIGN KEY (anime_id) REFERENCES animes(id),
  FOREIGN KEY (studio_id) REFERENCES studios(id)
);

CREATE TABLE animes_genres (
  anime_id INT NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (anime_id, genre_id),
  FOREIGN KEY (anime_id) REFERENCES animes(id),
  FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE animes_authors (
  anime_id INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY (anime_id, author_id),
  FOREIGN KEY (anime_id) REFERENCES animes(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE animes_episodes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  anime_id INT NOT NULL,
  overview TEXT(3000) NOT NULL,
  FOREIGN KEY (anime_id) REFERENCES animes(id)
);

-- Animes, seasons, episodes and history

CREATE TABLE animes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  art BLOB NOT NULL,
  jp_title VARCHAR(120) UNIQUE NOT NULL,
  en_title VARCHAR(120) UNIQUE NOT NULL,
  overview TEXT(3000) NOT NULL,
  seasons INT NOT NULL,
  rating FLOAT CHECK (rating >= 0 AND rating <= 10)
);

CREATE TABLE seasons (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  anime_id INT NOT NULL,
  season_number INT NOT NULL,
  episodes INT NOT NULL CHECK (episodes > 0),
  status ENUM('ongoing', 'finished', 'cancelled', 'announced', 'tba') NOT NULL,
  release_date DATE NOT NULL,
  finish_date DATE,
  source VARCHAR(30),
  FOREIGN KEY (anime_id) REFERENCES animes(id)
);

CREATE TABLE episodes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  season_id INT NOT NULL,
  episode_number INT NOT NULL,
  title VARCHAR(120) NOT NULL,
  overview TEXT(3000) NOT NULL,
  FOREIGN KEY (season_id) REFERENCES seasons(id)
);

CREATE TABLE episodes_history (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  episode_id INT,
  rating INT CHECK (user_rating >= 0 AND user_rating <= 10),
  review TEXT(3000),
  progress ENUM('watching', 'finished') DEFAULT 'watching',
  current_progress TIME(0),
  start_date DATE,
  finish_date DATE,
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (episode_id) REFERENCES animes_episodes(id)
);

CREATE TABLE animes_history (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  anime_id INT,
  rating INT CHECK (user_rating >= 0 AND user_rating <= 10),
  review TEXT(3000),
  progress ENUM('watching', 'finished') DEFAULT 'watching',
  current_progress TIME(0),
  start_date DATE,
  finish_date DATE,
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (anime_id) REFERENCES animes(id)
);