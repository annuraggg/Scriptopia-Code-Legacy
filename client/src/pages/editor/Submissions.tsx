import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Submission {
  _id: string;
  problemID: string;
  userID: string;
  code: string;
  language: string;
  status: string;
  output: Record<string, string>;
}

const Submissions = ({ submissions }: { submissions: Submission[] }) => {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const deleteSubmission = () => {
    // delete submission
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-secondary rounded-t-lg sticky pt-5 pb-2 px-7 text-gray-400">
        <p>Your Submissions</p>
      </div>
      <div className=" overflow-y-auto h-[78vh] w-full bg-secondary rounded-b-lg">
        <div className="flex flex-col gap-1 p-5">
          {submissions?.map((submission, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 rounded-lg border bg-background"
            >
              <div className="flex gap-5">
                <p className="text-gray-300">Submission {i + 1}</p>
                <p className="text-gray-300">{submission?.status}</p>
              </div>
              <div className="flex">
                <Button
                  variant="link"
                  className="text-gray-300"
                  onClick={() => navigate(`/submission/${submission?._id}`)}
                >
                  View
                </Button>
                <Button
                  variant="link"
                  className="text-gray-300"
                  onClick={() => {
                    setDeleteID(submission?._id);
                    setDeleteOpen(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteSubmission}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Submissions;
