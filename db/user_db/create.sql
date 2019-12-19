CREATE TABLE countries (
  country_id int NOT NULL AUTO_INCREMENT,
  country_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(country_id)
);

CREATE TABLE states (
  state_id int NOT NULL AUTO_INCREMENT,
  country_id int NOT NULL,
  state_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(state_id),
  FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

CREATE TABLE cities (
  city_id int NOT NULL AUTO_INCREMENT,
  state_id int NOT NULL,
  city_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(city_id),
  FOREIGN KEY (state_id) REFERENCES states(state_id)
);

CREATE TABLE users (
  id VARCHAR(30) NOT NULL,
  city_id int NOT NULL,
  displayname VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

-- seed location
INSERT INTO countries
  (country_name)
VALUES
  ('China');

INSERT INTO countries
  (country_name)
VALUES
  ('United States');

INSERT INTO states
  (country_id, state_name)
VALUES
  (1, 'Zhejiang');

INSERT INTO states
  (country_id, state_name)
VALUES
  (2, 'Wisconsin');

INSERT INTO cities
  (state_id, city_name)
VALUES
  (2, 'Madison');

INSERT INTO cities
  (state_id, city_name)
VALUES
  (2, 'Milwaukee');