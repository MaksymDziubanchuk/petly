import { NavLink, useNavigate, useParams } from 'react-router-dom'
import scss from './notices-categories-nav.module.scss'
import useAuth from 'redux/utils/useAuth'
import { useEffect } from 'react'
import AddNoticeButton from '../AddNoticeButton/AddNoticeButton'
import { useTranslation } from 'react-i18next'

const NoticesCategoriesNav = () => {
    const isLogin = useAuth()
    const { categoryName } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (categoryName === undefined) {
            navigate('sell', { replace: true })
        }
    }, [categoryName, navigate])

    const getClassName = ({ isActive }) => {
        return isActive ? `${scss.link} ${scss.active}` : `${scss.link}`
    }
    const { t } = useTranslation()

    return (
        <div className={scss.wrapper}>
            <ul className={scss.list}>
                <li className={scss.item}>
                    <NavLink to="/notices/lost-found" className={getClassName}>
                        {t('NoticesPage.categories.lostFound')}
                    </NavLink>
                </li>
                <li className={scss.item}>
                    <NavLink to="/notices/for-free" className={getClassName}>
                        {t('NoticesPage.categories.inGoodHands')}
                    </NavLink>
                </li>
                <li className={scss.item_order}>
                    <NavLink to="/notices/sell" className={getClassName}>
                        {t('NoticesPage.categories.sell')}
                    </NavLink>
                </li>
                {isLogin && (
                    <>
                        <li className={scss.item}>
                            <NavLink
                                to="/notices/favorite"
                                className={getClassName}
                            >
                                {t('NoticesPage.categories.favoriteAds')}
                            </NavLink>
                        </li>
                        <li className={scss.item}>
                            <NavLink to="/notices/own" className={getClassName}>
                                {t('NoticesPage.categories.myAds')}
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
            <AddNoticeButton />
        </div>
    )
}

export default NoticesCategoriesNav
