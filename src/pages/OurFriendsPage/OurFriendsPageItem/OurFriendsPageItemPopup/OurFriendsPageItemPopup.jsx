import scss from './our-friends-page-item-popup.module.scss'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const OurFriendsPageItemPopup = ({ active, setActive, workDays, day }) => {
    const { t, ready } = useTranslation()

    useEffect(() => {
        if (!ready) return 'loading translations...'
    }, [ready])

    const arrayOfDays = t('OurFriendsPage', { returnObjects: true })
    return (
        <div
            className={active ? `${scss.popup} ${scss.activ}` : `${scss.popup}`}
            onClick={() => setActive(!active)}
        >
            <ul
                className={scss.popup_content}
                onClick={e => e.stopPropagation()}
            >
                {arrayOfDays.popup.days.map((el, i) => (
                    <li
                        key={i}
                        className={
                            day === i
                                ? `${scss.targetDay} ${scss.day_item}`
                                : scss.day_item
                        }
                    >
                        <div className={scss.day_wrap}>
                            <div className={scss.day_date}>{el}</div>
                            <div className={scss.day_time}>
                                {workDays?.[i].from}-{workDays?.[i].to}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default OurFriendsPageItemPopup
