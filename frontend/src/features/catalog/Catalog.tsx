import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
   const [loading, setLoading]=useState(true)


  //on peur destructurer le props en faisant {products, addProduct}
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
   agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
  }, []);

 if(loading) return <LoadingComponent message="loading products ..."/>
  return (
    <>
      <ProductList products={products} />
      {/* <Button variant="contained" onClick={addProduct}>Add product</Button> */}
    </>
  );
};

export default Catalog;
