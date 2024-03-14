import { FC } from "react";

interface ErrorProps {
  message: string;
}

const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <p className="text-center">Something Went Wrong: {message}</p>
    </div>
  );
};

export default Error;
