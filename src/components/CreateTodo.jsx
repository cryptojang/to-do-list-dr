import { useState } from "react";
import { useActionData } from "react-router-dom";

const CreateTodo = ({ todos, getTodos, lastTodoId }) => {
  const [newTodo, setNewTodo] = useState("");

  const onSubmitNewTodo = (e) => {
    e.preventDefault();

    if (!newTodo) return; // 함수 끝내라. 함수 실행 안 된다.

    const newTodos = [
      ...todos,
      { id: lastTodoId + 1, title: newTodo, isDone: false },
    ];

    localStorage.setItem("todos", JSON.stringify(newTodos));

    getTodos();

    setNewTodo("");
  };

  return (
    <form className=" w-96 mx-auto mt-12 flex" onSubmit={onSubmitNewTodo}>
      <input
        className="w-3/4 mr-4 rounded-md p-2 focus:outline-none border-2 focus:border-blue-300"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input
        className="w-1/4 bg-green-300 hover:bg-green-400 active:bg-green-600 rounded-md text-white font-semibold "
        type="submit"
        value="추 가"
      />
    </form>
  );
};

export default CreateTodo;
