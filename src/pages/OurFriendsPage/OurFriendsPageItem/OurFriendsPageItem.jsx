import { useState } from 'react'
import EllipsisText from 'react-ellipsis-text'
import scss from './our-friends-page-item.module.scss'
import OurFriendsPageItemPopup from './OurFriendsPageItemPopup/OurFriendsPageItemPopup'
import defaultImg from '../../../images/default_logo_friends.jpg'
import { useTranslation } from 'react-i18next'

const OurFriendsPageItem = ({
    title,
    url,
    start,
    end,
    address,
    addressUrl,
    email,
    phone,
    foto,
    workDays,
    day,
}) => {
    const [popupActive, setPopupActive] = useState(false)
    const { t } = useTranslation()
    const closeModal = () => {
        if (popupActive) {
            setPopupActive(false)
        }
    }

    const normalTime = start !== '------------'
    const normalEmail = email !== '-------------------------'
    const normalAddress = address !== '-------------------------'
    const normalPhone = phone !== '--------------------------'
    const phoneLink = `tel:${phone}`
    const normalFoto = foto !== null

    function handleTime() {
        if (!normalTime) {
            return
        }

        const startTime = start.split(':')
        const secondsStart = startTime[0] * 60 * 60 + startTime[1] * 60

        const endTime = end.split(':')
        const secondsEnd = endTime[0] * 60 * 60 + endTime[1] * 60
        const timeNow = new Date()
        const nowH = String(timeNow).slice(16, 18)
        const nowM = String(timeNow).slice(19, 21)
        const nowS = String(timeNow).slice(22, 24)
        const secondsNow = nowH * 60 * 60 + nowM * 60 + Number(nowS)
        return secondsNow >= secondsStart && secondsNow <= secondsEnd
            ? t('OurFriendsPage.popup.open')
            : t('OurFriendsPage.popup.close')
    }

    return (
        <li className={scss.card_item} onClick={closeModal}>
            <a
                href={url}
                className={scss.card_title}
                target="_blank"
                rel="noreferrer"
            >
                {title}
            </a>
            <div className={scss.wrapper}>
                <div className={scss.space}>
                    {normalFoto && (
                        <img
                            className={scss.item_image}
                            src={foto}
                            alt={`foto of ${title}`}
                        />
                    )}
                    {!normalFoto && (
                        <img
                            className={scss.item_image}
                            src={defaultImg}
                            alt={`foto of ${title}`}
                        />
                    )}
                </div>
                <div className={scss.content_wraper}>
                    <div
                        className={scss.orient_popup}
                        onClick={() => {
                            normalTime
                                ? setPopupActive(!popupActive)
                                : setPopupActive(popupActive)
                        }}
                    >
                        <p>
                            {t('OurFriendsPage.cardsTitle.time')}: <br />
                            {normalTime && (
                                <span
                                    onClick={() => {
                                        setPopupActive(!popupActive)
                                    }}
                                >
                                    {start}-{end} ( {handleTime()} )
                                </span>
                            )}
                            {!normalTime && (
                                <span className={scss.empty_data}>
                                    {start}-{end}
                                </span>
                            )}
                        </p>
                        <OurFriendsPageItemPopup
                            active={popupActive}
                            setActive={setPopupActive}
                            workDays={workDays}
                            day={day}
                        />
                    </div>

                    <p>
                        {t('OurFriendsPage.cardsTitle.address')}: <br />
                        {normalAddress && (
                            <a
                                href={addressUrl}
                                className={scss.underline}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <EllipsisText
                                    text={address}
                                    tooltip={address}
                                    length={Number(`25`)}
                                />
                            </a>
                        )}
                        {!normalAddress && (
                            <span className={scss.empty_data}>{address}</span>
                        )}
                    </p>

                    <p className={scss.mar}>
                        {t('OurFriendsPage.cardsTitle.email')}: <br />
                        {normalEmail && (
                            <a href={`mailto: ${email}`}>
                                <EllipsisText
                                    text={email}
                                    tooltip={email}
                                    length={Number('25')}
                                />
                            </a>
                        )}
                        {!normalEmail && (
                            <span className={scss.empty_data}>{email}</span>
                        )}
                    </p>

                    <p className={scss.mar}>
                        {t('OurFriendsPage.cardsTitle.phone')}:
                        <br />
                        {normalPhone && <a href={phoneLink}>{phone}</a>}
                        {!normalPhone && (
                            <span className={scss.empty_data}>{phone}</span>
                        )}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default OurFriendsPageItem
