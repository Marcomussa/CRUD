CREATE TABLE `Products`(
    `id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` BIGINT NOT NULL,
    `discount` INT,
    `priceWithDiscount` INT,
    `category_id` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `timesVisited` INT NOT NULL
);

ALTER TABLE `Products` ADD PRIMARY KEY `products_id_primary`(`id`);

ALTER TABLE `Products` ADD INDEX(`id`);

ALTER TABLE `Products` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;

