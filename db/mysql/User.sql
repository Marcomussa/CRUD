CREATE TABLE `Users`(
    `id` INT UNSIGNED NULL,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `genero` CHAR(255) NOT NULL,
    `permisos` CHAR(255) NOT NULL
);
ALTER TABLE `Users` ADD PRIMARY KEY `users_id_primary`(`id`);

ALTER TABLE `Users` ADD INDEX(`id`);

ALTER TABLE `Users` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;