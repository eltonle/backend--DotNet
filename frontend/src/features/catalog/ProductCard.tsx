import {  Card, CardActionArea, Button, CardActions, CardContent, CardMedia, Typography, Avatar, CardHeader} from "@mui/material";
import { Product } from "../../app/models/product";
interface Props {
    product: Product;
}

const ProductCart= ({product}:Props)=>{
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
               ${(product.price/100).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.brand} /  {product.type}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Add to cart
          </Button>
          <Button size="small" color="primary">
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