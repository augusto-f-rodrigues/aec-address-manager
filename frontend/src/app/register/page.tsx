'use client';
import { FormControl, TextField, Button, FormHelperText } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleRegister = (event: any) => {
    event.preventDefault();
    const newErrors = { name: false, email: false, password: false };

    if (!name) {
      newErrors.name = true;
    }

    if (!email) {
      newErrors.email = true;
    }

    if (!password) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.password) {
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
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

        <FormControl fullWidth className="mb-4" error={errors.email}>
          <TextField
            id="email"
            label="Email"
            error={errors.email}
            type="email"
            variant="outlined"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
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
    </main>
  );
}
