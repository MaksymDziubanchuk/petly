import scss from './auth-nav.module.scss'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuActive } from 'redux/slices/menuSlice'
import { useTranslation } from 'react-i18next'

const AuthNav = () => {
    const isActive = useSelector(state => state.menu.menuActive)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <>
            {isActive === true ? (
                <NavLink
                    to={'login'}
                    className={scss.login}
                    onClick={() => dispatch(setMenuActive(!isActive))}
                >
                    {t('Nav.login')}
                </NavLink>
            ) : (
                <NavLink to={'login'} className={scss.login}>
                    {t('Nav.login')}
                </NavLink>
            )}
            {isActive === true ? (
                <NavLink
                    to={'register'}
                    className={scss.register}
                    onClick={() => dispatch(setMenuActive(!isActive))}
                >
                    {t('Nav.registration')}
                </NavLink>
            ) : (
                <NavLink to={'register'} className={scss.register}>
                    {t('Nav.registration')}
                </NavLink>
            )}
        </>
    )
}

export default AuthNav
