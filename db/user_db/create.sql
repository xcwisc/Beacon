CREATE TABLE locations (
  id int NOT NULL AUTO_INCREMENT,
  country VARCHAR(30) NOT NULL,
  province VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE users (
  id VARCHAR(30) NOT NULL,
  locationid int NOT NULL,
  displayname VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (locationid) REFERENCES locations(id)
);

INSERT INTO locations
  (country, province, city)
VALUES
  ('United States', 'Wisconsin', 'Madison');

INSERT INTO locations
  (country, province, city)
VALUES
  ('United States', 'Wisconsin', 'Milwaukee');