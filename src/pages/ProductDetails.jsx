import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";

export default function ProductDetails() {
    //MARK: - PROPERTIES

    // same as a dependnecy injection in swiftui
    let { id } = useParams();

    let [product, setProduct] = useState(null);
    let navigate = useNavigate();

    // allows us to run a function right when the component renders, as long as we pass a dependency list
    useEffect(() => {
        let foundProduct = getProductById(id);

        if(!foundProduct) {
            navigate("/")
            return;
        }

        setProduct(foundProduct);

    // when the id changes, we run the useeffect again
    }, [id]);

    // guard clause: on the first render, product is still null (useEffect hasn't run yet),
// so we return early with a loading message to avoid crashing on product.image/.name below.
// once useEffect sets the real product, this component re-renders and skips past this block.
if (!product) {
    return <div className="page"><div className="container">Loading...</div></div>;
  }  

    //MARK: - BODY
    return (
    <div className="page"> 
        <div className="container">
            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-detail-content">
                    <h1 className="product-detail-name">{product.name}</h1>
                    <p className="product-detail-price">${product.price}</p>
                    <p className="product-detail-description">{product.description}</p>
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
    );
}