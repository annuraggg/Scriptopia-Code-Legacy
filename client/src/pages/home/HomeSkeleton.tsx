import { Skeleton } from "@/components/Skeleton";
import { Navbar } from "@/components/ui/navbar";

const HomeSkeleton = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Skeleton className="w-1/2 h-screen" />
      </div>
    </>
  );
};

export default HomeSkeleton;
