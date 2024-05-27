'use client';
import { getAllAddressesByUserId } from '@/services/address.service';
import { decryptData } from '@/services/jwt.service';
import { Card, CardContent, Grid, Typography } from '@mui/material';
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

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="main-container">
      <h1 className="text-h1 mb-4">Meus Endereços</h1>
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
