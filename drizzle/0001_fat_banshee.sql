CREATE TABLE `lead_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`practiceName` varchar(256),
	`contactName` varchar(256),
	`email` varchar(320),
	`phone` varchar(32),
	`specialty` varchar(128),
	`location` varchar(256),
	`message` text,
	`status` enum('new','contacted','qualified','converted','closed') NOT NULL DEFAULT 'new',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lead_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`section` varchar(64) NOT NULL,
	`key` varchar(64) NOT NULL,
	`value` text NOT NULL,
	`label` varchar(128),
	`contentType` enum('text','textarea','image','link') NOT NULL DEFAULT 'text',
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_content_id` PRIMARY KEY(`id`)
);
