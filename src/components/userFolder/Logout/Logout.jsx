import scss from './logout.module.scss'
import SvgInsert from '../../utilsFolder/Svg/Svg'
import React from 'react'
import { useDispatch } from 'react-redux'
import operations from '../../../redux/operations/userOperations'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'
import { useTranslation } from 'react-i18next'

export default function Logout() {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const onLogout = () => {
        Confirm.show(
            '',
            t('UserPage.logoutModal.question'),
            t('UserPage.logoutModal.yes'),
            t('UserPage.logoutModal.no'),
            () => {
                dispatch(operations.logout())
            },
            () => {},
            {
                messageFontSize: '20px',
                borderRadius: '8px',
                cssAnimationStyle: 'zoom',
                okButtonColor: '#ffffff',
                okButtonBackground: '#eebb9c',
                cancelButtonColor: '#ffffff',
                cancelButtonBackground: '#F59256',
            }
        )
    }

    return (
        <div className={scss.logout_box}>
            <button className={scss.logout_button} onClick={onLogout}>
                <SvgInsert id="icon-logout" />
                <p className={scss.logout_text}>
                    {t('UserPage.info.btn.logout')}
                </p>
            </button>
        </div>
    )
}
