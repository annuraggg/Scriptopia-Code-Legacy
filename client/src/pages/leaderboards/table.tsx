import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableCaption,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const table = () => {
    return (
        <div className='flex justify-center mt-20 ml-52 mr-52'>
            <Table className='bg-secondary rounded-sm'>
                <TableCaption>Top Performers.</TableCaption>
                <TableHeader>
                    <TableRow className='ml-2'>
                        <TableHead className="font-bold text">No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Course completed</TableHead>
                        <TableHead>Interviews Done</TableHead>
                        <TableHead>Average grade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell><Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        </TableCell>
                        <TableCell>Kaka chichi</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell className="">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default table