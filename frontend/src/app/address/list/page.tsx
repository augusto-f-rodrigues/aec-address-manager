'use client';
import { getAllAddressesByUserId } from '@/services/address.service';
import { exportAddressesToCSV } from '@/utils/csv-export.util';
import { decryptData } from '@/utils/jwt.util';
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
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
        <Button
          className="mb-4 w-full bg-blue-600 px-8 py-1 normal-case hover:bg-blue-500 md:mb-0 md:max-w-52"
          variant="contained"
          onClick={handleAddAddress}
        >
          <span>Cadastrar Endereço</span>
        </Button>
      </div>
      {addresses.length === 0 ? (
        <Typography variant="h6" component="div">
          Nenhum endereço registrado
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {addresses.map((address: any) => (
            <Grid item xs={12} sm={6} md={4} key={address.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {address.street}
                  </Typography>
                  <Typography color="textSecondary">
                    {address.city}, {address.state} {address.zipCode}
                  </Typography>
                  <Typography variant="body2">{address.country}</Typography>
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
