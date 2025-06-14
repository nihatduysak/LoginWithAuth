import { useState, useEffect } from "react";

export default function TodoApp() {
  const [isLogin, setIsLogin] = useState(!!localStorage.token);
  const [username, setUsername] = useState(localStorage.username || "");

  return (
    <div className="todo-app">
      <h1>Login + Token + Todo Ekleme</h1>
      {isLogin ? (
        <>
          <div className="navbar">
            <p>Hoşgeldin <span>{username}</span></p>
            <button
              onClick={() => {
                delete localStorage.token;
                delete localStorage.username;
                setIsLogin(false);
                setUsername("");
              }}
            >
              Çıkış Yap
            </button>
          </div>
          <AddTodo />
        </>
      ) : (
        <LoginForm setIsLogin={setIsLogin} setUsername={setUsername} />
      )}
    </div>
  );
}

function LoginForm({ setIsLogin, setUsername }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.token = data.token;
      localStorage.username = form.username;
      setIsLogin(true);
      setUsername(form.username);
    } else {
      setError("Giriş başarısız. Kullanıcı adı veya şifre yanlış.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Kullanıcı Adı</label>
      <input
        type="text"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <label>Şifre</label>
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Giriş Yap</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

function AddTodo() {
  const [title, setTitle] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    try {
      setTodos(JSON.parse(localStorage.todos || "[]"));
    } catch {
      setTodos([]);
    }
  }, []);

  const handleAdd = async () => {
    const token = localStorage.token;
    if (!title.trim()) {
      setResponseMsg("Todo boş olamaz.");
      return;
    }

    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        todo: title,
        completed: false,
        userId: 1,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      let currentTodos = [];
      try {
        currentTodos = JSON.parse(localStorage.todos || "[]");
      } catch {
        currentTodos = [];
      }
      currentTodos.push(data);
      localStorage.todos = JSON.stringify(currentTodos);
      setTodos(currentTodos);

      setResponseMsg(`Eklendi: ${data.todo}`);
      setTitle("");
    } else {
      setResponseMsg("Ekleme başarısız.");
    }
  };

  const handleClear = () => {
    localStorage.removeItem("todos"); // localStorage'daki todos verisini siler
    // localStorage.clear(); // localStorage'daki tüm verileri siler
    setTodos([]);
    setResponseMsg("Tüm todolar silindi.");
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.todos = JSON.stringify(newTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].todo);
  };

  const handleSave = (index) => {
    const newTodos = [...todos];
    newTodos[index].todo = editValue;
    setTodos(newTodos);
    localStorage.todos = JSON.stringify(newTodos);
    setEditIndex(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div>
      <h2>Todo Ekle</h2>
      <input
        className="inputTodo"
        type="text"
        placeholder="Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Ekle</button>
      <button onClick={handleClear}>
        Tümünü Temizle
      </button>
      <p>{responseMsg}</p>
      <h3>Eklenen Todolar</h3>
      <ul>
        {todos.map((x, i) => (
          <li key={i} className="todo-item">
            {editIndex === i ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <div className="todo-actions">
                  <button onClick={() => handleSave(i)}>Kaydet</button>
                  <button onClick={handleCancel}>Vazgeç</button>
                </div>
              </>
            ) : (
              <>
                <span>{x.todo}</span>
                <div className="todo-actions">
                  <button onClick={() => handleEdit(i)}>✍🏼</button>
                  <button
                    className="delete-todo"
                    onClick={() => handleDelete(i)}
                    aria-label="Sil">🗑️</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}