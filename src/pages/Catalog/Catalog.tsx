import { Link } from "react-router-dom";
import { categories } from "../../types/productTypes";

export const Catalog = () => {
  const catProducts = categories.map((cat) => (
    <li key={cat}>
      <Link to={`/catalog/${cat.toLowerCase().replace(/ /g, "-")}`}>{cat}</Link>
    </li>
  ));
  return (
    <>
      <h1 className="text-4xl text-center font-bold bg-[var(--leafy-bg)] ">Каталог продуктів</h1>
      <section className="grid grid-cols-4 justify-items-center p-10 bg-[var(--leafy-bg)] h-screen">
        <div>
          <h3 className="title-l">Продукти харчування</h3>
          <ul className="space-y-2 [&>li]:text-[var(--leafy-gray)] [&>li]:cursor-pointer [&>li]:mb-2 list-disc">{catProducts}</ul>
        </div>
        <div>
          <h3 className="title-l">Готові страви</h3>
          <ul className="space-y-2 [&>li]:text-[var(--leafy-gray)] [&>li]:cursor-pointer [&>li]:mb-2 list-disc">
            <li>Сніданки</li>
            <li>Обіди</li>
            <li>Вечері</li>
            <li>Вегетаріанські/веганські страви</li>
            <li>Фітнес меню</li>
            <li>Дитяче харчувння</li>
          </ul>
        </div>
        <div>
          <h3 className="title-l">Раціони</h3>
          <ul className="space-y-2 [&>li]:text-[var(--leafy-gray)] [&>li]:cursor-pointer [&>li]:mb-2 list-disc">
            <li>На день/тиждень</li>
            <li>Дієтичні програми</li>
            <li>Калорійні набори</li>
            <li>Інтервальне харчування</li>
          </ul>
        </div>
        <div>
          <h3 className="title-l">Комбо-набори / Акції</h3>
          <ul className="space-y-2 [&>li]:text-[var(--leafy-gray)] [&>li]:cursor-pointer [&>li]:mb-2 list-disc">
            <li>Знижки</li>
            <li>«1+1»</li>
            <li>Святкові/сезонні пропозиції</li>
          </ul>
        </div>
      </section>
    </>
  );
};
