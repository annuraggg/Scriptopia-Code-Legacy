import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ReloadIcon } from "@radix-ui/react-icons";

const Explain = ({
  open,
  setOpen,
  code,
  responseStr,
  loading,
  err,
}: {
  open: boolean;
  setOpen: Function;
  code: string;
  responseStr: string;
  loading: boolean;
  err: boolean;
}) => {
  return (
    console.log(code),
    (
      <Sheet open={open} onOpenChange={(e) => setOpen(e)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Explaination</SheetTitle>
            {loading ? (
              <SheetDescription className="flex items-center justify-center">
                <ReloadIcon className="w-6 h-6 text-gray-500 animate-spin mt-10" />
              </SheetDescription>
            ) : err ? (
              <SheetDescription>
                <p className="text-red-500 text-center mt-5 text-md font-bold">
                  Something went wrong!
                </p>
              </SheetDescription>
            ) : (
              <SheetDescription>
                <div className="overflow-y-auto h-[90vh]">
                  <div className="bg-secondary p-5">
                    <pre>{code}</pre>
                  </div>
                  <div className="mt-5">{responseStr}</div>
                </div>
              </SheetDescription>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
  );
};

export default Explain;
