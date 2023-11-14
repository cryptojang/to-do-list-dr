import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FiCheckSquare, FiTrash2, FiEdit } from "react-icons/fi";
import { useState } from "react";

const Detail = () => {
  const { id } = useParams(); // :id 에서 : 뺀 부분 넣어야 함. 이렇게 쓰면 이제 id 가져와서 사용할 수 있는거. 객체는 순서 없음.//파라미터 가져오기
  const [searchParams] = useSearchParams(); // 주소창에서 쿼리스트링 가져옴 // 배열이기 때문에 순서가 있다.//쿼리스트링 가져오기
  const navigate = useNavigate();

  const title = searchParams.get("title"); // 키값 입력해 겟함수로 가져옴
  const isDone = searchParams.get("is-done");

  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  const onClickEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();
    if (!editTodo) return;
    const localTodos = localStorage.getItem("todos");
    const parsedTodos = JSON.parse(localTodos);

    const updatedTodos = parsedTodos.map((v, i) => {
      if (v.id === +id) {
        return { id: v.id, title: editTodo, isDone: v.isDone };
      } else {
        return v;
      }
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/", { replace: false });
  };

  const onClickisDone = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const updatedTodos = parsedTodos.map((v, i) => {
      if (v.id === +id) {
        return { id: v.id, title: v.title, isDone: !v.isDone };
      } else {
        return v;
      }
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/", { replace: false });
  };

  const onClickDel = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const deletedTodos = parsedTodos.filter((v, i) => {
      if (v.id !== +id) {
        return v;
      }
    });

    if (deletedTodos.length === 0) {
      localStorage.removeItem("todos");
    } else {
      localStorage.setItem("todos", JSON.stringify(deletedTodos));
    }

    navigate("/", { replace: false });
  };

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center ">
      <span>{id}</span>
      <span className="ml-4">
        {isEdit ? (
          <form className="flex" onSubmit={onSubmitEdit}>
            <input
              className="border-2 focus:outline-none focus:border-blue-300 mr-3 px-2 py-1"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
            <input className="hover:font-bold" type="submit" value="확인" />
          </form>
        ) : (
          title
        )}
      </span>
      <button
        onClick={onClickisDone}
        className="flex bg-green-400 hover:bg-green-600 active:bg-green-400 ml-4 rounded-md px-2 h-10 justify-center items-center"
      >
        <FiCheckSquare /> {isDone == "false" ? "완료" : "진행 중"}
      </button>
      <button
        onClick={onClickEditToggle}
        className="flex bg-blue-400 hover:bg-blue-600 active:bg-blue-400 ml-4 rounded-md px-2 h-10 justify-center items-center"
      >
        <FiEdit /> {isEdit ? "취소" : "수정"}
      </button>
      <button
        onClick={onClickDel}
        className="flex bg-red-400 hover:bg-red-600 active:bg-red-400 ml-4 rounded-md px-2 h-10 justify-center items-center"
      >
        <FiTrash2 />
        삭제
      </button>
    </div>
  );
};
//isDone을 주소창으로 가져와서 스트링됨

export default Detail;
