import { ITag } from "@bettermode/models";
import { extractPostImageUrl } from "@bettermode/utilities";
import { IconMessage } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, ReactionButton, Tag } from "..";

interface Props {
  id: string;
  name: string;
  description: string;
  image?: string;
  tags: ITag[];
  commentsLength: number;
  upvotes: number;
  slug: string;
  reacted?: boolean;
}

const ProductCard: FC<Props> = ({
  commentsLength,
  description,
  id,
  image,
  name,
  slug,
  tags,
  reacted,
  upvotes,
}) => {
  const renderTags = () =>
    tags.map((tag) => <Tag key={tag.id} title={tag.title} />);

  return (
    <Link
      to={`/products/post/${slug}-${id}`}
      className="block hover:scale-105 transition duration-500 ease-in-out product-card__container "
    >
      <Box>
        <figure>
          <header className=" w-full flex justify-center border-b border-b-coal-border p-4 overflow-hidden relative">
            <img
              src={extractPostImageUrl(image)}
              alt={name}
              width={72}
              height={72}
              className="rounded-full w-[72px] h-[72px] object-cover"
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
                <ReactionButton
                  postId={id}
                  hasReacted={reacted ?? false}
                  variant="mini"
                  totalReactions={upvotes}
                />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold tracking-wider">{name}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{description}</p>
          </div>
        </figure>
      </Box>
    </Link>
  );
};

export default ProductCard;
