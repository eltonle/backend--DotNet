import { Grid} from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCart from "./ProductCard";

interface Props {
    products: Product[];
}
const ProductList = ({products}: Props)=>{
   return (
     <Grid container spacing={4}>
         {products.map((product: any) => (
            <Grid item xs={3} key={product.id}>
                <ProductCart product = {product}/> 
            </Grid>
        ))}
    </Grid>
   )
}


export default ProductList;