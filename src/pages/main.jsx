import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TodoCard from "../components/TodoCard";

const Main = () => {
  const [todos, setTodos] = useState([]); // todos는 화면에 보이는 todo의 목록(배열). 빈 배열 초기화!! 로컬 스토리지에서 가져올 것임
  const [lastTodoId, setLastTodoId] = useState(0);

  const getTodos = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);
    //object 배열로 바꿔주고 //setTodos로 Todos 업데이트
    setTodos(parsedTodos);

    setLastTodoId(parsedTodos[parsedTodos.length - 1].id);
  }; //로컬 스토리지에서 읽어와서 셋투두스로 투두스에 저장

  useEffect(() => {
    getTodos();
    //console.log(todos);
  }, []); //새로 고침시 한 번 실행

  //useEffect(() => console.log(lastTodoId), [lastTodoId]);

  return (
    <main className=" min-h-screen max-w-screen-md mx-auto">
      <h1 className=" text-center text-4xl font-bold py-12">To do List</h1>
      <CreateTodo todos={todos} getTodos={getTodos} lastTodoId={lastTodoId} />
      <ul className=" w-96 mx-auto mt-12 h-[30rem] overflow-y-auto">
        {todos.length === 0
          ? "비어있을 때"
          : todos.map((v, i) => {
              return <TodoCard key={i} todo={v} />;
            })}
      </ul>
    </main>
  );
};

export default Main;
