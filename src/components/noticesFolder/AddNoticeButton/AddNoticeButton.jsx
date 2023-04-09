import { useState } from 'react'
import scss from './add-notice-button.module.scss'
import SvgInsert from 'components/utilsFolder/Svg/Svg'
import ModalAddNotice from 'components/noticesFolder/ModalAddNotice/ModalAddNotice'
import useAuth from 'redux/utils/useAuth'
import AddsNoticeContent from 'components/noticesFolder/ModalAddNotice/ModalAddNoticeForm/AddsNoticeContent'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { useTranslation } from 'react-i18next'

const AddNoticeButton = () => {
    const [modalShow, setModalShow] = useState(false)
    const isLogin = useAuth()

    const closeModal = () => {
        document.body.style.overflow = 'visible'
        setModalShow(false)
    }

    const showModal = () => {
        if (isLogin) {
            setModalShow(true)
            document.body.style.overflow = 'hidden'
        } else {
            Notify.failure(t('NoticesPage.needAuthorization'), {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        }
    }

    const { t } = useTranslation()

    return (
        <>
            <div className={scss.button__wrapper} onClick={showModal}>
                <p className={scss.button__text}>{t('NoticesPage.addPetBtn')}</p>
                <button className={scss.button} type="button" >
                    <SvgInsert id="icon-add-notice" />
                    
                </button>
            </div>
            {modalShow && (
                <>
                    <ModalAddNotice onClose={closeModal}>
                        <AddsNoticeContent />
                    </ModalAddNotice>
                </>
            )}
        </>
    )
}

export default AddNoticeButton
