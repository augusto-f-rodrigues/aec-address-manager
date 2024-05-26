'use client';
import { createUser } from '@/services/api';
import { FormControl, TextField, Button, FormHelperText, Snackbar } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import CustomAlert from '@/components/CustomAlert';

export default function Register() {
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: false,
    username: false,
    password: false,
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [openAlert, setOpenAlert] = useState(false);

  const handleRegister = async (event: any) => {
    event.preventDefault();
    const newErrors = { name: false, username: false, password: false };

    if (!name) {
      newErrors.name = true;
    }

    if (!username) {
      newErrors.username = true;
    }

    if (!password) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.username && !newErrors.password) {
      try {
        await createUser({ name: name!, username: username!, password: password! });
        setAlertMessage('Usuário registrado com sucesso!');
        setAlertSeverity('success');
        setOpenAlert(true);
      } catch (error: any) {
        console.log(error)
        setAlertMessage(error.response.data.message || 'Erro ao criar usuário');
        setAlertSeverity('error');
        setOpenAlert(true);
      }
    }
  };

  return (
    <main className="main-container">
      <h1 className="text-h1 mb-4">Cadastro</h1>
      <form
        className="flex w-full min-w-80 max-w-[500px] flex-col items-center justify-center rounded-lg border border-gray-500 border-opacity-20 bg-white p-10"
        onSubmit={handleRegister}
        noValidate
      >
        <FormControl fullWidth className="mb-4" error={errors.name}>
          <TextField
            id="name"
            label="Nome"
            error={errors.name}
            variant="outlined"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <FormHelperText>Esse campo é obrigatório</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth className="mb-4" error={errors.username}>
          <TextField
            id="username"
            label="Nome de usuário"
            error={errors.username}
            variant="outlined"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <FormHelperText>Esse campo é obrigatório</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth className="mb-4" error={errors.password}>
          <TextField
            id="password"
            label="Senha"
            error={errors.password}
            type="password"
            variant="outlined"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <FormHelperText>Esse campo é obrigatório</FormHelperText>
          )}
        </FormControl>

        <div className="flex w-full flex-col items-center md:flex-row md:gap-4">
          <Link className="w-full md:max-w-52" href="/">
            <Button
              className="w-full bg-blue-600 px-8 py-1 normal-case hover:bg-blue-500"
              variant="contained"
            >
              <span>Voltar</span>
            </Button>
          </Link>

          <Button
            className="mb-4 w-full bg-green-600 px-8 py-1 normal-case hover:bg-green-500 md:mb-0 md:max-w-52"
            variant="contained"
            type="submit"
          >
            <span>Registrar</span>
          </Button>
        </div>
      </form>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
        <CustomAlert severity={alertSeverity} message={alertMessage!} />
      </Snackbar>
    </main>
  );
}
