import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../redux/features/counter/counterSlice";
import Payment from "./Payment/Payment";
import PaymentHistory from "./PaymentHistory/PaymentHistory";

const Home = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center ">
      <div>
        <button
          onClick={() => dispatch(increment())}
          className="btn btn-outline"
        >
          increment
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(10))}
          className="btn btn-outline"
        >
          increment by amount
        </button>
        <p className="text-2xl">{count}</p>
        <button
          onClick={() => dispatch(decrement())}
          className="btn btn-outline"
        >
          decrement
        </button>
      </div>
    </div>
  );
};

export default Home;
