interface AddressI {
  id?: string;
  userId: string;
  zipCode: string;
  // cep: string;
  address: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  // uf: string;
  number: number;
  createdAt?: Date;
  updatedAt?: Date;
}