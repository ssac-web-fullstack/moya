import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// interface Props {
//   children:
// }

const Header = () => {
  const router = useRouter();

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: 'text.disabled', color: 'background.paper', marginBottom: '2%' }}
    >
      <Toolbar>
        <IconButton>
          <Link href="/">
            <a>
              <Image src="/images/moya-logo.png" width="50px" height="50px" />
            </a>
          </Link>
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          Moya
        </Typography>
        <LogoutIcon
          onClick={() => {
            router.back();
          }}
          style={{ cursor: 'pointer' }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
