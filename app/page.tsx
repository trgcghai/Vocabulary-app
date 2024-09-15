'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { KeyboardEvent, useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WordData } from "./types"


export default function Home() {
  const [input, setInput] = useState('')
  const [word, setWord] = useState<WordData>()

  const fetchWord = async (word: string) => {
    const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!res) return undefined
    return res.json()
  }

  const handleSubmitSearch = async () => {
    if (!input) return

    const data = await fetchWord(input)
    if (data) setWord(data[0])
  }

  useEffect(() => {
    console.log(word)
    if (word?.meanings) {
      console.log(word.meanings)
    }
    if (word?.phonetics) {
      console.log(word.phonetics)
    }
  }, [word])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code != 'Enter') return
    handleSubmitSearch()
  }

  return (
    <>
      <div className="text-center text-4xl font-semibold text-blue-500 mt-32 mb-8">
        What are you looking for ?
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
      <div className="mt-16 flex items-center justify-center">
        {word ?
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle className="text-xl text-blue-500">{word.word.charAt(0).toUpperCase() + word.word.slice(1).toLowerCase()}</CardTitle>
              <CardDescription className="text-md text-black">{word.phonetics && word.phonetics.find((phonetic) => phonetic.text && phonetic.text != '')?.text}</CardDescription>
            </CardHeader>
            <CardContent>
              {word.meanings.map((mean, index) => {
                return (
                  <div className="mb-4" key={index}>
                    <p className="text-lg font-bold">{mean.partOfSpeech.charAt(0).toUpperCase() + mean.partOfSpeech.slice(1).toLowerCase()}</p>
                    <ul>
                      {mean.definitions.map((definition, index) => {
                        return <li className="mt-2" key={index}>
                          <p>- {definition.definition}</p>
                          {definition.example && <p>Eg: {definition.example}</p>}
                        </li>
                      })}
                    </ul>
                  </div>
                )
              })}
            </CardContent>
          </Card>
          :
          <Card className="max-w-3xl" style={{ width: '768px' }}>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-black">There is no word like that. Your typo might be wrong</CardTitle>
            </CardHeader>
          </Card>
        }
      </div>
    </>
  );
}
