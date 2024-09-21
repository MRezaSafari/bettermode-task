import {
  Box,
  Button,
  Container,
  PostSkeleton,
  ReactionButton,
  Tag,
} from "@bettermode/components";
import { IPostNode } from "@bettermode/models";
import { usePost } from "@bettermode/queries";
import { extractIdFromSlug, extractPostImageUrl } from "@bettermode/utilities";
import { IconCalendar, IconShare } from "@tabler/icons-react";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

interface IProps {
  post?: IPostNode;
}

const PostPage: FC<IProps> = ({ post }) => {
  const [postData, setPostData] = useState(post);
  const { fetchPost, loading } = usePost();
  const { slug } = useParams();

  useEffect(() => {
    if (slug && !import.meta.env.SSR) {
      const postId = extractIdFromSlug(slug);
      console.log(slug);
      fetchPost({
        variables: {
          id: postId,
        },
        onCompleted: (data) => {
          setPostData(data.post);
        },
      });
    }
  }, [slug]);

  if (loading && !import.meta.env.SSR) return <PostSkeleton />;

  if (!postData) {
    return null;
  }

  const getFieldValue = (fieldKey: string) => {
    const field = postData.fields.find((x) => x.key === fieldKey);

    if (!field) return null;

    return JSON.parse(field.value);
  };

  const renderScreenshots = () => {
    const shots = postData.fields.find((f) => f.key === "screenshots")
      ?.relationEntities?.medias;

    if (shots) {
      return shots.map((shot) => {
        return (
          <img
            key={shot.id}
            src={shot.url}
            width={shot.width}
            height={shot.height}
            alt={shot.name}
            className="object-cover rounded-lg"
          />
        );
      });
    }

    return null;
  };

  const renderTags = () =>
    postData.tags?.map((tag) => <Tag key={tag.id} title={tag.title} />);

  return (
    <Container>
      <Helmet>
        <title>{postData.title}</title>
      </Helmet>
      <div className="flex flex-col items-center gap-3">
        <img
          src={extractPostImageUrl(
            postData.fields.find((f) => f.key === "product_icon")?.value
          )}
          alt={postData.title}
          width={72}
          height={72}
          className="rounded-full w-[72px] h-[72px] object-cover"
        />
        <h2 className="text-3xl font-bold tracking-wider">{postData.title}</h2>
        <p>{postData.description}</p>
      </div>
      <section className="flex items-start flex-col md:flex-row gap-4 mt-4">
        <aside className="w-full order-2 md:order-1 md:w-3/12 flex flex-col gap-4">
          <Box className="p-4 flex gap-3 flex-col">
            <Button
              as="link"
              to={getFieldValue("url_of_product")}
              className="w-full"
              size="sm"
            >
              Visit Website
            </Button>

            <div className="flex items-center gap-2">
              <ReactionButton
                postId={postData.id}
                hasReacted={postData.reactions?.[0]?.reacted}
                variant="full"
              />
              <Button
                className="w-2/4 flex items-center gap-2"
                size="sm"
                variant="mute"
              >
                <IconShare size={20} />
                <span>Share</span>
              </Button>
            </div>
          </Box>

          <Box className="p-4 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm">Launched Date</p>
              <p className="flex gap-2 items-center text-sm">
                <IconCalendar size={16} />
                {dayjs(getFieldValue("launched_date")).format("ddd, MMM DD")}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm">Launched In</p>
              <p className="flex text-sm">{getFieldValue("launched_in")}</p>
            </div>

            <ul className="flex gap-2 items-center">{renderTags()}</ul>
          </Box>
        </aside>
        <div className="w-full order-1 md:order-2 md:w-9/12">
          <Box className="p-4 flex gap-5 flex-col">
            <p
              dangerouslySetInnerHTML={{
                __html: JSON.parse(
                  postData.fields.find((f) => f.key === "full_description")
                    ?.value ?? ""
                ),
              }}
            ></p>

            <div className="grid grid-cols-2 gap-3">{renderScreenshots()}</div>
          </Box>
        </div>
      </section>
    </Container>
  );
};

export default PostPage;
