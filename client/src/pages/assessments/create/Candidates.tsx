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

const Candidates = () => {

  return (
    <div className="flex flex-col px-48 items-center">
      <div className="self-start mt-5">
        <h2>Candidates</h2>
        <p>Invite candidates to take the screening</p>
      </div>
      <div className="flex gap-5 w-full mt-5 justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  Allow Access to All Candidates
                </SelectItem>
                <SelectItem value="selected">
                  Allow Access to Selected Candidates
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button>Import CSV</Button>
          <Button>Export as CSV</Button>
        </div>
        <div className="flex gap-5 items-center">
          <Input placeholder="Enter email address" className="w-[500px]" />
          <Button className="btn-primary">Add</Button>
        </div>
      </div>

      <Separator className="my-5" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">01</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/*} <div className="mt-5 flex gap-5 absolute right-10 bottom-10">
        <Button className="btn-primary" onClick={() => nextTab("general")}>
          Back
        </Button>

        <Button className="btn-primary" onClick={() => nextTab("candidates")}>
          Next
      </Button>
      </div> {*/}
      
    </div>
  );
};

export default Candidates;
