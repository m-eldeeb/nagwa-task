import { FC } from "react";
import "./Heading.css";
const heading: FC = (): JSX.Element => {
  return (
    <>
      <div className="heading">
        <h1 className="heading__h1">Part of Speech</h1>
        <p className="heading__p">
          We help students practice categorizing a set of words according to
          their part of speech
        </p>
      </div>
    </>
  );
};

export default heading;
