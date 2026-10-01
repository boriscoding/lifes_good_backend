import * as officeRepository from '../repositories/office.repository';

export const getFormattedActiveOffices = async () => {
  const offices = await officeRepository.findActiveOffices();

  return offices.map((office) => {
    const referencePrice = office.pricePerDay ?? office.pricePerHour ?? 0;

    return {
      id: office.id,
      title: office.name,
      capacity: `${office.maxCapacity} postes`,
      surface: `${Number(office.sizeSqm)} m²`,
      hourlyRate: office.pricePerHour ? `${Number(office.pricePerHour).toLocaleString('fr-FR')} FCFA` : 'N/A',
      dailyRate: office.pricePerDay ? `${Number(office.pricePerDay).toLocaleString('fr-FR')} FCFA` : 'N/A',
      priceNumber: Number(referencePrice),
      price: `${Number(referencePrice).toLocaleString('fr-FR')} FCFA`,
      image: office.property.media[0]?.url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    };
  });
};

export const getFormattedOfficeById = async (id: string) => {
  const office = await officeRepository.findOfficeById(id);
  if (!office) return null;

  const referencePrice = office.pricePerDay ?? office.pricePerHour ?? 0;
  const images = office.property.media.map((m) => m.url);

  return {
    id: office.id,
    title: office.name,
    category: 'Bureau',
    capacity: `${office.maxCapacity} postes`,
    superficie: `${Number(office.sizeSqm)} m²`,
    hourlyRate: office.pricePerHour ? `${Number(office.pricePerHour).toLocaleString('fr-FR')} FCFA` : 'N/A',
    dailyRate: office.pricePerDay ? `${Number(office.pricePerDay).toLocaleString('fr-FR')} FCFA` : 'N/A',
    priceNumber: Number(referencePrice),
    price: `${Number(referencePrice).toLocaleString('fr-FR')} FCFA`,
    rating: '4.8',
    description: office.property.description || undefined,
    images: images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'],
  };
};