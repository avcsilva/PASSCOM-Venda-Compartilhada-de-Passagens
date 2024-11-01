import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import img_default from '/image/passagem-de-aviao.png'; // Importa a imagem

export const TicketsItem = ({ title, id, onCancel }) => {
  const handleCancelClick = () => {
    onCancel(id); // Passa o id para a função de cancelamento
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {title}
        </Typography>
        <CardActions sx={{ padding: 0 }}>
          <Button size="small" onClick={handleCancelClick}>Cancelar</Button>
        </CardActions>
      </CardContent>
      <CardMedia
        sx={{ height: 100, width: 100, marginLeft: 2 }} // Ajusta a altura e largura da imagem
        image={img_default}
        title="img_voos"
      />
    </Card>
  );
};

// Validação de props
TicketsItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};
