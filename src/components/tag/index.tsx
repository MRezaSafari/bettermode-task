import { FC } from "react";

interface Props {
  title: string;
}

const Tag: FC<Props> = ({ title }) => {
  return <li className="bg-indigo-900 border border-indigo-950 rounded-md text-xs px-3 py-1">{title}</li>;
};

export default Tag;
