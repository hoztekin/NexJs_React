import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import ProductItem from "./ProductItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Product({ products, categories, setProducts, filtereds, search }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_150px)] gap-4">
      {filtereds
        .filter((products) => products.title?.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}

      <div
        className="product-item border hover:shadow-lg  bg-purple-800 cursor-pointer transition-all select-none flex justify-center items-center hover:opacity-90 min-h-[150px]"
        onClick={() => {
          setIsAddModalOpen(true);
        }}
      >
        <PlusOutlined className="text-white md:text-3xl hover:opacity-90 flex justify-center items-center" />
      </div>
      <div
        className="product-item border hover:shadow-lg  bg-orange-800 cursor-pointer transition-all select-none flex justify-center items-center hover:opacity-90 min-h-[150px]"
        onClick={() => {
          navigate("/products");
        }}
      >
        <EditOutlined className="text-white md:text-3xl hover:opacity-90 flex justify-center items-center" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}

export default Product;
