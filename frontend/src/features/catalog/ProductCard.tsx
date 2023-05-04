import { LoadingButton } from "@mui/lab";
import {  Card, CardActionArea, Button, CardActions, CardContent, CardMedia, Typography, Avatar, CardHeader} from "@mui/material";
// import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/Util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";

interface Props {
    product: Product;
}

const ProductCart= ({product}:Props)=>{ 

  const {status} = useAppSelector(state => state.basket )
  const dispatch = useAppDispatch();
   

    return(
      <Card >
        <CardActionArea>
            <CardHeader  avatar ={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
             title={product.name}
             titleTypographyProps={{ 
                sx: {fontWeight:'bold', color: 'secondary.main'}
              }}

            />
          <CardMedia
           sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light'}}
            image={product.pictureUrl}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom color='secondary' variant="h5">
               {currencyFormat(product.price)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.brand} / {product.type}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <LoadingButton 
            loading={status.includes('pending' + product.id)}  
            onClick={()=>dispatch(addBasketItemAsync({productId: product.id}))}
            size="small" 
            color="primary">
            Add to cart
          </LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
        // <ListItem key={product.name}>
        //     <ListItemAvatar>
        //         <Avatar src={product.pictureUrl}/>
        //     </ListItemAvatar>
        //     <ListItemText>
        //         {product.name}-{product.price}
        //     </ListItemText>
        // </ListItem> 
    )
}

export default ProductCart;