import Header from "../components/Header/Header";
import CartTotal from "../components/cart/CartTotal";
import Categories from "../components/categories/Categories";
import Product from "../components/product/Product";
import { useState, useEffect } from "react";
import { Spin } from "antd";

function HomePage() {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtereds, setFiltereds] = useState([]);
  const [search, setSearch] = useState("");
  console.log(console.log(import.meta.env.VITE_APP_SERVER_URL));
  useEffect(() => {
    const getCateroies = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCateroies();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_APP_SERVER_URL +"/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen  ">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10 ">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltereds={setFiltereds}
              products={products}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px] justify-around">
            <Product
              products={products}
              setProducts={setProducts}
              categories={categories}
              filtereds={filtereds}
              search={search}
            />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border ">
            <CartTotal />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
}

export default HomePage;
