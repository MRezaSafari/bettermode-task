import {
  Box,
  Container,
  HoverBorderGradient,
  ProductCard,
} from "@bettermode/components";

const HomePage = () => {
  return (
    <Container>
      <main className="flex items-start gap-4 mt-4">
        <div className="w-9/12">
          <h1 className="text-white text-2xl mb-4">
            Today Top Products Launching
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <ProductCard
              name="PitchBob.io"
              description="AI pitch deck generator & startup co-pilot"
              commentsLength={3}
              slug="pitchbob-io-pKusaYXmgoi7kgk"
              tags={["ai", "startup", "copilot"]}
              upvotes={32}
              image="https://tribe-s3-production.imgix.net/MiTv3KnR98rDolYBuL4tK?fit=max&w=2000&auto=compress,format"
            />
            <ProductCard
              name="PitchBob.io"
              description="AI pitch deck generator & startup co-pilot"
              commentsLength={3}
              slug="pitchbob-io-pKusaYXmgoi7kgk"
              tags={["ai", "startup", "copilot"]}
              upvotes={32}
              image="https://tribe-s3-production.imgix.net/MiTv3KnR98rDolYBuL4tK?fit=max&w=2000&auto=compress,format"
            />
            <ProductCard
              name="PitchBob.io"
              description="AI pitch deck generator & startup co-pilot"
              commentsLength={3}
              slug="pitchbob-io-pKusaYXmgoi7kgk"
              tags={["ai", "startup", "copilot"]}
              upvotes={32}
              image="https://tribe-s3-production.imgix.net/MiTv3KnR98rDolYBuL4tK?fit=max&w=2000&auto=compress,format"
            />
            <ProductCard
              name="PitchBob.io"
              description="AI pitch deck generator & startup co-pilot"
              commentsLength={3}
              slug="pitchbob-io-pKusaYXmgoi7kgk"
              tags={["ai", "startup", "copilot"]}
              upvotes={32}
              image="https://tribe-s3-production.imgix.net/MiTv3KnR98rDolYBuL4tK?fit=max&w=2000&auto=compress,format"
            />
            <ProductCard
              name="PitchBob.io"
              description="AI pitch deck generator & startup co-pilot"
              commentsLength={3}
              slug="pitchbob-io-pKusaYXmgoi7kgk"
              tags={["ai", "startup", "copilot"]}
              upvotes={32}
              image="https://tribe-s3-production.imgix.net/MiTv3KnR98rDolYBuL4tK?fit=max&w=2000&auto=compress,format"
            />
            <ProductCard
              name="PitchBob.io"
              description="AI pitch deck generator & startup co-pilot"
              commentsLength={3}
              slug="pitchbob-io-pKusaYXmgoi7kgk"
              tags={["ai", "startup", "copilot"]}
              upvotes={32}
              image="https://tribe-s3-production.imgix.net/MiTv3KnR98rDolYBuL4tK?fit=max&w=2000&auto=compress,format"
            />
          </div>

          <div className="mt-10 flex justify-center text-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className=" bg-coal-foreground text-sm text-black dark:text-white flex items-center space-x-2"
            >
              <span>Show More ...</span>
            </HoverBorderGradient>
          </div>
        </div>
        <aside className="w-3/12">
          <h2 className="text-white text-md mb-6 font-thin">
            Today Top Products Launching
          </h2>

          <Box>Hello</Box>
        </aside>
      </main>
    </Container>
  );
};

export default HomePage;
