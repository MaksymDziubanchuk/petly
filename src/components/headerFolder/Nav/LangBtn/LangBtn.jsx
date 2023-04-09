import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import style from './lang-btn.module.scss'

export default function LangBtn() {
    const [en, setEn] = useState(true)
    const [ua, setUa] = useState(false)

    const { i18n } = useTranslation()

    useEffect(() => {
        if (i18n.language === 'en') {
            setEn(true)
            setUa(false)
        }
        if (i18n.language === 'ua') {
            setUa(true)
            setEn(false)
        }
    }, [i18n.language])

    const handleClick = language => {
        i18n.changeLanguage(language)
        if (i18n.language === 'en') {
            setEn(true)
        }
        if (i18n.language === 'ua') {
            setUa(true)
        }
    }

    return (
        <div className={style.wrap_btn}>
            <button
                type="button"
                className={style.lang_btn}
                style={{ color: en === true ? '#F59256' : 'var(--text-color)' }}
                onClick={() => handleClick('en')}
            >
                EN
            </button>
            <button
                type="button"
                className={style.lang_btn}
                style={{ color: ua === true ? '#F59256' : 'var(--text-color)' }}
                onClick={() => handleClick('ua')}
            >
                UA
            </button>
        </div>
    )
}
