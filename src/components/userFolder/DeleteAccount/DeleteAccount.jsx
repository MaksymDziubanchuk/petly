import scss from './delete-account.module.scss'
import SvgInsert from '../../utilsFolder/Svg/Svg'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import operations from 'redux/operations/userOperations'
import axios from 'axios'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'
import { useTranslation } from 'react-i18next'

const { REACT_APP_BASE_URL, REACT_APP_FRONTEND_BASE_URL } = process.env
axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`

export default function DeleteAccount() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const { t } = useTranslation()

    const handlDeleteAccount = () => {
        Confirm.show(
            '',
            t('UserPage.deleteAccount.question'),
            t('UserPage.deleteAccount.yes'),
            t('UserPage.deleteAccount.no'),
            () => {
                dispatch(operations.deleteAccount(token)).then(() => {
                    window.location.replace(`${REACT_APP_FRONTEND_BASE_URL}register`)
                })
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
        <div className={scss.delete_account_box}>
            <button
                className={scss.delete_account_button}
                onClick={() => handlDeleteAccount()}
            >
                <p className={scss.delete_account_text}>
                    {t('UserPage.info.btn.deleteAccount')}
                </p>
                <SvgInsert id="icon-delete" />
            </button>
        </div>
    )
}
