import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const params = useParams();
  const nevigate=useNavigate();

  useEffect(()=>{
      console.log(params);
      getProductDetails();
      
  },[])
  const getProductDetails=async()=>{
      console.log(params);
      let result=await fetch(`http://localhost:5000/product/${params.id}`);
      result=await result.json();
      console.log(result);
      setName(result.name);
      setPrice(result.price)
      setCategory(result.category)
      setCompany(result.company)

  }

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result= fetch(`http://localhost:5000/product/${params.id}`,{
        method:'Put',
        body: JSON.stringify({
            name, price, category, company }),
            headers:{'Content-Type':"application/json"}
    });
    result=await (await result).json()
    console.warn(result);
    nevigate('/')
  };

  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
        className="inputBox"
      />

      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product price"
        className="inputBox"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product category"
        className="inputBox"
      />
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Product company"
        className="inputBox"
      />
      <button onClick={updateProduct} className="appbtn">
        update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
