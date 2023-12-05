import { useDispatch, useSelector } from "react-redux";
import Payment from "./Payment/Payment";
import PaymentHistory from "./PaymentHistory/PaymentHistory";

const Home = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center ">
      <div>
        <button className="btn btn-outline">increment</button>
        <p className="text-2xl">{count}</p>
        <button className="btn btn-outline">decrement</button>
      </div>
    </div>
  );
};

export default Home;
