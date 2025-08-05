import { useState, type ChangeEvent, type FormEvent } from "react";
import { Breadcrumbs } from "../../Catalog/Breadcrumbs";

export const Testing = () => {
  return (
    <>
      <Breadcrumbs />
      <h1 className="text-3xl text-center mb-10">Панель тестування</h1>
      {/* Testing components */}
      <div className="flex flex-col items-center space-y-10 justify-center w-full">
        <Counter />
        <TodoList />
        <Toggle />
      </div>
    </>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);
  const pad = "p-2 bg-gray-300 rounded-full min-w-[50px] cursor-pointer";
  return (
    <div className="flex items-center space-x-2 justify-center w-full">
      <p>Лічильник</p>
      <span className="text-xl font-bold px-4">{count}</span>
      <button onClick={() => setCount((prev) => Math.min(10, prev + 1))} className={pad}>
        +
      </button>
      <button onClick={() => setCount(0)} className={pad}>
        0
      </button>
      <button onClick={() => setCount((prev) => Math.max(0, prev - 1))} className={pad}>
        -
      </button>
    </div>
  );
};

const TodoList = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todoLists, setTodoLists] = useState<
    {
      id: string;
      todo: string;
    }[]
  >([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoValue.trim() === "") return;
    setTodoLists((prev) => [...prev, { id: Date.now().toString(), todo: todoValue }]);
    setTodoValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const openConfirm = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      setTodoLists((prev) => prev.filter((item) => item.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <span>TODO</span>
        <input type="text" placeholder="Введіть текст" value={todoValue} onChange={handleChange} />
        <button type="submit" className="cursor-pointer">
          Додати
        </button>
      </form>
      {todoLists &&
        todoLists.map((list) => (
          <div key={list.id} className="flex items-center justify-between p-2 bg-gray-100 mb-2 rounded">
            <span className="mr-5">
              id:{list.id} - Завдання:{list.todo}
            </span>
            <button onClick={() => openConfirm(list.id)} className="p-1 px-2 border bg-red-400 cursor-pointer">
              X
            </button>
          </div>
        ))}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <p className="mb-4">Ви дійсно хочете видалити цю задачу?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleCancelDelete} className="px-4 py-2 border rounded hover:bg-gray-100">
                Відмінити
              </button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Toggle = () => {
  const [toggleBtn, setToggleBtn] = useState(false);

  const array = [1, 5, 4, 22, 6, 2, 3, 9];
  const sortedArray = array.sort((a, b) => a - b);

  const withoutFive = array.sort((a, b) => {
    if (a === 5 && b !== 5) return 1;
    if (b === 5 && a !== 5) return -1;
    return a - b;
  });

  return (
    <div>
      <h1>Toggle</h1>
      <button onClick={() => setToggleBtn((prev) => !prev)} className="p-2 bg-amber-800 cursor-pointer">
        {toggleBtn ? "Off" : "On"}
      </button>
      <p className="mt-2">Статус: {toggleBtn ? "Вимкнено" : "Увімкнено"}</p>
    </div>
  );
};
