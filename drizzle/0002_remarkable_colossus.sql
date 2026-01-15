CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(256) NOT NULL,
	`practiceName` varchar(256),
	`specialty` varchar(128),
	`location` varchar(256),
	`quote` text NOT NULL,
	`photoUrl` varchar(512),
	`growthPercent` int,
	`newPatientsPerMonth` int,
	`revenueIncrease` varchar(64),
	`rating` int DEFAULT 5,
	`isFeatured` enum('true','false') NOT NULL DEFAULT 'false',
	`isVisible` enum('true','false') NOT NULL DEFAULT 'true',
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
