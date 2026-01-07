-- ============================================================
-- Schema: Backend Developer Task – Users API
-- ============================================================

-- Drop tables if they already exist
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS users;

-- ============================================================
-- Users table
-- ============================================================
CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

-- ============================================================
-- User profiles table
-- ============================================================
CREATE TABLE user_profiles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  age INT UNSIGNED NULL,
  city VARCHAR(100) NULL,
  preferences JSON NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_user_profiles_user_id (user_id),
  CONSTRAINT fk_user_profiles_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- Indexes for query efficiency
-- ============================================================
CREATE INDEX idx_user_profiles_age ON user_profiles (age);
CREATE INDEX idx_user_profiles_city ON user_profiles (city);
