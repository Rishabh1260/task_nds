-- ============================================================
-- Seed Data: Backend Developer Task – Users API
-- ============================================================

-- Clear existing data
DELETE FROM user_profiles;
DELETE FROM users;

-- ============================================================
-- Users
-- ============================================================
INSERT INTO users (email, name) VALUES
('alice@example.com', 'Alice Sharma'),
('bob@example.com', 'Bob Verma'),
('charlie@example.com', 'Charlie Khan'),
('diana@example.com', 'Diana Patel'),
('edward@example.com', 'Edward D''Souza'),
('fatima@example.com', 'Fatima Ali'),
('george@example.com', 'George Mathew'),
('harsh@example.com', 'Harsh Mehta');

-- ============================================================
-- User Profiles
-- ============================================================
INSERT INTO user_profiles (user_id, age, city, preferences) VALUES
(1, 24, 'Mumbai', JSON_OBJECT('newsletter', true, 'theme', 'dark')),
(2, 31, 'Delhi', JSON_OBJECT('newsletter', false, 'theme', 'light')),
(3, 28, 'Bangalore', JSON_OBJECT('newsletter', true, 'theme', 'dark')),
(4, 35, 'Ahmedabad', JSON_OBJECT('newsletter', false, 'theme', 'light')),
(5, 42, 'Goa', JSON_OBJECT('newsletter', true, 'theme', 'dark')),
(6, 26, 'Mumbai', JSON_OBJECT('newsletter', true, 'theme', 'light')),
(7, 38, 'Kochi', JSON_OBJECT('newsletter', false, 'theme', 'dark'));

-- Note:
-- User with id = 8 intentionally has NO profile
-- This is to test LEFT JOIN handling and edge cases
