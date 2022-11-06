import  { FC } from "react";
import "./Error.css";

const Error: FC = (): JSX.Element => {
  return (
    <div className="custom__error">
      Something Went wrong... please try again
    </div>
  );
};

export default Error;
