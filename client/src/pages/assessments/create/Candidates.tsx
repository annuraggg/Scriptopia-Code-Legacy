import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import papa from "papaparse";

const Candidates = ({
  candidates,
  setCandidates,
  access,
  setAccess,
}: {
  candidates: { name: string; email: string }[];
  setCandidates: (candidates: { name: string; email: string }[]) => void;
  access: string;
  setAccess: (access: string) => void;
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

  const [importOpen, setImportOpen] = useState<boolean>(false);

  const add = () => {
    if (name === "" || email === "") {
      toast.error("Name and email are required");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Invalid email address");
      return;
    }
    if (candidates.find((c) => c.email === email)) {
      toast.error("Candidate with this email already exists");
      return;
    }

    setCandidates([...candidates, { name, email }]);
    setName("");
    setEmail("");
  };

  const parseCSV = () => {
    if (!file) {
      return;
    }

    // @ts-expect-error - file is not null
    papa.parse(file, {
      header: false,
      complete: (result: { data: [][]; errors: [] }) => {
        const data: string[][] = result.data;

        if (data.length === 0) {
          toast.error("No data found in the file");
          return;
        }

        const candidates = data.map((c) => ({
          name: c[0],
          email: c[1],
        }));

        setCandidates(candidates);
        setImportOpen(false);
      },
    });
  };

  const exportAsCSV = () => {
    const csv = papa.unparse(candidates.map((c) => [c.name, c.email]));
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "candidates.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col px-48 items-center">
      <div className="self-start mt-5">
        <h2>Candidates</h2>
        <p>Invite candidates to take the screening</p>
      </div>
      <div className="flex gap-5 w-full mt-5 justify-start items-start">
        <div className="flex items-center gap-5">
          <div className="flex gap-3">
            <Select value={access} onValueChange={setAccess}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  Allow Access to All Candidates
                </SelectItem>
                <SelectItem value="selected">
                  Allow Access to Candidates
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {access === "selected" && (
            <>
              <Dialog open={importOpen} onOpenChange={setImportOpen}>
                <DialogTrigger asChild>
                  <Button>Import CSV</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import CSV</DialogTitle>
                    <DialogDescription>
                      <div className="mt-2">
                        The CSV should contain columns for name and email ONLY
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-center gap-5">
                    <Input
                      type="file"
                      className="mt-10 cursor-pointer"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: any) => setFile(e.target.files[0])}
                    />
                    <Button
                      className="btn-primary mt-10"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={parseCSV}
                    >
                      Import
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button onClick={exportAsCSV}>Export as CSV</Button>
            </>
          )}
        </div>
        {access === "selected" && (
          <div className="flex gap-5 items-end">
            <div>
              <Input
                placeholder="Enter name"
                className="w-[500px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Enter email address"
                className="w-[500px] mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="btn-primary" onClick={add}>
              Add
            </Button>
          </div>
        )}
      </div>

      <Separator className="my-5" />

      {access === "selected" ? (
        candidates.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sr No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>
                    <Button
                      className="btn-primary"
                      variant="link"
                      onClick={() => {
                        setCandidates(
                          candidates.filter((c) => c.email !== candidate.email)
                        );
                      }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center mt-5">
            <p>No candidates added yet</p>
          </div>
        )
      ) : (
        <div className="text-center mt-5">
          <p>Access to all candidates is allowed</p>
        </div>
      )}
    </div>
  );
};

export default Candidates;
