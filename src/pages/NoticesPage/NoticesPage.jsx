import { Outlet, useParams } from 'react-router-dom'

import scss from './notices-page.module.scss'
import container from 'helpers/container.module.scss'
import NoticesCategoriesNav from 'components/noticesFolder/NoticesCategoriesNav/NoticesCategoriesNav'
import NoticesSearch from 'components/noticesFolder/NoticesSearch/NoticesSearch'
import { useTranslation } from 'react-i18next'

const NoticesPage = () => {
    const { t } = useTranslation()

    const { categoryName } = useParams()

    return (
        <main className={scss.main}>
            <div className={container.container}>
                <h2 className={scss.main_title}>{t('NoticesPage.title')}</h2>
                {categoryName !== 'favorite' && categoryName !== 'own' && (
                    <NoticesSearch />
                )}
                <NoticesCategoriesNav />
                <Outlet />
            </div>
        </main>
    )
}

export default NoticesPage
