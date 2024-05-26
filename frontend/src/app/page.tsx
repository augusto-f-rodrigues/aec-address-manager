'use client';
import { FormControl, TextField, Button } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: any) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <main className="main-container">
      <h1 className="text-h1 mb-4">Login</h1>
      <form
        className="flex w-full min-w-80 max-w-[500px] flex-col items-center justify-center rounded-lg border border-gray-500 border-opacity-20 bg-white p-10"
        onSubmit={handleLogin}
      >
        <FormControl fullWidth className="mb-4">
          <TextField
            id="username"
            label="Usuário"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth className="mb-4">
          <TextField
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>

        <div className="flex w-full flex-col items-center md:flex-row md:gap-4">
          <Button
            className="mb-4 w-full bg-blue-600 px-8 py-1 normal-case hover:bg-blue-500 md:mb-0 md:max-w-52"
            variant="contained"
            type="submit"
          >
            <span>Entrar</span>
          </Button>

          <Link className="w-full md:max-w-52" href="/register">
            <Button
              className="w-full bg-green-600 px-8 py-1 normal-case hover:bg-green-500"
              variant="contained"
            >
              <span>Cadastre-se</span>
            </Button>
          </Link>
        </div>
      </form>
    </main>
  );
}
