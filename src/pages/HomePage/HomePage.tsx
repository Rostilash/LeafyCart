interface Iproducts {
  id: number;
  name: string;
  price: number;
  img: string;
}

export const HomePage = () => {
  const products: Iproducts[] = [
    {
      id: 1,
      name: "Vegan Pizza",
      price: 1299,
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Grilled chicken",
      price: 999,
      img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "Mixed Vegetables",
      price: 1299,
      img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      name: "Fresh Avocados",
      price: 1299,
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "Vegan Pizza",
      price: 1299,
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 6,
      name: "Grilled chicken",
      price: 999,
      img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 7,
      name: "Mixed Vegetables",
      price: 1299,
      img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 8,
      name: "Fresh Avocados",
      price: 1299,
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    },
  ];

  const ourProducts = products.map((product) => (
    <article key={product.id} className="flex flex-col items-center justify-center w-[240px] bg-[var(--leafy-sage)] rounded-2xl">
      <img src={product.img} alt={product.name} className="w-50 h-50 object-cover rounded-[50%] p-2" />

      <div className="w-full bg-[var(--leafy-yelgreen)] p-4 rounded-md flex flex-col">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg" itemProp="name">
            {product.name}
          </h3>
          <span className="text-gray-700" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <span itemProp="price">{(product.price / 100).toFixed(2)} ₴</span>
          </span>
        </div>

        <button className="btn-primary-sm  btn_hover transition cursor-pointer mt-4 ml-auto">Додати до кошику</button>
      </div>
    </article>
  ));

  return (
    <>
      <div className="flex flex-col md:flex-row justify-around items-center bg-[var(--leafy-light)] p-10">
        <div className="max-w-md text-left space-y-12">
          <h1 className="text-6xl font-bold leading-tight">
            Свіжі,
            <br />
            органічні
            <br />
            продукти
            <br />
            Доставлені
            <br />
            до ваших дверей
          </h1>
          <button className="btn-primary btn_hover transition cursor-pointer">В магазин зараз</button>
        </div>

        <div className="mt-8 md:mt-0 md:ml-12 ">
          <img src="/vagitables.png" alt="vegetable plate" className="w-120 h-auto" />
        </div>
      </div>

      <div className="bg-[var(--leafy-light)] min-h-140">
        <h1 className="title-xl p-4 text-center ">Рекомендовані продукти</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10 justify-items-center">{ourProducts}</div>
      </div>
    </>
  );
};
