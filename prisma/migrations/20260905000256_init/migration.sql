-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(36) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `roleId` CHAR(36) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `phoneVerified` BOOLEAN NOT NULL DEFAULT false,
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_roleId_idx`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissions_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `type` ENUM('room', 'apartment', 'office') NOT NULL,
    `description` TEXT NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `country` VARCHAR(100) NOT NULL DEFAULT 'Cameroun',
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(11, 8) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `pricePerDay` DECIMAL(12, 2) NULL,
    `basePrice` DECIMAL(12, 2) NULL,
    `price` DECIMAL(12, 2) NULL,
    `category` VARCHAR(50) NULL,
    `capacity` INTEGER NULL,
    `bedrooms` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `surface` DECIMAL(10, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `properties_type_idx`(`type`),
    INDEX `properties_city_idx`(`city`),
    INDEX `properties_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` CHAR(36) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `roomNumber` VARCHAR(20) NOT NULL,
    `category` ENUM('standard', 'premium', 'vip') NOT NULL,
    `pricePerNight` DECIMAL(12, 2) NOT NULL,
    `capacity` INTEGER NOT NULL DEFAULT 2,
    `bedType` VARCHAR(50) NOT NULL,
    `sizeSqm` DECIMAL(6, 2) NULL,
    `floor` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `rooms_propertyId_idx`(`propertyId`),
    INDEX `rooms_roomNumber_idx`(`roomNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apartments` (
    `id` CHAR(36) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `bedrooms` INTEGER NOT NULL,
    `bathrooms` INTEGER NOT NULL,
    `sizeSqm` DECIMAL(6, 2) NOT NULL,
    `maxGuests` INTEGER NOT NULL,
    `pricePerNight` DECIMAL(12, 2) NOT NULL,
    `pricePerWeek` DECIMAL(12, 2) NULL,
    `pricePerMonth` DECIMAL(12, 2) NULL,
    `depositAmount` DECIMAL(12, 2) NOT NULL,
    `kitchenType` VARCHAR(50) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `apartments_propertyId_idx`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offices` (
    `id` CHAR(36) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `sizeSqm` DECIMAL(6, 2) NOT NULL,
    `maxCapacity` INTEGER NOT NULL,
    `rentalType` ENUM('hour', 'day', 'week', 'month', 'long_term') NOT NULL,
    `pricePerHour` DECIMAL(12, 2) NULL,
    `pricePerDay` DECIMAL(12, 2) NULL,
    `pricePerWeek` DECIMAL(12, 2) NULL,
    `pricePerMonth` DECIMAL(12, 2) NULL,
    `equipment` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `offices_propertyId_idx`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amenities` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `category` ENUM('room', 'apartment', 'office', 'common') NOT NULL,
    `icon` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `amenities_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_amenities` (
    `propertyId` CHAR(36) NOT NULL,
    `amenityId` CHAR(36) NOT NULL,
    `isFree` BOOLEAN NOT NULL DEFAULT true,
    `extraCost` DECIMAL(12, 2) NULL,
    `notes` VARCHAR(255) NULL,

    INDEX `property_amenities_amenityId_idx`(`amenityId`),
    PRIMARY KEY (`propertyId`, `amenityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pricing_rules` (
    `id` CHAR(36) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `propertyType` ENUM('room', 'apartment', 'office') NOT NULL,
    `durationType` ENUM('night', 'week', 'month', 'hour', 'day') NOT NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `pricing_rules_propertyId_idx`(`propertyId`),
    INDEX `pricing_rules_propertyType_durationType_idx`(`propertyType`, `durationType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotions` (
    `id` CHAR(36) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `description` TEXT NULL,
    `type` ENUM('percentage', 'fixed_amount', 'free_nights') NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `scope` ENUM('global', 'room', 'apartment', 'office', 'property') NOT NULL DEFAULT 'global',
    `propertyId` CHAR(36) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `maxUses` INTEGER NULL,
    `usedCount` INTEGER NOT NULL DEFAULT 0,
    `minBookingAmount` DECIMAL(12, 2) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `promotions_code_key`(`code`),
    INDEX `promotions_propertyId_idx`(`propertyId`),
    INDEX `promotions_code_idx`(`code`),
    INDEX `promotions_startDate_endDate_idx`(`startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cancellation_policies` (
    `id` CHAR(36) NOT NULL,
    `propertyType` ENUM('room', 'apartment', 'office') NOT NULL,
    `hoursBefore` INTEGER NOT NULL,
    `refundPercentage` DECIMAL(5, 2) NOT NULL,
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `cancellation_policies_propertyType_idx`(`propertyType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` CHAR(36) NOT NULL,
    `reference` VARCHAR(50) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `propertyType` ENUM('room', 'apartment', 'office') NOT NULL,
    `userId` CHAR(36) NULL,
    `guestName` VARCHAR(100) NOT NULL,
    `guestEmail` VARCHAR(100) NOT NULL,
    `guestPhone` VARCHAR(20) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `numberOfGuests` INTEGER NOT NULL,
    `status` ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled') NOT NULL DEFAULT 'pending',
    `paymentStatus` ENUM('pending', 'processing', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    `totalAmount` DECIMAL(12, 2) NOT NULL,
    `depositAmount` DECIMAL(12, 2) NOT NULL,
    `paidAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `specialRequests` TEXT NULL,
    `cancellationReason` TEXT NULL,
    `cancelledAt` DATETIME(3) NULL,
    `checkedInAt` DATETIME(3) NULL,
    `checkedOutAt` DATETIME(3) NULL,
    `createdBy` CHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `bookings_reference_key`(`reference`),
    INDEX `bookings_propertyId_idx`(`propertyId`),
    INDEX `bookings_userId_idx`(`userId`),
    INDEX `bookings_startDate_endDate_idx`(`startDate`, `endDate`),
    INDEX `bookings_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calendar_blocks` (
    `id` CHAR(36) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `reason` VARCHAR(255) NULL,
    `type` ENUM('maintenance', 'private', 'other') NOT NULL DEFAULT 'maintenance',
    `createdBy` CHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `calendar_blocks_propertyId_idx`(`propertyId`),
    INDEX `calendar_blocks_startDate_endDate_idx`(`startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` CHAR(36) NOT NULL,
    `bookingId` CHAR(36) NOT NULL,
    `transactionId` VARCHAR(100) NOT NULL,
    `reference` VARCHAR(100) NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `method` ENUM('mtn_mobile_money', 'orange_money', 'credit_card', 'cash', 'paydunya', 'cinetpay', 'opay') NOT NULL,
    `type` ENUM('deposit', 'balance', 'full', 'refund', 'penalty') NOT NULL,
    `status` ENUM('pending', 'processing', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    `phoneNumber` VARCHAR(20) NULL,
    `providerResponse` TEXT NULL,
    `paidAt` DATETIME(3) NULL,
    `refundedAt` DATETIME(3) NULL,
    `refundReason` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payments_reference_key`(`reference`),
    INDEX `payments_bookingId_idx`(`bookingId`),
    INDEX `payments_transactionId_idx`(`transactionId`),
    INDEX `payments_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_transactions` (
    `id` CHAR(36) NOT NULL,
    `paymentId` CHAR(36) NOT NULL,
    `aggregator` VARCHAR(50) NOT NULL,
    `externalTransactionId` VARCHAR(100) NULL,
    `status` ENUM('pending', 'success', 'failed', 'cancelled') NOT NULL DEFAULT 'pending',
    `requestPayload` TEXT NULL,
    `responsePayload` TEXT NULL,
    `processedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `payment_transactions_paymentId_idx`(`paymentId`),
    INDEX `payment_transactions_externalTransactionId_idx`(`externalTransactionId`),
    INDEX `payment_transactions_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_methods` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `type` ENUM('mobile_money', 'card', 'cash', 'aggregator') NOT NULL,
    `provider` VARCHAR(50) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `config` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_methods_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deposits` (
    `id` CHAR(36) NOT NULL,
    `bookingId` CHAR(36) NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `status` ENUM('held', 'returned', 'partially_deducted', 'fully_deducted') NOT NULL DEFAULT 'held',
    `deductionReason` TEXT NULL,
    `deductedAmount` DECIMAL(12, 2) NULL,
    `returnedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `deposits_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` CHAR(36) NOT NULL,
    `bookingId` CHAR(36) NOT NULL,
    `invoiceNumber` VARCHAR(50) NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `taxAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `totalAmount` DECIMAL(12, 2) NOT NULL,
    `status` ENUM('draft', 'issued', 'paid', 'cancelled') NOT NULL DEFAULT 'draft',
    `issuedAt` DATETIME(3) NULL,
    `paidAt` DATETIME(3) NULL,
    `pdfUrl` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `invoices_invoiceNumber_key`(`invoiceNumber`),
    INDEX `invoices_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contracts` (
    `id` CHAR(36) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `tenantId` CHAR(36) NOT NULL,
    `type` ENUM('short_term', 'long_term') NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `monthlyRent` DECIMAL(12, 2) NOT NULL,
    `depositAmount` DECIMAL(12, 2) NOT NULL,
    `terms` TEXT NOT NULL,
    `clauses` TEXT NULL,
    `status` ENUM('draft', 'sent', 'signed', 'active', 'terminated', 'expired') NOT NULL DEFAULT 'draft',
    `signedAt` DATETIME(3) NULL,
    `pdfUrl` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `contracts_propertyId_idx`(`propertyId`),
    INDEX `contracts_tenantId_idx`(`tenantId`),
    INDEX `contracts_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `identity_documents` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,
    `bookingId` CHAR(36) NULL,
    `type` ENUM('passport', 'id_card', 'driver_license', 'other') NOT NULL,
    `documentNumber` VARCHAR(100) NULL,
    `fileUrl` VARCHAR(255) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `identity_documents_userId_idx`(`userId`),
    INDEX `identity_documents_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media` (
    `id` CHAR(36) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `type` ENUM('image', 'video', 'document') NOT NULL,
    `title` VARCHAR(100) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `media_propertyId_idx`(`propertyId`),
    INDEX `media_propertyId_order_idx`(`propertyId`, `order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,
    `bookingId` CHAR(36) NULL,
    `type` ENUM('email', 'sms', 'whatsapp', 'push') NOT NULL,
    `channel` VARCHAR(50) NOT NULL,
    `subject` VARCHAR(255) NULL,
    `content` TEXT NOT NULL,
    `status` ENUM('pending', 'sent', 'failed', 'read') NOT NULL DEFAULT 'pending',
    `sentAt` DATETIME(3) NULL,
    `readAt` DATETIME(3) NULL,
    `errorMessage` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `notifications_userId_idx`(`userId`),
    INDEX `notifications_bookingId_idx`(`bookingId`),
    INDEX `notifications_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manual_booking_requests` (
    `id` CHAR(36) NOT NULL,
    `propertyId` CHAR(36) NOT NULL,
    `guestName` VARCHAR(100) NOT NULL,
    `guestEmail` VARCHAR(100) NOT NULL,
    `guestPhone` VARCHAR(20) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `numberOfGuests` INTEGER NOT NULL,
    `totalAmount` DECIMAL(12, 2) NOT NULL,
    `depositAmount` DECIMAL(12, 2) NOT NULL,
    `notes` TEXT NULL,
    `status` ENUM('pending', 'approved', 'rejected', 'confirmed') NOT NULL DEFAULT 'pending',
    `createdBy` CHAR(36) NOT NULL,
    `processedBy` CHAR(36) NULL,
    `processedAt` DATETIME(3) NULL,
    `confirmationId` VARCHAR(10) NULL,
    `bookingId` CHAR(36) NULL,
    `userId` CHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `manual_booking_requests_confirmationId_key`(`confirmationId`),
    INDEX `manual_booking_requests_propertyId_idx`(`propertyId`),
    INDEX `manual_booking_requests_createdBy_idx`(`createdBy`),
    INDEX `manual_booking_requests_processedBy_idx`(`processedBy`),
    INDEX `manual_booking_requests_bookingId_idx`(`bookingId`),
    INDEX `manual_booking_requests_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,
    `action` VARCHAR(100) NOT NULL,
    `entity` VARCHAR(50) NOT NULL,
    `entityId` CHAR(36) NULL,
    `oldValue` TEXT NULL,
    `newValue` TEXT NULL,
    `ipAddress` VARCHAR(45) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_userId_idx`(`userId`),
    INDEX `audit_logs_entity_entityId_idx`(`entity`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `whatsapp_sessions` (
    `id` CHAR(36) NOT NULL,
    `sessionId` VARCHAR(100) NOT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `status` ENUM('active', 'inactive', 'expired') NOT NULL DEFAULT 'active',
    `qrCode` TEXT NULL,
    `lastActivityAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `whatsapp_sessions_sessionId_key`(`sessionId`),
    INDEX `whatsapp_sessions_phoneNumber_idx`(`phoneNumber`),
    INDEX `whatsapp_sessions_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_search_history` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,
    `searchParams` TEXT NOT NULL,
    `resultsCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_search_history_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publications` (
    `id` CHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `excerpt` TEXT NULL,
    `featuredImage` VARCHAR(255) NULL,
    `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `category` VARCHAR(255) NULL,
    `tags` JSON NULL,
    `authorId` CHAR(36) NOT NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `publications_slug_key`(`slug`),
    INDEX `publications_authorId_idx`(`authorId`),
    INDEX `publications_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apartments` ADD CONSTRAINT `apartments_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offices` ADD CONSTRAINT `offices_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_amenities` ADD CONSTRAINT `property_amenities_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_amenities` ADD CONSTRAINT `property_amenities_amenityId_fkey` FOREIGN KEY (`amenityId`) REFERENCES `amenities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pricing_rules` ADD CONSTRAINT `pricing_rules_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_transactions` ADD CONSTRAINT `payment_transactions_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `payments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deposits` ADD CONSTRAINT `deposits_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `identity_documents` ADD CONSTRAINT `identity_documents_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `identity_documents` ADD CONSTRAINT `identity_documents_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `manual_booking_requests` ADD CONSTRAINT `manual_booking_requests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `manual_booking_requests` ADD CONSTRAINT `manual_booking_requests_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_search_history` ADD CONSTRAINT `user_search_history_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publications` ADD CONSTRAINT `publications_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
