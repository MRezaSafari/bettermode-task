import {
  Box,
  Button,
  Container,
  HoverBorderGradient,
  ProductCard,
  ProductCardSkeleton,
} from "@bettermode/components";
import { IPostsData } from "@bettermode/models";
import { useLazyGetPosts } from "@bettermode/queries";
import { IconArrowRight, IconHeart } from "@tabler/icons-react";
import { FC, useEffect } from "react";

interface IProps {
  posts?: IPostsData;
}

const HomePage: FC<IProps> = ({ posts }) => {
  const { fetchPosts, data, loading, loadMorePosts } = useLazyGetPosts(posts);

  useEffect(() => {
    if (!import.meta.env.SSR && !posts?.posts) {
      fetchPosts({
        variables: {
          limit: 6,
          postTypeIds: ["DWq1nJxcUBfmFp3"],
          orderByString: "publishedAt",
          reverse: false,
          filterBy: [],
        },
      });
    }
  }, []);

  const renderProducts = () => {
    return data?.posts?.nodes?.map((post) => (
      <ProductCard
        key={post.id}
        id={post.id}
        name={post.title}
        description={post.description}
        commentsLength={post.totalRepliesCount}
        slug={post.slug}
        tags={post.tags}
        upvotes={post.reactionsCount}
        image={post?.fields.find((f) => f.key === "product_icon")?.value}
        reacted={post.reactions?.[0]?.reacted}
      />
    ));
  };

  const renderSkeletons = () => (
    <>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </>
  );

  return (
    <Container>
      <main className="flex flex-col md:flex-row items-start gap-4 mt-4">
        <div className="w-full md:w-9/12">
          <h1 className="text-white text-2xl mb-4">
            Today Top Products Launching
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {renderProducts()}
            {loading && renderSkeletons()}
          </div>

          <div className="mt-10 flex justify-center text-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              onClick={loadMorePosts}
              className=" bg-coal-foreground text-sm text-black dark:text-white flex items-center space-x-2"
            >
              <span>Show More ...</span>
            </HoverBorderGradient>
          </div>
        </div>
        <aside className="w-full md:w-3/12 flex flex-col gap-4">
          <div>
            <h2 className="text-white text-md mb-6 font-thin">
              LATEST STORIES
            </h2>

            <Box className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs">Entertainment with X.com!</p>
                <div className="flex items-center gap-2">
                  <IconHeart size={16} fill="#f00" stroke={0} />
                  <span className="text-sm">33</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs">
                  Dive into the Rhythm of Stories on Spotify!
                </p>
                <div className="flex items-center gap-2">
                  <IconHeart size={16} />
                  <span className="text-sm">25</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs">
                  Welcome to the Future of Intelligence with Google AI!
                </p>
                <div className="flex items-center gap-2">
                  <IconHeart size={16} />
                  <span className="text-sm">88</span>
                </div>
              </div>
            </Box>
          </div>
          <div>
            <Box className="p-4 flex flex-col gap-4">
              <h3 className="text-2xl font-bold">Launching soon?</h3>
              <p className="text-sm">
                Learn everything you need to know about launching on BetterHunt
                🚀
              </p>
              <Button
                variant="default"
                className="max-w-fit text-sm flex items-center gap-2"
              >
                <span>Read the guide</span>
                <IconArrowRight size={16} />
              </Button>
            </Box>
          </div>
        </aside>
      </main>
    </Container>
  );
};

export default HomePage;
