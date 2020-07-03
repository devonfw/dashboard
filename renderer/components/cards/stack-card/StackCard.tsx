import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    minWidth: 250,
    margin: '0',
    '& button': {
      padding: '1rem 0 0 0'
    },
    '& .MuiButtonBase-root:hover': {
      backgroundColor: '#4CBDEC',
      '& .MuiTypography-colorTextSecondary': {
        color: '#FFFFFF',
        textTransform: 'uppercase'
      }
    }
  },
  media: {
    height: 120
  },
  bgColor: {
    backgroundColor: '#4CBDEC',
    '& .MuiTypography-colorTextSecondary': {
      color: '#FFFFFF'
    },
    '& .MuiCardActionArea-root': {
      cursor: 'default'
    }
  },
  containImg: {
    'background-size': 'contain',
    margin: '0 1rem',
  },

  textCenter: {
    'text-align': 'center',
    textTransform: 'uppercase'
  },
  noCursor: {
    cursor: 'default'
  }
});


interface StackProps {
  image: string;
  command: string;
  variant: boolean;
  onClick: ((event: React.MouseEvent) => void);
}

export default function StackCard(props: StackProps) {
  const classes = useStyles();
  const { image, command, variant } = props;

  return (
    <Card className={`${classes.card} ${variant ? classes.bgColor : ''}`} onClick={variant ? undefined : props.onClick}>
      <CardActionArea>
        <CardMedia
          className={`${classes.media} ${classes.containImg}`}
          image={image}
          title={command}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.textCenter}>
            {command}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}