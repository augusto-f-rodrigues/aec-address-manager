'use client';
import {
  getAllAddressesByUserId,
  deleteAddress,
} from '@/services/address.service';
import { exportAddressesToCSV } from '@/utils/csv-export.util';
import { decryptData } from '@/utils/jwt.util';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AddressList = () => {
  const [addresses, setAddresses] = useState<AddressI[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decryptedData: any = decryptData(token);
        const userId = decryptedData.id;

        const fetchAddresses = async () => {
          try {
            const data = await getAllAddressesByUserId(userId);
            setAddresses(data);
          } catch (error) {
            console.error('Error fetching addresses:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchAddresses();
      } catch (error) {
        console.error('Failed to decrypt token:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const handleExportCSV = () => {
    exportAddressesToCSV(addresses);
  };

  const handleAddAddress = () => {
    router.push('/address/add');
  };

  const handleEditAddress = (id: string) => {
    router.push(`/address/edit/${id}`);
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress(id);
      setAddresses(addresses.filter((address) => address.id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="main-container">
      <h1 className="text-h1 mb-4">Meus Endereços</h1>
      <div className="mb-4 flex w-full justify-center gap-4">
        <Button
          className="mb-4 w-full bg-green-600 px-8 py-1 normal-case hover:bg-green-500 md:mb-0 md:max-w-52"
          variant="contained"
          onClick={handleExportCSV}
        >
          <span>Exportar CSV</span>
        </Button>
        <Link className="w-full md:max-w-52" href="/address/add">
          <Button
            className="mb-4 w-full bg-blue-600 px-8 py-1 normal-case hover:bg-blue-500 md:mb-0 md:max-w-52"
            variant="contained"
            onClick={handleAddAddress}
          >
            <span>Cadastrar Endereço</span>
          </Button>
        </Link>
      </div>
      {addresses.length === 0 ? (
        <Typography className="text-center" variant="h6" component="div">
          Nenhum endereço registrado
        </Typography>
      ) : (
        <Grid container spacing={3} maxWidth={1440}>
          {addresses.map((address: AddressI) => (
            <Grid item xs={12} sm={6} md={6} key={address.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {address.address}, {address.number}
                  </Typography>
                  <Typography color="textSecondary">
                    {address.neighborhood}, {address.city} {address.zipCode}{' '}
                    {address.state}
                  </Typography>
                  {address?.complement && (
                    <Typography variant="body2">
                      Complemento: {address.complement}
                    </Typography>
                  )}
                  <div className="mt-2 flex justify-end">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditAddress(address.id!)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => handleDeleteAddress(address.id!)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </main>
  );
};

export default AddressList;
