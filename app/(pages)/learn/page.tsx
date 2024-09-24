'use client'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import useSWR, { mutate } from "swr"
import ListVocabularySet from "./ListVocabularySet"

export default function Translate() {
    const [name, setName] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')

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

    const deleteVocabularySet = async (id: string) => {
        const res = await fetch('http://localhost:3000/api/learn', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id }),
        })
        if (!res.ok) return false
        return true
    }

    const updateVocabulary = async (id: string) => {
        const res = await fetch('http://localhost:3000/api/learn', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id, name: nameUpdate })
        })
        if (!res.ok) return false
        return true
    }

    const handleSubmit = async () => {
        await createVocabularySet()
        mutate('http://localhost:3000/api/learn')
        setName('')
    }

    const handleUpdate = async (id: string) => {
        const res = await updateVocabulary(id)
        if (res) {
            mutate('http://localhost:3000/api/learn')
        }
    }

    const handleDelete = async (id: string) => {
        const res = await deleteVocabularySet(id)
        if (res) {
            mutate('http://localhost:3000/api/learn')
        }
    }

    const fetcher = (url: string) => fetch(url).then(res => res.json())

    const { data, isLoading } = useSWR('http://localhost:3000/api/learn', fetcher)

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
                {!isLoading ?
                    <ListVocabularySet
                        listVocabularySet={data.data}
                        nameUpdate={nameUpdate}
                        setNameUpdate={setNameUpdate}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                    :
                    <>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                            return (<Skeleton key={item * index} className="rounded-md h-[90px] w-[370px] col-span-3 bg-gray-200" />)
                        })}
                    </>
                }
            </div>
        </>
    )
}