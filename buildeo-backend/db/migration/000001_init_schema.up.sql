CREATE TABLE `users` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `post_number` VARCHAR(255) NOT NULL,
  `street` TEXT NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL COMMENT 'buyer, seller, or admin',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `categories` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `services` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `seller_id` BIGINT NOT NULL,
  `category_id` BIGINT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `quantity` BIGINT NOT NULL,
  `price` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `service_photos` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `service_id` BIGINT NOT NULL,
  `photo_url` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `requests` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `customer_id` BIGINT NOT NULL,
  `category_id` BIGINT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `budget` BIGINT NOT NULL,
  `deadline` TIMESTAMP NOT NULL,
  `status` VARCHAR(255) NOT NULL COMMENT 'open, closed, or fulfilled',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `offers` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `service_id` BIGINT NOT NULL,
  `request_id` BIGINT NOT NULL,
  `seller_id` BIGINT NOT NULL,
  `price` BIGINT NOT NULL,
  `description` TEXT,
  `status` VARCHAR(255) NOT NULL COMMENT 'pending, accepted, or rejected',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `chats` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user1_id` BIGINT NOT NULL,
  `user2_id` BIGINT NOT NULL,
  `status` VARCHAR(255) NOT NULL COMMENT 'active or inactive',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `messages` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `chat_id` BIGINT NOT NULL,
  `sender_id` BIGINT NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `shopping_baskets` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `basket_items` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `basket_id` BIGINT NOT NULL,
  `service_id` BIGINT NOT NULL,
  `quantity` INT NOT NULL,
  `price` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `transactions` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `basket_id` BIGINT NOT NULL,
  `amount` BIGINT NOT NULL,
  `payment_method` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NOT NULL COMMENT 'pending, completed, or failed',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `reviews` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `reviewer_id` BIGINT NOT NULL,
  `reviewee_id` BIGINT NOT NULL,
  `service_id` BIGINT NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `quotations` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `category_id` BIGINT,
  `document_url` VARCHAR(255),
  `status` VARCHAR(255) NOT NULL COMMENT 'open, in_progress, or completed',
  `user_id` BIGINT,
  `description` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` BIGINT NOT NULL
);

CREATE TABLE `orders` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `file_payment` VARCHAR(255) NOT NULL,
  `method_payment` VARCHAR(255) NOT NULL,
  `status_payment` VARCHAR(255) NOT NULL COMMENT 'pending, in_progress, completed, or cancelled',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `items_order` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `order_id` BIGINT NOT NULL,
  `seller_id` BIGINT NOT NULL,
  `quantity` BIGINT NOT NULL,
  `price` BIGINT NOT NULL,
  `status_service` VARCHAR(255) NOT NULL COMMENT 'pending, in_progress, completed',
  `start_date` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `negotiation`(
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `items_order_id` BIGINT NOT NULL,
  `items_offer_id` BIGINT NOT NULL,
  `status_negotiation` VARCHAR(255) NOT NULL COMMENT 'pending, accepted, cancelled',
  `final_price` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `cart`(
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `service_id` BIGINT NOT NULL,
  `seller_id` BIGINT NOT NULL,
  `category_id` BIGINT NOT NULL,
  `quantity` BIGINT NOT NULL,
  `price` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX `idx_users_email` ON `users` (`email`);
CREATE INDEX `idx_users_role` ON `users` (`role`);
CREATE INDEX `idx_categories_name` ON `categories` (`name`);
CREATE INDEX `idx_services_seller_id` ON `services` (`seller_id`);
CREATE INDEX `idx_services_category_id` ON `services` (`category_id`);
CREATE INDEX `idx_service_photos_service_id` ON `service_photos` (`service_id`);
CREATE INDEX `idx_requests_customer_id` ON `requests` (`customer_id`);
CREATE INDEX `idx_requests_category_id` ON `requests` (`category_id`);
CREATE INDEX `idx_requests_status` ON `requests` (`status`);
CREATE INDEX `idx_offers_service_id` ON `offers` (`service_id`);
CREATE INDEX `idx_offers_request_id` ON `offers` (`request_id`);
CREATE INDEX `idx_offers_seller_id` ON `offers` (`seller_id`);
CREATE INDEX `idx_offers_status` ON `offers` (`status`);
CREATE INDEX `idx_chats_user1_id` ON `chats` (`user1_id`);
CREATE INDEX `idx_chats_user2_id` ON `chats` (`user2_id`);
CREATE INDEX `idx_chats_user1_user2` ON `chats` (`user1_id`, `user2_id`);
CREATE INDEX `idx_messages_chat_id` ON `messages` (`chat_id`);
CREATE INDEX `idx_messages_sender_id` ON `messages` (`sender_id`);
CREATE INDEX `idx_shopping_baskets_user_id` ON `shopping_baskets` (`user_id`);
CREATE INDEX `idx_basket_items_basket_id` ON `basket_items` (`basket_id`);
CREATE INDEX `idx_basket_items_service_id` ON `basket_items` (`service_id`);
CREATE INDEX `idx_transactions_user_id` ON `transactions` (`user_id`);
CREATE INDEX `idx_transactions_basket_id` ON `transactions` (`basket_id`);
CREATE INDEX `idx_transactions_status` ON `transactions` (`status`);
CREATE INDEX `idx_reviews_reviewer_id` ON `reviews` (`reviewer_id`);
CREATE INDEX `idx_reviews_reviewee_id` ON `reviews` (`reviewee_id`);
CREATE INDEX `idx_reviews_service_id` ON `reviews` (`service_id`);
CREATE INDEX `idx_quotations_category_id` ON `quotations` (`category_id`);
CREATE INDEX `idx_quotations_email` ON `quotations` (`email`);
CREATE INDEX `idx_quotations_status` ON `quotations` (`status`);
CREATE INDEX `idx_quotations_admin_id` ON `quotations` (`admin_id`);