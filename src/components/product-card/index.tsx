import { IconArrowUp, IconMessage } from "@tabler/icons-react";
import { FC } from "react";
import { Box, Tag } from "..";

interface Props {
  name: string;
  description: string;
  image: string;
  tags: string[];
  commentsLength: number;
  upvotes: number;
  slug: string;
}

const ProductCard: FC<Props> = ({
  commentsLength,
  description,
  image,
  name,
  slug,
  tags,
  upvotes,
}) => {
  const renderTags = () => tags.map((tag) => <Tag key={tag} title={tag} />);
  return (
    <a
      href={`/products/post/${slug}`}
      target="_blank"
      className="block hover:scale-105 transition duration-500 ease-in-out product-card__container "
    >
      <Box>
        <figure>
          <header className=" w-full flex justify-center border-b border-b-coal-border p-4 overflow-hidden relative">
            <img
              src={image}
              alt={name}
              width={72}
              height={72}
              className="rounded-full"
            />
            <div className="display-middle">
              <svg
                id="radius"
                preserveAspectRatio="xMidYMid slice"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox=" 0 0 300 300"
                overflow="visible"
              >
                <g>
                  <circle className="ring" cx="50%" cy="50%" r="180" />
                  <circle className="ring" cx="50%" cy="50%" r="200" />
                  <circle className="ring" cx="50%" cy="50%" r="220" />
                  <circle className="ring" cx="50%" cy="50%" r="240" />
                  <circle className="ring" cx="50%" cy="50%" r="260" />
                  <circle className="ring" cx="50%" cy="50%" r="280" />
                  <circle className="ring" cx="50%" cy="50%" r="300" />
                  <circle className="ring" cx="50%" cy="50%" r="320" />
                  <circle className="ring" cx="50%" cy="50%" r="340" />
                  <circle className="ring" cx="50%" cy="50%" r="360" />
                  <circle className="ring" cx="50%" cy="50%" r="380" />
                  <circle className="ring" cx="50%" cy="50%" r="400" />
                  <circle className="ring" cx="50%" cy="50%" r="420" />
                  <circle className="ring" cx="50%" cy="50%" r="440" />
                  <circle className="ring" cx="50%" cy="50%" r="460" />
                  <circle className="ring" cx="50%" cy="50%" r="480" />
                  <circle className="ring" cx="50%" cy="50%" r="500" />
                  <circle className="ring" cx="50%" cy="50%" r="520" />
                  <circle className="ring" cx="50%" cy="50%" r="540" />
                  <circle className="ring" cx="50%" cy="50%" r="560" />
                  <circle className="ring" cx="50%" cy="50%" r="580" />
                  <circle className="ring" cx="50%" cy="50%" r="600" />
                  <circle className="ring" cx="50%" cy="50%" r="620" />
                  <circle className="ring" cx="50%" cy="50%" r="640" />
                  <circle className="ring" cx="50%" cy="50%" r="660" />
                  <circle className="ring" cx="50%" cy="50%" r="680" />
                  <circle className="ring" cx="50%" cy="50%" r="700" />
                  <circle className="ring" cx="50%" cy="50%" r="720" />
                  <circle className="ring" cx="50%" cy="50%" r="740" />
                  <circle className="ring" cx="50%" cy="50%" r="760" />
                  <circle className="ring" cx="50%" cy="50%" r="780" />
                  <circle className="ring" cx="50%" cy="50%" r="800" />
                </g>
              </svg>
            </div>
          </header>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <ul className="flex gap-1 items-center">{renderTags()}</ul>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <IconMessage size={16} />
                  <span>{commentsLength}</span>
                </div>
                <div className="text-xs flex gap-1 items-center justify-center bg-green-900 border border-green-950 px-2 py-1 rounded-md">
                  <IconArrowUp size={16} />
                  <span>{upvotes}</span>
                </div>
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold tracking-wider">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </figure>
      </Box>
    </a>
  );
};

export default ProductCard;
