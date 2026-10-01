import { Media } from '../models/media.model';

export const mediaRepository = {
  async listByProperty(propertyId: string) {
    return Media.findAll({
      where: { propertyId },
      order: [['order', 'ASC']],
    });
  },

  async create(data: any) {
    return Media.create(data);
  },

  async findById(id: string) {
    return Media.findByPk(id);
  },

  async delete(id: string) {
    const deleted = await Media.destroy({ where: { id } });
    return deleted > 0;
  },
};