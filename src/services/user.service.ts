import { userRepository } from '../repositories/user.repository';
import { ListUsersOptions, ListUsersResult } from '../repositories/user.repository';
export const userService = {
  async findById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error('Utilisateur non trouve');
    }

    const { password, ...rest } = user;

    return rest;
  },
  async listUsers(options?: ListUsersOptions): Promise<ListUsersResult> {
    return userRepository.list(options);
  },


  // Mise a jour "admin" : champs sensibles autorises (roleId, isActive, ...).
  // A reserver aux routes protegees par un controle de role.
  async update(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      nationalite?: string;
      adresse?: string;
      roleId?: string;
      isActive?: boolean;
      emailVerified?: boolean;
      phoneVerified?: boolean;
    },
  ) {
    if (data.email) {
      const existingEmail = await userRepository.findByEmail(data.email);
      if (existingEmail && existingEmail.id !== id) {
        throw new Error('Cet email est deja utilise par un autre compte');
      }
    }

    if (data.phone) {
      const existingPhone = await userRepository.findByPhone(data.phone);
      if (existingPhone && existingPhone.id !== id) {
        throw new Error('Ce numero de telephone est deja utilise par un autre compte');
      }
    }

    const user = await userRepository.update(id, data);

    if (!user) {
      throw new Error('Utilisateur non trouve');
    }

    const { password, ...rest } = user;

    return rest;
  },

  // Mise a jour "self-service" du profil : uniquement les champs non
  // sensibles. Le mot de passe passe exclusivement par authService.changePassword.
  async updateProfile(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      nationalite?: string;
      adresse?: string;
    },
  ) {
    const existingUser = await userRepository.findById(id);

    if (!existingUser) {
      throw new Error('Utilisateur non trouve');
    }

    if (data.email && data.email !== existingUser.email) {
      const emailTaken = await userRepository.findByEmail(data.email);
      if (emailTaken && emailTaken.id !== id) {
        throw new Error('Cet email est deja utilise par un autre compte');
      }
    }

    if (data.phone && data.phone !== existingUser.phone) {
      const phoneTaken = await userRepository.findByPhone(data.phone);
      if (phoneTaken && phoneTaken.id !== id) {
        throw new Error('Ce numero de telephone est deja utilise par un autre compte');
      }
    }

    // Si l'email ou le telephone changent, on pourrait ici remettre
    // emailVerified / phoneVerified a false et redeclencher une verification.
    const updated = await userRepository.update(id, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      nationalite: data.nationalite,
      adresse: data.adresse,
    });

    if (!updated) {
      throw new Error('Utilisateur non trouve');
    }

    const { password, ...rest } = updated;

    return rest;
  },

  async list(options?: {
    page?: number;
    limit?: number;
    roleId?: string;
    isActive?: boolean;
    search?: string;
  }) {
    const result = await userRepository.list(options);

    return {
      ...result,
      data: result.data.map(({ password, ...rest }) => rest),
    };
  },
};