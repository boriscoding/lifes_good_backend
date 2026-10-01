import * as apartmentRepository from '../repositories/apartment.repository';

export const getFormattedActiveApartments = async () => {
  const apartments = await apartmentRepository.findActiveApartments();

  return apartments.map((appart) => ({
    id: appart.id,
    title: appart.name,
    pieces: `${appart.bedrooms} pièces`,
    superficie: `${Number(appart.sizeSqm)} m²`,
    priceNumber: Number(appart.pricePerNight),
    price: `${Number(appart.pricePerNight).toLocaleString('fr-FR')} FCFA / nuit`,
    rating: "4.8",
    image: appart.property.media[0]?.url || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  }));
};

export const getFormattedApartmentById = async (id: string) => {
  const appart = await apartmentRepository.findApartmentById(id);
  if (!appart) return null;

  const images = appart.property.media.map((m) => m.url);

  return {
    id: appart.id,
    title: appart.name,
    category: `${appart.bedrooms} pièces`,
    pieces: `${appart.bedrooms} pièces`,
    superficie: `${Number(appart.sizeSqm)} m²`,
    capacity: `${appart.maxGuests} pers.`,
    priceNumber: Number(appart.pricePerNight),
    price: `${Number(appart.pricePerNight).toLocaleString('fr-FR')} FCFA / nuit`,
    rating: "4.8",
    description: appart.property.description || undefined,
    images: images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'],
  };
};