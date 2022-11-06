import { FC } from "react";
import "./Loading.css";

const Loading: FC = (): JSX.Element => {
  return (
    <div className="loading">
      <div className="loading__circles">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
