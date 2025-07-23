export const Catalog = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold bg-[var(--leafy-light)] ">Каталог продуктів</h1>
      <section className="grid grid-cols-4 justify-items-center p-10 bg-[var(--leafy-light)] h-screen">
        <div>
          <h3 className="title-l">Продукти харчування</h3>
          <ul className="space-y-2 [&>li]:text-[var(--leafy-gray)] [&>li]:cursor-pointer [&>li]:mb-2 list-disc">
            <li>Овочі</li>
            <li>Фрукти</li>
            <li>Зернові</li>
            <li>Молочні продукти</li>
            <li>М'ясо та риба</li>
            <li>Соуси, приправи</li>
            <li>Напої</li>
            <li>Заморожені продукти</li>
          </ul>
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
