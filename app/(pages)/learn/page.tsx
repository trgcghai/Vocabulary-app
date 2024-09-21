'use client'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
import { VocabularySet } from "@/app/types"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

export default function Translate() {
    const [name, setName] = useState('')
    const [listVocabularySet, setListVocabulary] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const createVocabularySet = async () => {
        const res = await fetch('http://localhost:3000/api/learn', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, createdAt: new Date() }),
        })
        if (!res.ok) return false
        return true
    }

    const handleSubmit = async () => {
        const res = await createVocabularySet()
        if (res) {
            router.replace('/learn')
        }
        setName('')
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth()).padStart(2, '0')
        const year = date.getFullYear()

        return day + '/' + month + '/' + year
    }

    useEffect(() => {
        const fetchVocabularySet = async () => {
            const res = await fetch('http://localhost:3000/api/learn', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                cache: 'force-cache'
            })
            if (!res.ok) return undefined
            const data = await res.json()
            setListVocabulary(data.data)

            setLoading(false)
        }
        fetchVocabularySet()
    }, [])

    return (
        <>
            <div className="py-4 text-2xl capitalize text-gray-700 font-bold">Your created set</div>
            <div className="py-4">
                <Dialog>
                    <DialogTrigger className="bg-blue-500 text-md py-2 text-white font-bold text-lg px-2 rounded-xl relative hover:bg-blue-500 hover:scale-105 active:scale-95">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Create new
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a new vocabulary set</DialogTitle>
                        </DialogHeader>
                        <div>
                            <label className="mb-2 block" htmlFor="">Vocabulary set name</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-end">
                            <DialogClose className="flex items-center gap-2 justify-end">
                                <Button variant={'outline'}>Cancel</Button>
                                <Button type="submit" onClick={(e) => {
                                    if (name.length == 0) {
                                        e.preventDefault()
                                        return
                                    }
                                    handleSubmit()
                                }}
                                    className="bg-blue-500 hover:bg-blue-500">
                                    Save
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="py-4 gap-4 grid grid-cols-12">
                {!loading ?
                    listVocabularySet && listVocabularySet.map((item: VocabularySet, index) => {
                        return (
                            <Card key={index} className="col-span-3 rounded-md border">
                                <CardHeader>
                                    <CardTitle>
                                        <Link href={'/learn/vocabularyset/' + item.id}>{item.name}</Link>
                                    </CardTitle>
                                    <CardDescription>Tạo ngày: {formatDate(item.createdAt.toString())}</CardDescription>
                                </CardHeader>
                            </Card>
                        )
                    })
                    :
                    <>
                        <Skeleton className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />
                        <Skeleton className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />
                        <Skeleton className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />
                        <Skeleton className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />
                        <Skeleton className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />
                        <Skeleton className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />
                        <Skeleton className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />
                        <Skeleton className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />
                    </>
                }
            </div>
        </>
    )
}