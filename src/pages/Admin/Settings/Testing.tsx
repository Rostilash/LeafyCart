import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { Breadcrumbs } from "../../Catalog/Breadcrumbs";
import axios from "axios";

export const Testing = () => {
  return (
    <>
      <Breadcrumbs />
      {/* <h1 className="text-3xl text-center mb-10">Панель тестування</h1> */}
      {/* Testing components */}
      {/* <div className="flex flex-col items-center space-y-10 justify-center w-full"> */}
      {/* <Counter /> */}
      {/* TodoList >> deleting */}
      {/* <TodoList /> */}
      {/* Toggle >> sorting >> VisibleCount Showing   */}
      {/* <Toggle /> */}
      {/* Fetching api from server users and posts with async function >> timer */}
      {/* <FetchApi /> */}
      {/* Pagination per Page */}
      {/* <Pagination /> */}
      {/* <DropDownMenu /> */}
      {/* <Form /> */}
      {/* <FocusInput /> */}
      {/* Add products whilte scrolling */}
      {/* <LoadMoreProductsWithUseRef /> */}
      {/* serching values by input */}
      {/* <SearchingValues /> */}
      {/* <NavMenu /> */}
      {/* useAxios castum hook  */}
      {/* <Axios /> */}
      {/* To make a createContext for the component  */}
      {/* <MyProvider>
        <MyComponent />
      </MyProvider> */}

      {/* </div> */}
    </>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);
  const [inputText, setInputText] = useState("");

  const pad = "p-2 bg-gray-300 rounded-full min-w-[50px] cursor-pointer";
  return (
    <>
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
      <div>
        <p>Your text message: {inputText}</p>
        <input type="text" placeholder="Enter your text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      </div>
    </>
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
    if (todoValue.trim().length < 3) {
      alert("Мінімум 3 символи");
      return;
    }
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
  const [array, setArray] = useState<number[]>([1, 5, 4, 22, 6, 2, 3, 9]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [sortType, setSortType] = useState("asc");

  const handleAdd = () => {
    const number = parseInt(inputValue);
    if (!isNaN(number)) {
      setArray((prev) => [...prev, number]);
      setInputValue("");
    }
  };

  const getSortedArray = () => {
    const copy = [...array];

    if (sortType === "asc") {
      return copy.sort((a, b) => a - b);
    }
    if (sortType === "desc") {
      return copy.sort((a, b) => b - a);
    }
    if (sortType === "fiveLast") {
      const notFive = copy.filter((n) => n !== 5).sort((a, b) => a - b);
      const fives = copy.filter((n) => n === 5);
      return [...notFive, ...fives];
    }
    return copy;
  };

  const sortedArray = getSortedArray();

  return (
    <div>
      <h1>Toggle</h1>
      <button onClick={() => setToggleBtn((prev) => !prev)} className="p-2 bg-amber-800 cursor-pointer">
        {toggleBtn ? "Off" : "On"}
      </button>
      <p className="mt-2">Статус: {toggleBtn ? "Вимкнено" : "Увімкнено"}</p>
      <h1 className="text-2xl font-bold mb-4">Список чисел з керуванням</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border px-2 py-1"
          placeholder="Введи число"
        />
        <button onClick={handleAdd} className="px-3 py-1 rounded">
          Додати
        </button>
      </div>
      <div className="mb-4">
        <label>Сортування: </label>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="border p-1 ml-2">
          <option value="asc">За зростанням</option>
          <option value="desc">За спаданням</option>
          <option value="fiveLast">П’ятірки в кінці</option>
        </select>
      </div>

      <ul className="mb-4">
        {sortedArray.slice(0, visibleCount).map((num, index) => (
          <li key={index}>Число: {num}</li>
        ))}
      </ul>

      <div className="flex gap-2">
        {visibleCount < sortedArray.length && (
          <button onClick={() => setVisibleCount((prev) => prev + 3)} className="bg-blue-400 text-white px-3 py-1 rounded">
            Показати ще
          </button>
        )}
        {visibleCount > 3 && (
          <button onClick={() => setVisibleCount((prev) => Math.max(3, prev - 3))} className="bg-yellow-500 text-white px-3 py-1 rounded">
            Менше
          </button>
        )}
        <button onClick={() => setVisibleCount(3)} className="bg-red-400 text-white px-3 py-1 rounded">
          Сховати все
        </button>
      </div>
    </div>
  );
};

const FetchApi = () => {
  const [users, setUsers] = useState<
    {
      name: string;
      phone: string;
      username: string;
      website: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка при завантаженні:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date().toISOString();
      setTimer(date);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //  fetch with async function
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log("something went wrong");
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div>
      <h2>🥕 Овочі (з Open Food Facts)</h2>
      <p>Time For today: {timer}</p>
      <ul>
        {users.map((user, index) => (
          <li
            key={index}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              maxWidth: "300px",
            }}
          >
            <strong>{user.name || "Без назви"}</strong>
            <br />
            <span>{user.phone}</span>
            <p>{user.username}</p>
            <p>{user.website}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pagination = () => {
  const [posts, setPosts] = useState(() => Array.from({ length: 50 }, (_, i) => i + 1));

  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentItems = posts.slice(startIndex, startIndex + perPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>Пагінація</h2>

      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }} className="[&>button]:cursor-pointer">
        <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
          Попередня
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
              margin: "0 5px",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
          Наступна
        </button>
      </div>
    </div>
  );
};

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const options = ["option1", "option2", "option3", "option4", "option5"];

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "200px", margin: "20px" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "10px",
          border: "1px solid gray",
          cursor: "pointer",
          backgroundColor: "#f0f0f0",
        }}
      >
        {selected || "Select"}
      </div>

      <div
        className={`
    absolute top-full right-0 mt-1 w-36 bg-white border border-gray-400
    transition-all duration-300 ease-in-out
    ${isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}
  `}
      >
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleSelect(option)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    checkbox: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (formData.username.length < 6) {
      newErrors.username = "Ім'я користувача має бути не менше 6 символів";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Пароль має бути не менше 8 символів";
    }

    if (!formData.checkbox) {
      newErrors.checkbox = "Ви маєте погодитись";
    }
    setErrors(newErrors);
    console.log(formData);
    // Якщо помилок немає — можна відправляти форму
    if (Object.keys(newErrors).length === 0) {
      console.log("Форма відправлена", formData);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" onChange={handleChange} placeholder="username" value={formData.username} />
        {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
        <input name="password" type="password" onChange={handleChange} placeholder="password" value={formData.password} />
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

        <label>
          <input name="checkbox" type="checkbox" checked={formData.checkbox} onChange={handleChange} />
          Погоджуюсь з умовами
        </label>
        {errors.checkbox && <p className="text-red-500 text-xs">{errors.checkbox}</p>}
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Hадіслати
        </button>
      </form>
    </div>
  );
};

const FocusInput = () => {
  // focus on input
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  // save prev number
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number | null>(null);
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <>
      <div>
        <input ref={inputRef} type="text" placeholder="place your text" />
        <button onClick={handleFocus}> Focus on element</button>
      </div>

      <div>
        <p>Поточне значення: {count}</p>
        <p>Попереднє значення: {prevCountRef.current}</p>
        <button onClick={() => setCount(count + 1)}>Збільшити</button>
      </div>

      <div></div>
    </>
  );
};

const LoadMoreProductsWithUseRef = () => {
  const products = Array.from({ length: 200 }, (_, i) => ({ id: i + 1, name: `Products ${i + 1}` }));
  const [visibleProducts, setVisibleProducts] = useState(15);
  const divRefLoader = useRef<HTMLDivElement | null>(null);

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, products.length));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "100px" }
    );

    const currentRef = divRefLoader.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div>
      <h1>Our Products </h1>

      <ul className="space-y-2">
        {products.slice(0, visibleProducts).map((product) => (
          <li key={product.id} className="bg-gray-200 h-6 rounded mb-2 animate-pulse">
            {product.name}
          </li>
        ))}
      </ul>

      {visibleProducts < products.length && <div ref={divRefLoader}>Завантаження...</div>}
    </div>
  );
};

const SearchingValues = () => {
  const [serachingValue, setSerachingValue] = useState("");
  const products = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Products: ${i + 1}` }));
  const findedProducts = products.filter((prod) => prod.name.includes(serachingValue));
  const ourProducts = serachingValue ? findedProducts : products;

  return (
    <div>
      <input type="text" value={serachingValue} onChange={(e) => setSerachingValue(e.target.value)} placeholder="enter your number" />
      {ourProducts.map((product) => (
        <div key={product.id}> {product.name}</div>
      ))}
    </div>
  );
};

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Ліва панель */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 overflow-hidden ${isOpen ? "w-64" : "w-12"}`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        // tabIndex={0}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <div className="p-4 font-bold border-gray-600">{isOpen ? "Меню" : "≡"}</div>
        {isOpen && (
          <ul className="p-4 space-y-2">
            <li>Головна</li>
            <li>Про нас</li>
            <li>Контакти</li>
          </ul>
        )}
      </div>

      {/* Контент */}
      <div className="flex-1 bg-gray-100 transition-all duration-300 p-10">
        <h1 className="text-2xl font-bold">Основний контент</h1>
        <p>Меню розширюється при наведенні або фокусі.</p>
      </div>
    </div>
  );
};

function useAxios(url: string) {
  // Castum hook for Axios !!!
  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(url);
        setData(res.data);
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

const Axios = () => {
  const { data, loading, error } = useAxios("/posts/1");

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

// 1. Описуємо тип значення контексту
type MyContextType = {
  number: number;
  text: string;
  isActive: boolean;
};

// 2. Створюємо контекст з цим типом
const MyContext = createContext<MyContextType | undefined>(undefined);

// 3. Типізація провайдера
type MyProviderProps = {
  children: ReactNode;
};

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const value: MyContextType = {
    number: 42,
    text: "Привіт, світ!",
    isActive: true,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// 4. Використання значень з контексту
const MyComponent: React.FC = () => {
  const contextValue = useContext(MyContext);

  if (!contextValue) {
    throw new Error("MyComponent має бути всередині MyProvider");
  }

  return (
    <div>
      <p>Number: {contextValue.number}</p>
      <p>Text: {contextValue.text}</p>
      <p>Active: {contextValue.isActive ? "Yes" : "No"}</p>
    </div>
  );
};
