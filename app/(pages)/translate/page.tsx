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

    const handleSwapLang = () => {
        const { from, to } = language
        if (from == 'AutoDetected' || to == 'ChoseLanguage') return
        setLanguage({ ...language, from: to, to: from })
    }

    const fetchTranslate = async (text: string) => {
        const res = await fetch('http://localhost:3000/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text.trim(), from: language.from, to: language.to })
        })
        if (!res.ok) return undefined
        return res.json()
    }

    useEffect(() => {
        const translate = async () => {
            if (debounceTranslate.length == 0) {
                setTranslated('')
                return
            }
            if (language.to == 'ChoseLanguage') return
            const data = await fetchTranslate(debounceTranslate)
            setTranslated(data.data.data.translations.translatedText)
        }
        translate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceTranslate])


    return (
        <>
            <div className="flex justify-center gap-6 mt-20">
                <div className="w-1/3">
                    <Select value={language.from} onValueChange={(e) => {
                        setLanguage({ ...language, from: e })
                    }}>
                        <SelectTrigger className="w-full mb-4">
                            <SelectValue placeholder="Tự phát hiện" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="AutoDetected">Tự phát hiện</SelectItem>
                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                            <SelectItem value="en">Tiếng Anh</SelectItem>
                            <SelectItem value="de">Tiếng Đức</SelectItem>
                            <SelectItem value="ja">Tiếng Nhật</SelectItem>
                        </SelectContent>
                    </Select>
                    <Textarea style={{ height: '700px' }} value={translate} onChange={(e) => setTranslate(e.target.value)}/>
                </div>
                <div className="mt-2">
                    <div className="cursor-pointer" onClick={handleSwapLang}>
                        <FontAwesomeIcon icon={faRightLeft} />
                    </div>
                </div>
                <div className="w-1/3">
                    <Select value={language.to} onValueChange={(e) => {
                        setLanguage({ ...language, to: e })
                    }}>
                        <SelectTrigger className="w-full mb-4">
                            <SelectValue placeholder="Chọn ngôn ngữ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ChoseLanguage">Chọn ngôn ngữ</SelectItem>
                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                            <SelectItem value="en">Tiếng Anh</SelectItem>
                            <SelectItem value="de">Tiếng Đức</SelectItem>
                            <SelectItem value="ja">Tiếng Nhật</SelectItem>
                        </SelectContent>
                    </Select>
                    <Textarea style={{ height: '700px' }} value={translated} onChange={(e) => setTranslated(e.target.value)} />
                </div>
            </div>
        </>
    )
}