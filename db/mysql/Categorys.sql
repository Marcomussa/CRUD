CREATE TABLE `Categorys`(
    `id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL
);

ALTER TABLE `Categorys` ADD PRIMARY KEY `categorys_id_primary`(`id`);

ALTER TABLE `Categorys` ADD INDEX(`id`);

ALTER TABLE `Categorys` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;