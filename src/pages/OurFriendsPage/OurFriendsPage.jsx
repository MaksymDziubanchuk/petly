import OurFriendsPageTitle from './OurFriendsPageTitle/OurFriendsPageTitle'
import OurFriendsPageList from './OurFriendsPageList/OurFriendsPageList'
import scss from './our-friends-page.module.scss'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const OurFriendsPage = () => {

    const { t, ready } = useTranslation()

    useEffect(() => {
        if (!ready) return 'loading translations...'
    }, [ready])

    const items = t('OurFriendsPage', { returnObjects: true })
    return (
        <div className={scss.container}>
            <OurFriendsPageTitle />
            <OurFriendsPageList items={items.cards} />
        </div>
    )
}

export default OurFriendsPage
