function ProductCard({ name, price, image }) {
  return (
    <div className="card">

      <div className="hero">
        <img src={image} alt={name} />
      </div>

     
      <h4>{name}</h4>
      <p className="price">₹{price}</p>

    </div>
  );
}

export default ProductCard;








