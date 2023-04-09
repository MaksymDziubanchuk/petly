import SvgInsert from '../../../utilsFolder/Svg/Svg'
import scss from './google-nav.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuActive } from 'redux/slices/menuSlice'
import { useTranslation } from 'react-i18next'

const { REACT_APP_BASE_URL } = process.env

const GoogleAuth = () => {
    const isActive = useSelector(state => state.menu.menuActive)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <div className={scss.googleBox}>
            <div className={scss.googleBox__title}>
                <p className={scss.googleDecs}>{t('AuthForm.google')}</p>
            </div>
            <div className={scss.linkBox}>
                {isActive === true ? (
                    <>
                        <a
                            href={`${REACT_APP_BASE_URL}/api/auth/google`}
                            className={scss.googleLink}
                            onClick={() => dispatch(setMenuActive(!isActive))}
                        >
                            <SvgInsert id="icon-google" />
                        </a>
                        <a
                            href={`${REACT_APP_BASE_URL}/api/auth/facebook`}
                            className={scss.googleLink}
                            onClick={() => dispatch(setMenuActive(!isActive))}
                        >
                            <SvgInsert id="facebook" />
                        </a>
                    </>
                ) : (
                    <>
                        <a
                            href={`${REACT_APP_BASE_URL}/api/auth/google`}
                            className={scss.googleLink}
                        >
                            <SvgInsert id="icon-google" />
                        </a>
                        <a
                            href={`${REACT_APP_BASE_URL}/api/auth/facebook`}
                            className={scss.googleLink}
                            onClick={() => dispatch(setMenuActive(!isActive))}
                        >
                            <SvgInsert id="facebook" />
                        </a>
                    </>
                )}
            </div>
        </div>
    )
}

export default GoogleAuth
