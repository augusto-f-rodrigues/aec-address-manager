interface AddressI {
  id?: string;
  userId: string;
  cep: string;
  address: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: string;
  number: number;
  createdAt?: Date;
  updatedAt?: Date;
}