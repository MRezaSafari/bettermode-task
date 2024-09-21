import { Box, Container } from "@bettermode/components";

const PostSkeleton = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full w-[72px] h-[72px] object-cover bg-coal-foreground animate-pulse"></div>
        <div className="rounded-full w-[30%] h-[20px] bg-coal-foreground animate-pulse"></div>
        <div className="rounded-full w-[60%] h-[15px] bg-coal-foreground animate-pulse"></div>
      </div>
      <section className="flex items-start gap-4 mt-4">
        <aside className="w-3/12 flex flex-col gap-4">
          <Box className="p-4 flex gap-3 flex-col">
            <div className="rounded-lg w-full h-[40px] bg-coal-foreground animate-pulse"></div>

            <div className="flex items-center gap-2">
              <div className="rounded-lg w-[50%] h-[40px] bg-coal-foreground animate-pulse"></div>
              <div className="rounded-lg w-[50%] h-[40px] bg-coal-foreground animate-pulse"></div>
            </div>
          </Box>

          <Box className="p-4 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="rounded-full w-[60%] h-[10px] bg-coal-foreground animate-pulse"></div>
              <div className="rounded-full w-[40%] h-[10px] bg-coal-foreground animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="rounded-full w-[60%] h-[10px] bg-coal-foreground animate-pulse"></div>
              <div className="rounded-full w-[40%] h-[10px] bg-coal-foreground animate-pulse"></div>
            </div>

            <ul className="flex gap-2 items-center">
              <div className="rounded-full w-full h-[15px] bg-coal-foreground animate-pulse"></div>
              <div className="rounded-full w-full h-[15px] bg-coal-foreground animate-pulse"></div>
            </ul>
          </Box>
        </aside>
        <div className="w-9/12">
          <Box className="p-4 flex gap-5 flex-col">
            <div className="rounded-sm w-full h-[150px] bg-coal-foreground animate-pulse"></div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md w-full h-[300px] bg-coal-foreground animate-pulse"></div>
              <div className="rounded-md w-full h-[300px] bg-coal-foreground animate-pulse"></div>
            </div>
          </Box>
        </div>
      </section>
    </Container>
  );
};

export default PostSkeleton;
