import scss from './our-friends-page-title.module.scss'
import { useTranslation } from 'react-i18next'

const OurFriendsPageTitle = () => {
    const { t } = useTranslation()

    return <h1 className={scss.header}>{t('OurFriendsPage.title')}</h1>
}

export default OurFriendsPageTitle
