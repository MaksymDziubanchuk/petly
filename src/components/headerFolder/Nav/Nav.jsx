import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import scss from './nav.module.scss'
import AuthNav from './AuthNav/AuthNav'
import UserNav from './UserNav/UserNav'
import { setMenuActive } from 'redux/slices/menuSlice'
import LangBtn from './LangBtn/LangBtn'
import { useTranslation } from 'react-i18next'

const Nav = () => {
    const isActive = useSelector(state => state.menu.menuActive)
    const isLogin = useSelector(state => state.auth.isLogin)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <>
            <div
                className={
                    isActive === false
                        ? scss.wrapper
                        : `${scss.wrapper} ${scss.isActive}`
                }
            >
                <div className={scss.authWrapper}>
                    {isLogin ? <UserNav /> : <AuthNav />}
                </div>
                <div className={scss.linkWrapper}>
                    {isActive === true ? (
                        <NavLink
                            to={'news'}
                            className={scss.linkMain}
                            onClick={() => dispatch(setMenuActive(!isActive))}
                        >
                            {t('Nav.news')}
                        </NavLink>
                    ) : (
                        <NavLink to={'news'} className={scss.linkMain}>
                            {t('Nav.news')}
                        </NavLink>
                    )}
                    {isActive === true ? (
                        <NavLink
                            to={'notices'}
                            className={scss.linkMain}
                            onClick={() => dispatch(setMenuActive(!isActive))}
                        >
                            {t('Nav.findPet')}
                        </NavLink>
                    ) : (
                        <NavLink to={'notices'} className={scss.linkMain}>
                            {t('Nav.findPet')}
                        </NavLink>
                    )}
                    {isActive === true ? (
                        <NavLink
                            to={'friends'}
                            className={scss.linkMain}
                            onClick={() => dispatch(setMenuActive(!isActive))}
                        >
                            {t('Nav.ourFriends')}
                        </NavLink>
                    ) : (
                        <NavLink to={'friends'} className={scss.linkMain}>
                            {t('Nav.ourFriends')}
                        </NavLink>
                    )}
                    <LangBtn />
                </div>
            </div>
        </>
    )
}

export default Nav
