import { ReloadIcon } from "@radix-ui/react-icons";

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <ReloadIcon className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default PageLoading;
