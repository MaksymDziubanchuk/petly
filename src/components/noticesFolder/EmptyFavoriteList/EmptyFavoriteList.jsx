import cat from '../../../images/cat_for_empty_favorite_list.svg'
import scss from './empty-favorite-list.module.scss'
import { useTranslation } from 'react-i18next'

export function EmptyFavoriteList() {
    const { t } = useTranslation()

    return (
        <div className={scss.emptyPetsList_wrap}>
            <div className={scss.emptyPetsList_box}>
                <img className={scss.emptyPetsList_img} src={cat} alt="cat" />
                <p className={scss.emptyPetsList_text}>
                    {t('NoticesPage.emptyFavoriteList')}
                </p>
            </div>
        </div>
    )
}
