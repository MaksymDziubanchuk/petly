import scss from './shared-layout.module.scss'
import base from '../../../helpers/container.module.scss'
import love from '../../../images/heart-desktop.svg'
import { useTranslation } from 'react-i18next'

const SharedLayout = () => {
    const { t } = useTranslation()

    return (
        <>
            <div className={scss.background}>
                <div className={base.container}>
                    <div className={scss.wrapperHome}>
                        <h1 className={scss.title}>{t('HomePage.title')}</h1>
                        <div className={scss.image}>
                            <img
                                src={love}
                                alt="heart"
                                className={scss.heartIcon}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SharedLayout
