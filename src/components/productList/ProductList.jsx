import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./ProductList.scss"; // SCSS faylni import qilamiz

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 15" },
    { id: 2, name: "MacBook Pro" },
    { id: 3, name: "AirPods Pro" },
  ]);

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
          key={product.id}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="product-card"
        >
          <span>{product.name}</span>
          <button onClick={() => removeProduct(product.id)}>❌</button>
        </motion.div>        
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
