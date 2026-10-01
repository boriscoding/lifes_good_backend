import * as roomRepository from '../repositories/room.repository';

export const getFormattedActiveRooms = async () => {
  const rooms = await roomRepository.findActiveRooms();

  return rooms.map((room) => ({
    id: room.id,
    title: `${room.property.name} - Ch. ${room.roomNumber}`,
    category: room.category.toUpperCase(),
    priceNumber: Number(room.pricePerNight),
    price: `${Number(room.pricePerNight).toLocaleString('fr-FR')} FCFA / nuit`,
    capacity: `${room.capacity} pers.`,
    image: room.property.media[0]?.url || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  }));
};

export const getFormattedRoomById = async (id: string) => {
  const room = await roomRepository.findRoomById(id);
  if (!room) return null;

  const images = room.property.media.map((m) => m.url);

  return {
    id: room.id,
    title: `${room.property.name} - Ch. ${room.roomNumber}`,
    category: room.category.toUpperCase(),
    priceNumber: Number(room.pricePerNight),
    price: `${Number(room.pricePerNight).toLocaleString('fr-FR')} FCFA / nuit`,
    capacity: `${room.capacity} pers.`,
    rating: '4.8',
    description: room.property.description || undefined,
    images: images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
  };
};  