'use client';
import { decryptData } from '@/utils/jwt.util';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decryptedData: any = decryptData(token);
        setUserName(decryptedData?.name);
      } catch (error) {
        console.error('Failed to decrypt token:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="justify-between">
          <Typography
            variant="h6"
            className="text-center text-lg font-extrabold"
          >
            {userName && `Bem vindo(a), ${userName}`}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Layout;
