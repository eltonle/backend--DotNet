import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
  //on peur destructurer le props en faisant {products, addProduct}
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  //   function addProduct() {
  //     setProducts((prevState) => [
  //       ...prevState,
  //       {
  //         id: (prevState.length + 1),
  //         name: "product" + (prevState.length + 1),
  //         price: prevState.length * 100 + 100,
  //         brand: "some brand",
  //         description: "some description",
  //         pictureUrl: "http://picsum.photos/200",
  //       },
  //     ]);
  //   }

  return (
    <>
      <ProductList products={products} />
      {/* <Button variant="contained" onClick={addProduct}>Add product</Button> */}
    </>
  );
};

export default Catalog;
