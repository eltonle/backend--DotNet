import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent"
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";

const Catalog = () => {
  //  const [loading, setLoading]=useState(true)
  //on peur destructurer le props en faisant {products, addProduct}
  // const [products, setProducts] = useState<Product[]>([]);
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status} = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch();
  useEffect(() => {
     if (!productsLoaded) dispatch(fetchProductsAsync()) ;
  }, [productsLoaded, dispatch]);

 if(status.includes('pending')) return <LoadingComponent message="loading products ..."/>
  return (
    <>
      <ProductList products={products} />
      {/* <Button variant="contained" onClick={addProduct}>Add product</Button> */}
    </>
  );
};

export default Catalog;
