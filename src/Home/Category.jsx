import "./Category.css";

const categories = [
  { name: "Air Conditioners", img: "/assets/Ac.jpg" },
  { name: "Mobiles", img: "/assets/mobile.jpg" },
  { name: "Audio", img: "/assets/earpods.jpg" },
  { name: "Televisions", img: "/assets/TV.jpg" },
  { name: "Tablets", img: "/assets/tablet.jpg" },
  { name: "Smart Wearables", img: "/assets/watch.jpg" },
  { name: "Laptops", img: "/assets/laptop.jpg" },
  { name: "Refrigerators", img: "/assets/refrigertor.jpg" },
  { name: "Washing  Machine", img: "/assets/ws.jpg" },
];

function Category() {
  return (
    <div className="categories">
      {categories.map((category, index) => (
        <div className="category" key={index}>
        <img src={category.img} alt={category.name} />
        <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
}


export default Category;