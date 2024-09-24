import { VocabularySet } from "@/app/types"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { faEllipsisVertical, faTrashCan, faWrench } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction } from "react"
import styles from '@/app/styles/style.module.css'

const ListVocabularySet = (
    { listVocabularySet, nameUpdate, setNameUpdate, handleDelete, handleUpdate }
        :
        {
            listVocabularySet: VocabularySet[],
            nameUpdate: string,
            setNameUpdate: Dispatch<SetStateAction<string>>
            handleDelete: (id: string) => Promise<void>,
            handleUpdate: (id: string) => Promise<void>,
        }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth()).padStart(2, '0')
        const year = date.getFullYear()

        return day + '/' + month + '/' + year
    }

    return (
        <>
            {listVocabularySet && listVocabularySet.map((item: VocabularySet, index) => {
                return (
                    <Card key={index} className="col-span-3 rounded-md border">
                        <CardHeader className="p-4 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>
                                    <Link className="hover:text-blue-500" href={'/learn/vocabularyset/' + item.id}>{item.name}</Link>
                                </CardTitle>
                                <CardDescription className="pt-2">Created date: {formatDate(item.createdAt.toString())}</CardDescription>
                            </div>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <FontAwesomeIcon className="cursor-pointer hover:text-blue-500" icon={faEllipsisVertical} />
                                </HoverCardTrigger>
                                <HoverCardContent className="p-0">
                                    <div className="cursor-pointer hover:bg-gray-200">
                                        <Dialog>
                                            <DialogTrigger className={`${styles.hoverPopup} flex items-center gap-4 p-2`} onClick={() => setNameUpdate(item.name)}>
                                                <FontAwesomeIcon icon={faWrench} className={`${styles.popUpIcon} w-4`} />
                                                Change name vocabulary set
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Change name your vocabulary set</DialogTitle>
                                                </DialogHeader>
                                                <div>
                                                    <label className="mb-2 block" htmlFor="">Vocabulary set name</label>
                                                    <Input
                                                        value={nameUpdate}
                                                        onChange={(e) => setNameUpdate(e.target.value)} />
                                                </div>
                                                <div className="flex items-center justify-end">
                                                    <DialogClose className="flex items-center gap-2 justify-end">
                                                        <Button variant={'outline'}>Cancel</Button>
                                                        <Button type="submit" onClick={(e) => {
                                                            if (nameUpdate.length == 0) {
                                                                e.preventDefault()
                                                                return
                                                            }
                                                            handleUpdate(item.id)
                                                        }}
                                                            className="bg-blue-500 hover:bg-blue-500">
                                                            Save
                                                        </Button>
                                                    </DialogClose>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div className="cursor-pointer hover:bg-gray-200">
                                        <AlertDialog>
                                            <AlertDialogTrigger className={`${styles.hoverPopup} flex items-center gap-4 p-2`}>
                                                <FontAwesomeIcon icon={faTrashCan} className={`${styles.popUpIcon} w-4`} />
                                                Delete vocabulary set
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Do you really want to delete the {item.name} set?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your vocabulary set
                                                        from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-blue-500 hover:bg-blue-500" onClick={() => handleDelete(item.id)}>Confirm</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </CardHeader>
                    </Card>
                )
            })}
        </>
    )
}

export default ListVocabularySet