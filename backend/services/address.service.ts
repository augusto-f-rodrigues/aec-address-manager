import Address from '../models/Address';

export async function getAllAddressesByUserId(userId: string) {
  try {
    const addresses = await Address.findAll({ where: { userId } });
    return addresses;
  } catch (error) {
    console.error('Error fetching addresses by user id:', error);
    throw error;
  }
}


