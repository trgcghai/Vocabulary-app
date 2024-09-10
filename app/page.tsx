'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { KeyboardEvent, useState } from "react"

export default function Home() {
  const [input, setInput] = useState('')
  const handleSubmitSearch = async () => {
    if (!input) return

    const res = await fetch('http://localhost:3000/api/vocabularies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: input })
    })
    const data = await res.json()
    console.log(data)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code != 'Enter') return
    handleSubmitSearch()
  }

  return (
    <>
      <div className="text-center text-4xl font-semibold text-blue-500 mt-32 mb-8">
        What word are you looking for ?
      </div>
      <div className="w-1/2 mx-auto flex gap-4 items-center">
        <Input
          type="text"
          placeholder="Searching..."
          className="py-6 px-5 rounded-xl text-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button
          type="submit"
          className="bg-blue-500 text-lg py-6 rounded-xl relative hover:bg-blue-500 hover:scale-105 active:scale-95"
          onClick={handleSubmitSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
          Search
        </Button>
      </div>
    </>
  );
}
