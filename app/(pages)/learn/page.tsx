'use client'
import { Textarea } from "@/components/ui/textarea"
import { faRightLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import useDebounce from "@/app/_hook/useDebounce"


export default function Translate() {
    const [translate, setTranslate] = useState('')
    const [translated, setTranslated] = useState('')
    const [language, setLanguage] = useState({ from: 'AutoDetected', to: 'ChoseLanguage' })
    const debounceTranslate = useDebounce(translate, 1000)

    return (
        <>
           <h1>hello world from learning</h1>
        </>
    )
}