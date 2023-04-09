import { useDispatch, useSelector } from 'react-redux'
import Loader from 'components/utilsFolder/Loader/Loader'
import { fetchInfoUser } from 'redux/operations/userGuestOperations'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import scss from '../UserDataItem/user-data-item.module.scss'
import scssS from './userInfo.module.scss'
import { useTranslation } from 'react-i18next'

const UserInfo = () => {
    const loading = useSelector(state => state.guest.loading)
    const user = useSelector(state => state.guest.user)
    const { id } = useParams()

    const dispatch = useDispatch()

    const { t } = useTranslation()

    useEffect(() => {
        dispatch(fetchInfoUser(id))
    }, [dispatch, id])

    const editDate = e => {
        const reversDate = e.slice(0, 10).split('-').reverse()
        return reversDate.join('.')
    }

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <div className={scss.userItem_container}>
                    <div className={scss.userDataForm_box}>
                        <img
                            src={
                                user.avatarURL
                                    ? user.avatarURL
                                    : 'https://dummyimage.com/150x150/FDF7F2.gif&text=Add+your+photo!'
                            }
                            alt="user"
                            className={scss.userItem__yourPhoto}
                        />
                    </div>
                    <div className={scss.userDataForm_box}>
                        <p className={scssS.infoLabel}>
                            {t('UserPage.info.card.name')}:
                            <span className={scssS.infoText}>{user.name}</span>
                        </p>
                        {user.birthday && (
                            <p className={scssS.infoLabel}>
                                {t('UserPage.info.card.birthday')}:{' '}
                                <span className={scssS.infoText}>
                                    {editDate(user.birthday)}
                                </span>
                            </p>
                        )}
                        <p className={scssS.infoLabel}>
                            {t('UserPage.info.card.city')}:
                            <span className={scssS.infoText}>{user.city}</span>
                        </p>
                        <div className={scssS.infoLabel}>
                            {t('UserPage.info.card.email')}:
                            <a href={`mailto:${user.email}`} className={scssS.infoText} data-action="link">
                                {user.email}
                            </a>
                        </div>
                        <div className={scssS.infoLabel}>
                            {t('UserPage.info.card.phone')}:
                            <a href={`tel:+${user.phone}`} className={scssS.infoText} data-action="link">
                                +{user.phone}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserInfo
