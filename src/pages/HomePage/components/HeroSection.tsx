import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="hidden md:flex flex-col md:flex-row justify-center items-center bg-[var(--leafy-bg)]">
      <div className=" max-w-2xl text-left space-y-12 ">
        <h1 className="text-6xl font-bold leading-tight ">
          Свіжі
          <br />
          органічні продукти
          <br />
          Доставлені
          <br />
          до ваших дверей
        </h1>
        <Link to="/catalog" className="btn-primary btn_hover transition cursor-pointer">
          В магазин зараз
        </Link>
      </div>

      <div className="mt-8 md:mt-0 md:ml-12 ">
        <img src="/freshProducts.png" alt="vegetable plate" className="w-50 scale-100 lg:w-120 h-auto " />
      </div>
    </div>
  );
};
