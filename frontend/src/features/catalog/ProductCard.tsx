import { LoadingButton } from "@mui/lab";
import {  Card, CardActionArea, Button, CardActions, CardContent, CardMedia, Typography, Avatar, CardHeader} from "@mui/material";
// import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/Util";

interface Props {
    product: Product;
}

const ProductCart= ({product}:Props)=>{ 

  const [loading,setLoading]= useState(false);
  const {setBasket} = useStoreContext();
   
  function handleAddItem(productId: number){
    setLoading(true);
    agent.Basket.addItem(productId)
       .then(basket => setBasket(basket))
       .catch(error=>console.log(error))
       .finally(()=>setLoading(false));
  }

 

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
            loading={loading}  
            onClick={()=>handleAddItem(product.id)}
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