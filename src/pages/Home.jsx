import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products";

export default function Home() {
    let products = getProducts();

    return <div className="page">

      {/* the classnames represents the css design i wrote in my app.css file */}
        <div className="home-hero">
            <h1 className="home-title"> 
            Welcome to ShopHub
            </h1>

            <p className="home-subtitle">
                Discover amazing products at great prices
            </p>
        </div>

        <div className="container">
            <h2 className="page-title">
                Our Products
            </h2>

            {/* array to show products in a grid */}
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard product={product} key={product.id}/>
                ))}

            </div>
        </div>
    </div>;
}