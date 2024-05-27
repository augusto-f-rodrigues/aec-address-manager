'use client';

import {
  FormControl,
  TextField,
  Button,
  FormHelperText,
  Snackbar,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAddressById, updateAddress } from '@/services/address.service';
import CustomAlert from '@/components/CustomAlert';
import Link from 'next/link';
import { fetchAddressData } from '@/services/via-cep.service';

const AddressEdit = () => {
  const [address, setAddress] = useState<AddressI>({
    userId: '',
    zipCode: '',
    address: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    number: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AddressI, string>>>(
    {},
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('info');
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await getAddressById(id as string);
        setAddress(data);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (address) {
      setAddress({ ...address, [name]: value });
    }

  if (name === 'zipCode' && value.length === 8) {
      handleZipCodeChange(value);
    }
  };

  const handleZipCodeChange = async (zipCode: string) => {
    const data = await fetchAddressData(zipCode);

    if (data) {
      setAddress((prevAddress) => ({
        ...prevAddress,
        address: data.logradouro,
        complement: data.complemento,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        zipCode: undefined,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        zipCode: 'CEP não encontrado',
      }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof AddressI, string>> = {};
    if (!address?.zipCode) newErrors.zipCode = 'Esse campo é obrigatório';
    if (!address?.address) newErrors.address = 'Esse campo é obrigatório';
    if (!address?.neighborhood)
      newErrors.neighborhood = 'Esse campo é obrigatório';
    if (!address?.city) newErrors.city = 'Esse campo é obrigatório';
    if (!address?.state) newErrors.state = 'Esse campo é obrigatório';
    if (!address?.number) newErrors.number = 'Esse campo é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validate() && address) {
      try {
        await updateAddress(id as string, address);
        setAlertMessage('Endereço atualizado com sucesso!');
        setAlertSeverity('success');
        setOpenAlert(true);
        router.push('/address/list');
      } catch (error: any) {
        console.error('Error updating address:', error);
        setAlertMessage('Erro ao atualizar endereço');
        setAlertSeverity('error');
        setOpenAlert(true);
      }
    }
  };

  if (!address) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="main-container">
      <h1 className="text-h1 mb-4">Editar Endereço</h1>
      <form
        className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 rounded-lg border border-gray-500 border-opacity-20 bg-white p-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormControl fullWidth className="mb-4" error={!!errors.zipCode}>
          <TextField
            id="zipCode"
            name="zipCode"
            label="CEP"
            inputProps={{ maxLength: 8 }}
            value={address.zipCode}
            onChange={handleChange}
            required
          />
          {errors.zipCode && <FormHelperText>{errors.zipCode}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth className="mb-4" error={!!errors.address}>
          <TextField
            id="address"
            name="address"
            label="Endereço"
            value={address.address}
            onChange={handleChange}
            required
          />
          {errors.address && <FormHelperText>{errors.address}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth className="mb-4" error={!!errors.number}>
          <TextField
            id="number"
            name="number"
            label="Número"
            type="number"
            value={address.number}
            onChange={handleChange}
            required
          />
          {errors.number && <FormHelperText>{errors.number}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth className="mb-4" error={!!errors.complement}>
          <TextField
            id="complement"
            name="complement"
            label="Complemento"
            value={address.complement}
            onChange={handleChange}
          />
          {errors.complement && (
            <FormHelperText>{errors.complement}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth className="mb-4" error={!!errors.neighborhood}>
          <TextField
            id="neighborhood"
            name="neighborhood"
            label="Bairro"
            value={address.neighborhood}
            onChange={handleChange}
            required
          />
          {errors.neighborhood && (
            <FormHelperText>{errors.neighborhood}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth className="mb-4" error={!!errors.city}>
          <TextField
            id="city"
            name="city"
            label="Cidade"
            value={address.city}
            onChange={handleChange}
            required
          />
          {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth className="mb-4" error={!!errors.state}>
          <TextField
            id="state"
            name="state"
            label="Estado"
            value={address.state}
            onChange={handleChange}
            required
          />
          {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
        </FormControl>

        <div className="flex w-full flex-col items-center gap-4 md:flex-row">
          <Link className="w-full" href="/address/list">
            <Button
              className="w-full bg-blue-600 px-8 py-2 normal-case hover:bg-blue-500"
              variant="contained"
            >
              <span>Voltar</span>
            </Button>
          </Link>
          <Button
            className="w-full bg-green-600 px-8 py-2 normal-case hover:bg-green-500"
            variant="contained"
            type="submit"
          >
            <span>Salvar</span>
          </Button>
        </div>
      </form>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
      >
        <CustomAlert severity={alertSeverity} message={alertMessage!} />
      </Snackbar>
    </main>
  );
};

export default AddressEdit;
