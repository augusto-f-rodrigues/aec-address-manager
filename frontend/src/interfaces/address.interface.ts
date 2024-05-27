interface AddressI {
  id?: string;
  userId: string;
  zipCode: string;
  address: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  number: number;
  createdAt?: Date;
  updatedAt?: Date;
}