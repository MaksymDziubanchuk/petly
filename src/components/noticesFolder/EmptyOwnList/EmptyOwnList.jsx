import cat from '../../../images/cat_for_empty_user_pets_list.svg'
import scss from './empty-own-list.module.scss'
import { useTranslation } from 'react-i18next'

export function EmptyOwnList() {
    const { t } = useTranslation()

    return (
        <div className={scss.emptyPetsList_wrap}>
            <div className={scss.emptyPetsList_box}>
                <img className={scss.emptyPetsList_img} src={cat} alt="cat" />
                <p className={scss.emptyPetsList_text}>
                    {t('NoticesPage.EmptyOwnList')}
                </p>
            </div>
        </div>
    )
}
