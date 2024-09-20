import Box from "../box";

const ProductCardSkeleton = () => {
  return (
    <Box>
      <figure className="w-full">
        <header className=" w-full flex justify-center border-b border-b-coal-border p-4 overflow-hidden relative">
          <div className="rounded-full w-[72px] h-[72px] object-cover bg-coal-foreground animate-pulse"></div>
        </header>
        <div className="p-4 w-full">
          <div className="flex justify-between items-center w-full">
            <ul className="flex gap-1 items-center">
              <div className="rounded-full w-[80%] h-[4px] bg-blue-400 animate-pulse"></div>
            </ul>
            <div className="rounded-full w-full h-[25px] bg-coal-foreground animate-pulse"></div>
          </div>
          <h3 className="mt-4 text-xl font-bold tracking-wider w-full">
            <div className="rounded-full w-[50%] h-[17px] bg-coal-foreground animate-pulse"></div>
          </h3>
          <div className="mt-3">
            <div className="rounded-full w-[80%] h-[14px] bg-coal-foreground animate-pulse"></div>
          </div>
        </div>
      </figure>
    </Box>
  );
};

export default ProductCardSkeleton;
