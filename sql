CREATE DATABASE mydb;

use mydb;

CREATE TABLE components(
component_id INT(11) PRIMARY KEY AUTO_INCREMENT,
component_name VARCHAR(200),
component_category VARCHAR(200),
component_description VARCHAR(200)
) ENGINE=INNODB;

INSERT INTO 
	components(component_name, component_category, component_description)
VALUES
	('Network Card','input','this is a network card'),
	('Keyboard','input','a keyboard component'),
	('Router','input','this is a router component'),
	('Printer','output','this is a printer');
exit