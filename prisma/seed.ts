
import bcrypt from 'bcryptjs';

import { prisma } from '../src/config/database';
import { logger } from '../src/config/logger';

const seed = async () => {
  try {
    logger.info('🌱 Démarrage du seed Prisma...');

    // ==========================================================
    // 1. ROLES
    // ==========================================================

    const roles = await Promise.all([
      prisma.role.create({
        data: {
          name: 'Visiteur',
          slug: 'visitor',
          description: 'Utilisateur non connecté',
          isActive: true,
        },
      }),

      prisma.role.create({
        data: {
          name: 'Client',
          slug: 'client',
          description: 'Client enregistré',
          isActive: true,
        },
      }),

      prisma.role.create({
        data: {
          name: 'Réception',
          slug: 'reception',
          description: "Personnel d'accueil",
          isActive: true,
        },
      }),

      prisma.role.create({
        data: {
          name: 'Manager',
          slug: 'manager',
          description: 'Gestionnaire & Comptable',
          isActive: true,
        },
      }),

      prisma.role.create({
        data: {
          name: 'Administrateur',
          slug: 'admin',
          description: 'Super administrateur',
          isActive: true,
        },
      }),
    ]);

    const [
      roleVisitor,
      roleClient,
      roleReception,
      roleManager,
      roleAdmin,
    ] = roles;

    // ==========================================================
    // 2. PERMISSIONS
    // ==========================================================

    const permissions = await prisma.permission.createMany({
      data: [
        {
          name: 'Consulter propriétés',
          slug: 'read:properties',
          description: 'Voir la liste des biens',
        },
        {
          name: 'Créer réservation',
          slug: 'create:booking',
          description: 'Réserver un bien',
        },
        {
          name: 'Gérer réservations',
          slug: 'manage:bookings',
          description: 'CRUD réservations',
        },
        {
          name: 'Gérer paiements',
          slug: 'manage:payments',
          description: 'Valider/rembourser',
        },
        {
          name: 'Gérer utilisateurs',
          slug: 'manage:users',
          description: 'CRUD utilisateurs',
        },
        {
          name: 'Voir dashboard',
          slug: 'view:dashboard',
          description: 'Statistiques',
        },
        {
          name: 'Gérer tarifs',
          slug: 'manage:pricing',
          description: 'Modifier prix',
        },
        {
          name: 'Réservation manuelle',
          slug: 'create:manual-booking',
          description: 'Créer résa réception',
        },
        {
          name: 'Gérer publications',
          slug: 'manage:publications',
          description: 'Blog/actus',
        },
      ],
    });

    // ==========================================================
    // 3. UTILISATEURS
    // ==========================================================

    const hashedPassword = await bcrypt.hash('Password123!', 12);

    const users = await Promise.all([
      prisma.user.create({
        data: {
          firstName: 'Jean',
          lastName: 'Admin',
          email: 'admin@complexe.ci',
          phone: '+237699999999',
          password: hashedPassword,
          roleId: roleAdmin.id,
          isActive: true,
          emailVerified: true,
          phoneVerified: true,
        },
      }),

      prisma.user.create({
        data: {
          firstName: 'Marie',
          lastName: 'Manager',
          email: 'manager@complexe.ci',
          phone: '+237699999998',
          password: hashedPassword,
          roleId: roleManager.id,
          isActive: true,
          emailVerified: true,
          phoneVerified: true,
        },
      }),

      prisma.user.create({
        data: {
          firstName: 'Aline',
          lastName: 'Nkomo',
          email: 'reception1@complexe.ci',
          phone: '+237677777777',
          password: hashedPassword,
          roleId: roleReception.id,
          isActive: true,
          emailVerified: true,
          phoneVerified: true,
        },
      }),

      prisma.user.create({
        data: {
          firstName: 'Pierre',
          lastName: 'Essomba',
          email: 'reception2@complexe.ci',
          phone: '+237677777778',
          password: hashedPassword,
          roleId: roleReception.id,
          isActive: true,
          emailVerified: true,
          phoneVerified: true,
        },
      }),

      prisma.user.create({
        data: {
          firstName: 'Kouamé',
          lastName: 'Kouassi',
          email: 'kouame.kouassi@email.cm',
          phone: '+237655555555',
          password: hashedPassword,
          roleId: roleClient.id,
          isActive: true,
          emailVerified: true,
          phoneVerified: true,
        },
      }),

      prisma.user.create({
        data: {
          firstName: 'Aïcha',
          lastName: 'Moussa',
          email: 'aicha.moussa@email.cm',
          phone: '+237655555556',
          password: hashedPassword,
          roleId: roleClient.id,
          isActive: true,
          emailVerified: true,
          phoneVerified: true,
        },
      }),

      prisma.user.create({
        data: {
          firstName: 'Paul',
          lastName: 'Biya',
          email: 'paul.biya@email.cm',
          phone: '+237655555557',
          password: hashedPassword,
          roleId: roleClient.id,
          isActive: true,
          emailVerified: false,
          phoneVerified: true,
        },
      }),

      prisma.user.create({
        data: {
          firstName: 'Grace',
          lastName: 'Ngono',
          email: 'grace.ngono@email.cm',
          phone: '+237655555558',
          password: hashedPassword,
          roleId: roleClient.id,
          isActive: true,
          emailVerified: true,
          phoneVerified: false,
        },
      }),
    ]);

    const [
      admin,
      manager,
      reception1,
      reception2,
      client1,
      client2,
      client3,
      client4,
    ] = users;

    // ==========================================================
    // 4. AMENITIES
    // ==========================================================

    const amenities = await Promise.all([
      prisma.amenity.create({
        data: {
          name: 'Wi-Fi Haut Débit',
          slug: 'wifi-haut-debit',
          category: 'common',
          icon: 'wifi',
          description: 'Connexion fibre optique',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Climatisation',
          slug: 'climatisation',
          category: 'common',
          icon: 'wind',
          description: 'Split réversible',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Télévision',
          slug: 'television',
          category: 'room',
          icon: 'tv',
          description: 'Smart TV 43"',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Mini-bar',
          slug: 'mini-bar',
          category: 'room',
          icon: 'wine',
          description: 'Boissons fraîches',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Coffre-fort',
          slug: 'coffre-fort',
          category: 'room',
          icon: 'lock',
          description: 'Sécurité bagages',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Cuisine équipée',
          slug: 'cuisine-equipee',
          category: 'apartment',
          icon: 'chef-hat',
          description: 'Plaques, frigo, micro-ondes',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Machine à laver',
          slug: 'machine-laver',
          category: 'apartment',
          icon: 'droplet',
          description: 'Lave-linge intégré',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Parking',
          slug: 'parking',
          category: 'common',
          icon: 'car',
          description: 'Parking sécurisé 24/7',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Salle de réunion',
          slug: 'salle-reunion',
          category: 'office',
          icon: 'users',
          description: 'Équipement visioconférence',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Imprimante',
          slug: 'imprimante',
          category: 'office',
          icon: 'printer',
          description: 'Multifonction laser',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Générateur',
          slug: 'generateur',
          category: 'common',
          icon: 'zap',
          description: 'Groupe électrogène auto',
          isActive: true,
        },
      }),

      prisma.amenity.create({
        data: {
          name: 'Piscine',
          slug: 'piscine',
          category: 'common',
          icon: 'waves',
          description: 'Piscine extérieure',
          isActive: true,
        },
      }),
    ]);

    // ==========================================================
    // 5. PROPRIÉTÉS
    // ==========================================================

    const properties = await Promise.all([
      prisma.property.create({
        data: {
          name: 'Résidence Le Palmier',
          type: 'room',
          description: 'Complexe hôtelier moderne au cœur de Yaoundé',
          address: 'Bastos, Yaoundé',
          city: 'Yaoundé',
          country: 'Cameroun',
          latitude: 3.848,
          longitude: 11.5021,
          isActive: true,
          category: 'hotel',
          capacity: 50,
          pricePerDay: 35000,
          basePrice: 30000,
        },
      }),

      prisma.property.create({
        data: {
          name: 'Villa Bonapriso',
          type: 'apartment',
          description: 'Appartements meublés haut standing',
          address: 'Bonapriso, Douala',
          city: 'Douala',
          country: 'Cameroun',
          latitude: 4.0511,
          longitude: 9.7679,
          isActive: true,
          category: 'residence',
          capacity: 20,
          pricePerDay: 45000,
          basePrice: 40000,
        },
      }),

      prisma.property.create({
        data: {
          name: 'Business Center Akwa',
          type: 'office',
          description: 'Espaces professionnels premium',
          address: 'Akwa, Douala',
          city: 'Douala',
          country: 'Cameroun',
          latitude: 4.047,
          longitude: 9.69,
          isActive: true,
          category: 'coworking',
          capacity: 100,
          pricePerDay: 15000,
          basePrice: 12000,
        },
      }),
    ]);

    const [propHotel, propApartment, propOffice] = properties;

    // ==========================================================
    // 6. CHAMBRES
    // ==========================================================

    const rooms = await Promise.all([
      prisma.room.create({
        data: {
          propertyId: propHotel.id,
          roomNumber: '101',
          category: 'standard',
          pricePerNight: 25000,
          capacity: 2,
          bedType: 'Lit double',
          sizeSqm: 18,
          floor: 1,
          isActive: true,
        },
      }),

      prisma.room.create({
        data: {
          propertyId: propHotel.id,
          roomNumber: '102',
          category: 'standard',
          pricePerNight: 25000,
          capacity: 2,
          bedType: '2 Lits simples',
          sizeSqm: 18,
          floor: 1,
          isActive: true,
        },
      }),

      prisma.room.create({
        data: {
          propertyId: propHotel.id,
          roomNumber: '201',
          category: 'premium',
          pricePerNight: 40000,
          capacity: 2,
          bedType: 'Lit King Size',
          sizeSqm: 28,
          floor: 2,
          isActive: true,
        },
      }),

      prisma.room.create({
        data: {
          propertyId: propHotel.id,
          roomNumber: '202',
          category: 'premium',
          pricePerNight: 40000,
          capacity: 3,
          bedType: 'Lit King + simple',
          sizeSqm: 30,
          floor: 2,
          isActive: true,
        },
      }),

      prisma.room.create({
        data: {
          propertyId: propHotel.id,
          roomNumber: '301',
          category: 'vip',
          pricePerNight: 75000,
          capacity: 2,
          bedType: 'Lit King Size',
          sizeSqm: 45,
          floor: 3,
          isActive: true,
        },
      }),

      prisma.room.create({
        data: {
          propertyId: propHotel.id,
          roomNumber: '302',
          category: 'vip',
          pricePerNight: 85000,
          capacity: 4,
          bedType: '2 Lits King',
          sizeSqm: 55,
          floor: 3,
          isActive: true,
        },
      }),
    ]);

    // ==========================================================
    // 7. APPARTEMENTS
    // ==========================================================

    const apartments = await Promise.all([
      prisma.apartment.create({
        data: {
          propertyId: propApartment.id,
          name: 'Studio Élégance',
          bedrooms: 0,
          bathrooms: 1,
          sizeSqm: 35,
          maxGuests: 2,
          pricePerNight: 30000,
          pricePerWeek: 180000,
          pricePerMonth: 650000,
          depositAmount: 100000,
          kitchenType: 'Kitchenette',
          isActive: true,
        },
      }),

      prisma.apartment.create({
        data: {
          propertyId: propApartment.id,
          name: 'T2 Confort',
          bedrooms: 1,
          bathrooms: 1,
          sizeSqm: 55,
          maxGuests: 3,
          pricePerNight: 45000,
          pricePerWeek: 270000,
          pricePerMonth: 950000,
          depositAmount: 150000,
          kitchenType: 'Cuisine équipée',
          isActive: true,
        },
      }),

      prisma.apartment.create({
        data: {
          propertyId: propApartment.id,
          name: 'T3 Familial',
          bedrooms: 2,
          bathrooms: 2,
          sizeSqm: 85,
          maxGuests: 5,
          pricePerNight: 65000,
          pricePerWeek: 390000,
          pricePerMonth: 1400000,
          depositAmount: 200000,
          kitchenType: 'Cuisine américaine',
          isActive: true,
        },
      }),
    ]);

    // ==========================================================
    // 8. BUREAUX
    // ==========================================================

    const offices = await Promise.all([
      prisma.office.create({
        data: {
          propertyId: propOffice.id,
          name: 'Bureau Solo',
          sizeSqm: 12,
          maxCapacity: 2,
          rentalType: 'hour',
          pricePerHour: 5000,
          pricePerDay: 35000,
          equipment: 'Wi-Fi, prises USB',
          isActive: true,
        },
      }),

      prisma.office.create({
        data: {
          propertyId: propOffice.id,
          name: 'Salle Équipe',
          sizeSqm: 25,
          maxCapacity: 6,
          rentalType: 'day',
          pricePerDay: 25000,
          pricePerWeek: 120000,
          equipment: 'Vidéoprojecteur, tableau blanc',
          isActive: true,
        },
      }),

      prisma.office.create({
        data: {
          propertyId: propOffice.id,
          name: 'Espace Open Space',
          sizeSqm: 60,
          maxCapacity: 15,
          rentalType: 'month',
          pricePerMonth: 450000,
          equipment: 'Bureaux modulables, café inclus',
          isActive: true,
        },
      }),
    ]);

    // ==========================================================
    // 9. PROPERTY ↔ AMENITY
    // ==========================================================

    await prisma.propertyAmenity.createMany({
      data: [
        { propertyId: propHotel.id, amenityId: amenities[0].id, isFree: true },
        { propertyId: propHotel.id, amenityId: amenities[1].id, isFree: true },
        { propertyId: propHotel.id, amenityId: amenities[2].id, isFree: true },
        { propertyId: propHotel.id, amenityId: amenities[4].id, isFree: true },
        { propertyId: propHotel.id, amenityId: amenities[7].id, isFree: true },
        { propertyId: propHotel.id, amenityId: amenities[10].id, isFree: true },
        {
          propertyId: propHotel.id,
          amenityId: amenities[11].id,
          isFree: false,
          extraCost: 5000,
        },

        { propertyId: propApartment.id, amenityId: amenities[0].id, isFree: true },
        { propertyId: propApartment.id, amenityId: amenities[1].id, isFree: true },
        { propertyId: propApartment.id, amenityId: amenities[5].id, isFree: true },
        { propertyId: propApartment.id, amenityId: amenities[6].id, isFree: true },
        { propertyId: propApartment.id, amenityId: amenities[7].id, isFree: true },

        { propertyId: propOffice.id, amenityId: amenities[0].id, isFree: true },
        { propertyId: propOffice.id, amenityId: amenities[1].id, isFree: true },
        { propertyId: propOffice.id, amenityId: amenities[8].id, isFree: true },
        { propertyId: propOffice.id, amenityId: amenities[9].id, isFree: true },
      ],
    });

    // ==========================================================
    // 10. PRICING RULES
    // ==========================================================
    // IMPORTANT :
    // propertyId doit être un Property.id et non Room/Apartment/Office.id.

    await prisma.pricingRule.createMany({
      data: [
        {
          propertyId: propHotel.id,
          propertyType: 'room',
          durationType: 'night',
          price: 25000,
          isActive: true,
        },
        {
          propertyId: propHotel.id,
          propertyType: 'room',
          durationType: 'night',
          price: 40000,
          isActive: true,
        },
        {
          propertyId: propHotel.id,
          propertyType: 'room',
          durationType: 'night',
          price: 75000,
          isActive: true,
        },
        {
          propertyId: propApartment.id,
          propertyType: 'apartment',
          durationType: 'night',
          price: 30000,
          isActive: true,
        },
        {
          propertyId: propApartment.id,
          propertyType: 'apartment',
          durationType: 'week',
          price: 180000,
          isActive: true,
        },
        {
          propertyId: propApartment.id,
          propertyType: 'apartment',
          durationType: 'month',
          price: 650000,
          isActive: true,
        },
        {
          propertyId: propOffice.id,
          propertyType: 'office',
          durationType: 'hour',
          price: 5000,
          isActive: true,
        },
        {
          propertyId: propOffice.id,
          propertyType: 'office',
          durationType: 'day',
          price: 35000,
          isActive: true,
        },
      ],
    });

    // ==========================================================
    // 11. PROMOTIONS
    // ==========================================================

    await prisma.promotion.createMany({
      data: [
        {
          code: 'BIENVENUE',
          description: '10% de réduction première réservation',
          type: 'percentage',
          value: 10,
          scope: 'global',
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-12-31'),
          maxUses: 100,
          usedCount: 5,
          minBookingAmount: 20000,
          isActive: true,
        },
        {
          code: 'LONGSEJOUR',
          description: '1 nuit offerte pour 7 nuits réservées',
          type: 'free_nights',
          value: 1,
          scope: 'apartment',
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-12-31'),
          maxUses: 50,
          usedCount: 2,
          minBookingAmount: 150000,
          isActive: true,
        },
        {
          code: 'BUSINESS50',
          description: '5000 FCFA offerts bureaux',
          type: 'fixed_amount',
          value: 5000,
          scope: 'office',
          propertyId: propOffice.id,
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-06-30'),
          maxUses: 30,
          usedCount: 0,
          minBookingAmount: 25000,
          isActive: true,
        },
      ],
    });

    // ==========================================================
    // 12. POLITIQUES D'ANNULATION
    // ==========================================================

    await prisma.cancellationPolicy.createMany({
      data: [
        {
          propertyType: 'room',
          hoursBefore: 24,
          refundPercentage: 100,
          description: 'Annulation gratuite 24h avant',
          isActive: true,
        },
        {
          propertyType: 'room',
          hoursBefore: 12,
          refundPercentage: 50,
          description: 'Remboursement 50% entre 12h et 24h',
          isActive: true,
        },
        {
          propertyType: 'apartment',
          hoursBefore: 48,
          refundPercentage: 100,
          description: 'Annulation gratuite 48h avant',
          isActive: true,
        },
        {
          propertyType: 'apartment',
          hoursBefore: 24,
          refundPercentage: 75,
          description: 'Remboursement 75% entre 24h et 48h',
          isActive: true,
        },
        {
          propertyType: 'office',
          hoursBefore: 12,
          refundPercentage: 100,
          description: 'Annulation gratuite 12h avant',
          isActive: true,
        },
      ],
    });

    // ==========================================================
    // 13. MÉTHODES DE PAIEMENT
    // ==========================================================
    // Dans notre schema Prisma :
    // PaymentMethodConfig -> table payment_methods

    const paymentMethods = await Promise.all([
      prisma.paymentMethodConfig.create({
        data: {
          name: 'MTN Mobile Money',
          slug: 'mtn_mobile_money',
          type: 'mobile_money',
          provider: 'mtn',
          isActive: true,
        },
      }),

      prisma.paymentMethodConfig.create({
        data: {
          name: 'Orange Money',
          slug: 'orange_money',
          type: 'mobile_money',
          provider: 'orange',
          isActive: true,
        },
      }),

      prisma.paymentMethodConfig.create({
        data: {
          name: 'Carte Bancaire',
          slug: 'credit_card',
          type: 'card',
          provider: 'stripe',
          isActive: true,
        },
      }),

      prisma.paymentMethodConfig.create({
        data: {
          name: 'Paiement sur place',
          slug: 'cash',
          type: 'cash',
          provider: 'internal',
          isActive: true,
        },
      }),

      prisma.paymentMethodConfig.create({
        data: {
          name: 'PayDunya',
          slug: 'paydunya',
          type: 'aggregator',
          provider: 'paydunya',
          isActive: true,
        },
      }),

      prisma.paymentMethodConfig.create({
        data: {
          name: 'CinetPay',
          slug: 'cinetpay',
          type: 'aggregator',
          provider: 'cinetpay',
          isActive: true,
        },
      }),
    ]);

    // ==========================================================
    // 14. DATES
    // ==========================================================

    const now = new Date();

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    // ==========================================================
    // 15. BOOKINGS
    // ==========================================================

    const bookings = await Promise.all([
      prisma.booking.create({
        data: {
          reference: 'RES-2026-000101',
          propertyId: rooms[0].id,
          propertyType: 'room',
          userId: client1.id,
          guestName: 'Kouamé Kouassi',
          guestEmail: client1.email,
          guestPhone: client1.phone,
          startDate: lastWeek,
          endDate: yesterday,
          numberOfGuests: 2,
          status: 'checked_out',
          totalAmount: 50000,
          depositAmount: 0,
          paidAmount: 50000,
          specialRequests: 'Chambre calme svp',
          checkedInAt: lastWeek,
          checkedOutAt: yesterday,
          createdBy: reception1.id,
        },
      }),

      prisma.booking.create({
        data: {
          reference: 'RES-2026-000102',
          propertyId: rooms[2].id,
          propertyType: 'room',
          userId: client2.id,
          guestName: 'Aïcha Moussa',
          guestEmail: client2.email,
          guestPhone: client2.phone,
          startDate: yesterday,
          endDate: nextWeek,
          numberOfGuests: 2,
          status: 'checked_in',
          totalAmount: 280000,
          depositAmount: 0,
          paidAmount: 280000,
          checkedInAt: yesterday,
          createdBy: reception1.id,
        },
      }),

      prisma.booking.create({
        data: {
          reference: 'RES-2026-000103',
          propertyId: apartments[1].id,
          propertyType: 'apartment',
          userId: client3.id,
          guestName: 'Paul Biya',
          guestEmail: client3.email,
          guestPhone: client3.phone,
          startDate: nextWeek,
          endDate: new Date(
            nextWeek.getTime() + 3 * 86400000,
          ),
          numberOfGuests: 3,
          status: 'confirmed',
          totalAmount: 135000,
          depositAmount: 150000,
          paidAmount: 135000,
          createdBy: reception2.id,
        },
      }),

      prisma.booking.create({
        data: {
          reference: 'RES-2026-000104',
          propertyId: rooms[1].id,
          propertyType: 'room',
          userId: client4.id,
          guestName: 'Grace Ngono',
          guestEmail: client4.email,
          guestPhone: client4.phone,
          startDate: tomorrow,
          endDate: new Date(
            tomorrow.getTime() + 2 * 86400000,
          ),
          numberOfGuests: 2,
          status: 'cancelled',
          totalAmount: 50000,
          depositAmount: 0,
          paidAmount: 0,
          cancellationReason: 'Changement de programme',
          cancelledAt: now,
          createdBy: reception1.id,
        },
      }),

      prisma.booking.create({
        data: {
          reference: 'RES-2026-000105',
          propertyId: offices[1].id,
          propertyType: 'office',
          userId: client1.id,
          guestName: 'Kouamé Kouassi',
          guestEmail: client1.email,
          guestPhone: client1.phone,
          startDate: tomorrow,
          endDate: tomorrow,
          numberOfGuests: 4,
          status: 'confirmed',
          totalAmount: 25000,
          depositAmount: 0,
          paidAmount: 25000,
          createdBy: reception2.id,
        },
      }),
    ]);

    const [
      booking1,
      booking2,
      booking3,
      booking4,
      booking5,
    ] = bookings;

    // ==========================================================
    // 16. PAYMENTS
    // ==========================================================

    const payments = await Promise.all([
      prisma.payment.create({
        data: {
          bookingId: booking1.id,
          transactionId: 'TXN-MOMO-001',
          reference: 'PAY-2026-001',
          amount: 50000,
          method: 'mtn_mobile_money',
          type: 'full',
          status: 'completed',
          phoneNumber: '655555555',
          paidAt: lastWeek,
        },
      }),

      prisma.payment.create({
        data: {
          bookingId: booking2.id,
          transactionId: 'TXN-OM-002',
          reference: 'PAY-2026-002',
          amount: 280000,
          method: 'orange_money',
          type: 'full',
          status: 'completed',
          phoneNumber: '655555556',
          paidAt: yesterday,
        },
      }),

      prisma.payment.create({
        data: {
          bookingId: booking3.id,
          transactionId: 'TXN-CARD-003',
          reference: 'PAY-2026-003',
          amount: 135000,
          method: 'credit_card',
          type: 'full',
          status: 'completed',
          paidAt: now,
        },
      }),

      prisma.payment.create({
        data: {
          bookingId: booking5.id,
          transactionId: 'TXN-CASH-004',
          reference: 'PAY-2026-004',
          amount: 25000,
          method: 'cash',
          type: 'full',
          status: 'completed',
          paidAt: now,
        },
      }),
    ]);

    // ==========================================================
    // 17. PAYMENT TRANSACTIONS
    // ==========================================================

    await Promise.all([
      prisma.paymentTransaction.create({
        data: {
          paymentId: payments[0].id,
          aggregator: 'mtn',
          externalTransactionId: 'MOMO-EXT-001',
          status: 'success',
          requestPayload: JSON.stringify({
            amount: 50000,
            phone: '655555555',
          }),
          responsePayload: JSON.stringify({
            status: 'SUCCESS',
            transactionId: 'MOMO-EXT-001',
          }),
          processedAt: lastWeek,
        },
      }),

      prisma.paymentTransaction.create({
        data: {
          paymentId: payments[1].id,
          aggregator: 'orange',
          externalTransactionId: 'OM-EXT-002',
          status: 'success',
          requestPayload: JSON.stringify({
            amount: 280000,
            phone: '655555556',
          }),
          responsePayload: JSON.stringify({
            status: 'SUCCESS',
            transactionId: 'OM-EXT-002',
          }),
          processedAt: yesterday,
        },
      }),
    ]);

    // ==========================================================
    // 18. DEPOSITS
    // ==========================================================

    await prisma.deposit.create({
      data: {
        bookingId: booking3.id,
        amount: 150000,
        status: 'held',
      },
    });

    // ==========================================================
    // 19. INVOICES
    // ==========================================================

    await prisma.invoice.createMany({
      data: [
        {
          bookingId: booking1.id,
          invoiceNumber: 'FAC-2026-001',
          amount: 50000,
          taxAmount: 0,
          totalAmount: 50000,
          status: 'paid',
          issuedAt: lastWeek,
          paidAt: lastWeek,
        },
        {
          bookingId: booking2.id,
          invoiceNumber: 'FAC-2026-002',
          amount: 280000,
          taxAmount: 0,
          totalAmount: 280000,
          status: 'paid',
          issuedAt: yesterday,
          paidAt: yesterday,
        },
        {
          bookingId: booking3.id,
          invoiceNumber: 'FAC-2026-003',
          amount: 135000,
          taxAmount: 0,
          totalAmount: 135000,
          status: 'issued',
          issuedAt: now,
        },
      ],
    });

    // ==========================================================
    // 20. CALENDAR BLOCKS
    // ==========================================================
    // propertyId doit correspondre à Property.id dans le schema actuel.

    await prisma.calendarBlock.createMany({
      data: [
        {
          propertyId: propHotel.id,
          startDate: new Date('2026-09-10'),
          endDate: new Date('2026-09-15'),
          reason: 'Rénovation salle de bain',
          type: 'maintenance',
          createdBy: admin.id,
        },
        {
          propertyId: propApartment.id,
          startDate: new Date('2026-09-20'),
          endDate: new Date('2026-09-25'),
          reason: 'Réservation privée famille direction',
          type: 'private',
          createdBy: manager.id,
        },
      ],
    });

    // ==========================================================
    // 21. MEDIA
    // ==========================================================

    await prisma.media.createMany({
      data: [
        {
          propertyId: propHotel.id,
          url: 'https://cdn.votredomaine.com/hotel/piscine.jpg',
          type: 'image',
          title: 'Piscine',
          order: 1,
          isPrimary: true,
        },
        {
          propertyId: propHotel.id,
          url: 'https://cdn.votredomaine.com/hotel/chambre-101.jpg',
          type: 'image',
          title: 'Chambre Standard',
          order: 2,
          isPrimary: false,
        },
        {
          propertyId: propApartment.id,
          url: 'https://cdn.votredomaine.com/appt/salon.jpg',
          type: 'image',
          title: 'Salon T2',
          order: 1,
          isPrimary: true,
        },
        {
          propertyId: propOffice.id,
          url: 'https://cdn.votredomaine.com/bureau/open-space.jpg',
          type: 'image',
          title: 'Open Space',
          order: 1,
          isPrimary: true,
        },
      ],
    });

    // ==========================================================
    // 22. IDENTITY DOCUMENTS
    // ==========================================================

    await prisma.identityDocument.createMany({
      data: [
        {
          userId: client1.id,
          type: 'id_card',
          documentNumber: 'ID-123456789',
          fileUrl:
            'https://cdn.votredomaine.com/docs/id-kouame.jpg',
          verified: true,
          uploadedAt: now,
        },
        {
          bookingId: booking3.id,
          type: 'passport',
          documentNumber: 'PA-987654321',
          fileUrl:
            'https://cdn.votredomaine.com/docs/passport-paul.jpg',
          verified: false,
          uploadedAt: now,
        },
      ],
    });

    // ==========================================================
    // 23. CONTRACTS
    // ==========================================================

    await prisma.contract.create({
      data: {
        propertyId: offices[2].id,
        tenantId: client1.id,
        type: 'long_term',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        monthlyRent: 450000,
        depositAmount: 900000,
        terms: 'Bail commercial 12 mois renouvelable',
        clauses: 'Résiliation 3 mois de préavis',
        status: 'active',
        signedAt: new Date('2026-01-01'),
        pdfUrl:
          'https://cdn.votredomaine.com/contracts/bail-001.pdf',
      },
    });

    // ==========================================================
    // 24. MANUAL BOOKING REQUESTS
    // ==========================================================

    await prisma.manualBookingRequest.createMany({
      data: [
        {
          propertyId: rooms[3].id,
          guestName: 'Kouamé Kouassi',
          guestEmail: client1.email,
          guestPhone: client1.phone,
          startDate: new Date('2026-09-10'),
          endDate: new Date('2026-09-12'),
          numberOfGuests: 3,
          totalAmount: 80000,
          depositAmount: 0,
          notes:
            'Paiement MoMo reçu via WhatsApp (capture vérifiée)',
          status: 'approved',
          createdBy: reception1.id,
          processedBy: reception1.id,
          processedAt: now,
          confirmationId: 'MAN-2026-001245',
          userId: client1.id,
        },
        {
          propertyId: apartments[0].id,
          guestName: 'Aïcha Moussa',
          guestEmail: client2.email,
          guestPhone: client2.phone,
          startDate: new Date('2026-09-15'),
          endDate: new Date('2026-09-20'),
          numberOfGuests: 2,
          totalAmount: 150000,
          depositAmount: 100000,
          notes:
            'Client a contacté via bouton WhatsApp',
          status: 'pending',
          createdBy: reception2.id,
        },
      ],
    });

    // ==========================================================
    // 25. NOTIFICATIONS
    // ==========================================================

    await prisma.notification.createMany({
      data: [
        {
          userId: client1.id,
          bookingId: booking1.id,
          type: 'email',
          channel: 'sendgrid',
          subject: 'Confirmation de réservation',
          content:
            'Votre réservation RES-2026-000101 est confirmée.',
          status: 'sent',
          sentAt: lastWeek,
        },
        {
          userId: client2.id,
          bookingId: booking2.id,
          type: 'whatsapp',
          channel: 'twilio',
          content:
            'Bonjour Aïcha, votre check-in est confirmé. Bienvenue !',
          status: 'sent',
          sentAt: yesterday,
        },
        {
          userId: client3.id,
          bookingId: booking3.id,
          type: 'sms',
          channel: 'africastalking',
          content:
            'Votre réservation appartement T2 est confirmée. ID: RES-2026-000103',
          status: 'sent',
          sentAt: now,
        },
      ],
    });

    // ==========================================================
    // 26. AUDIT LOGS
    // ==========================================================

    await prisma.auditLog.createMany({
      data: [
        {
          userId: admin.id,
          action: 'CREATE',
          entity: 'Property',
          entityId: propHotel.id,
          newValue: JSON.stringify({
            name: 'Résidence Le Palmier',
          }),
          ipAddress: '192.168.1.10',
          userAgent: 'Mozilla/5.0',
        },
        {
          userId: reception1.id,
          action: 'UPDATE',
          entity: 'Booking',
          entityId: booking1.id,
          oldValue: JSON.stringify({
            status: 'pending',
          }),
          newValue: JSON.stringify({
            status: 'checked_in',
          }),
          ipAddress: '192.168.1.15',
          userAgent: 'Mozilla/5.0',
        },
        {
          userId: manager.id,
          action: 'UPDATE',
          entity: 'PricingRule',
          entityId: propHotel.id,
          oldValue: JSON.stringify({
            price: 30000,
          }),
          newValue: JSON.stringify({
            price: 25000,
          }),
          ipAddress: '192.168.1.20',
          userAgent: 'Mozilla/5.0',
        },
      ],
    });

    // ==========================================================
    // 27. PUBLICATIONS
    // ==========================================================

    await prisma.publication.createMany({
      data: [
        {
          title: 'Inauguration de notre nouvelle piscine',
          slug: 'inauguration-piscine-2026',
          content:
            "Nous sommes fiers d'inaugurer notre nouvelle piscine extérieure...",
          excerpt: 'Découvrez notre nouvel espace détente.',
          featuredImage:
            'https://cdn.votredomaine.com/blog/piscine.jpg',
          status: 'published',
          category: 'Actualités',
          tags: ['inauguration', 'piscine', 'loisirs'],
          authorId: admin.id,
          publishedAt: new Date('2026-08-01'),
        },
        {
          title: 'Guide : Les meilleurs restaurants de Yaoundé',
          slug: 'guide-restaurants-yaounde',
          content:
            'Voici notre sélection des meilleures tables...',
          excerpt:
            'Où manger à Yaoundé pendant votre séjour ?',
          featuredImage:
            'https://cdn.votredomaine.com/blog/restaurants.jpg',
          status: 'published',
          category: 'Guide',
          tags: ['restaurants', 'yaoundé', 'gastronomie'],
          authorId: manager.id,
          publishedAt: new Date('2026-08-15'),
        },
        {
          title: 'Offre spéciale Coworking Septembre',
          slug: 'offre-coworking-septembre-2026',
          content:
            'Profitez de -20% sur tous nos bureaux en septembre...',
          excerpt:
            'Promotion limitée pour les entrepreneurs.',
          status: 'draft',
          category: 'Promotion',
          tags: ['coworking', 'promo', 'bureaux'],
          authorId: manager.id,
        },
      ],
    });

    // ==========================================================
    // 28. USER SEARCH HISTORY
    // ==========================================================

    await prisma.userSearchHistory.createMany({
      data: [
        {
          userId: client1.id,
          searchParams: JSON.stringify({
            city: 'Yaoundé',
            type: 'room',
            guests: 2,
            dates: '2026-09-10/2026-09-15',
          }),
          resultsCount: 6,
        },
        {
          userId: client2.id,
          searchParams: JSON.stringify({
            city: 'Douala',
            type: 'apartment',
            guests: 3,
            dates: '2026-10-01/2026-10-07',
          }),
          resultsCount: 3,
        },
        {
          searchParams: JSON.stringify({
            city: 'Douala',
            type: 'office',
            guests: 10,
          }),
          resultsCount: 2,
        },
      ],
    });

    // ==========================================================
    // 29. WHATSAPP SESSIONS
    // ==========================================================

    await prisma.whatsappSession.createMany({
      data: [
        {
          sessionId: 'WA-SESS-001',
          phoneNumber: '+237677777777',
          status: 'active',
          lastActivityAt: now,
        },
        {
          sessionId: 'WA-SESS-002',
          phoneNumber: '+237677777778',
          status: 'active',
          lastActivityAt: now,
        },
      ],
    });

    // ==========================================================
    // FIN
    // ==========================================================

    logger.info('✅ Seed Prisma terminé avec succès !');

    logger.info(`   • ${roles.length} rôles`);
    logger.info(`   • ${permissions.count} permissions`);
    logger.info(`   • ${users.length} utilisateurs`);
    logger.info(`   • ${amenities.length} équipements`);
    logger.info(`   • ${properties.length} propriétés`);
    logger.info(`   • ${rooms.length} chambres`);
    logger.info(`   • ${apartments.length} appartements`);
    logger.info(`   • ${offices.length} bureaux`);
    logger.info(`   • ${bookings.length} réservations`);
    logger.info(`   • ${payments.length} paiements`);
    logger.info(`   • ${paymentMethods.length} méthodes de paiement`);

  } catch (error) {
    logger.error('❌ Seed Prisma échoué:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

seed();
