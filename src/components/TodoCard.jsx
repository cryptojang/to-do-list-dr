import { Link } from "react-router-dom";

const TodoCard = ({ todo }) => {
  return (
    <li className={` h-12 flex items-center  text-xl `}>
      <span className=" w-1/12 text-right">{todo.id}</span>
      <span className={`w-8/12 pl-2 ${todo.isDone && "line-through"}`}>
        {todo.title}
      </span>
      <Link
        to={`/${todo.id}?title=${todo.title}&is-done=${todo.isDone}`} // ? ㅈㅓㄴ까지가 파라미터, 뒤뒤에에는  쿼리스트링, 쿼리스트링 잇잇는  건  &로
        //    주소 날릴때는 낙타 안쓰고 뱀 쓰는 게 나음
        className=" w-3/12 hover:font-bold"
      >
        Detail
      </Link>
    </li>
  );
};

export default TodoCard;
