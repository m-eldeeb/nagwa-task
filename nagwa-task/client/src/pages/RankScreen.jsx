import { useParams } from "react-router-dom";
import Result from "../components/result/Result";

const RankScreen = () => {
  let { score } = useParams();
  return (
    <>
      <h1 className="rank__screen__heading">rank screen</h1>
      <Result score={score} />
    </>
  );
};

export default RankScreen;
