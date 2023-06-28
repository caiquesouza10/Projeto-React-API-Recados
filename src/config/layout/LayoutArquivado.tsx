import { Container, Grid } from '@mui/material';
import React from 'react';
import ResponsiveAppBar from '../../components/appBar/ResponsiveAppBar';
import AppBarArquivados from '../../components/appBarArquivados/AppBarArquivados';

interface DefaultLayoutProps {
  component: React.FC;
}

const LayoutArquivado: React.FC<DefaultLayoutProps> = ({ component: Component }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBarArquivados />
      </Grid>

      <Grid item xs={12}>
        <Container sx={{ marginTop: '20px' }}>
          <Component />
        </Container>
      </Grid>
    </Grid>
  );
};

export default LayoutArquivado;
