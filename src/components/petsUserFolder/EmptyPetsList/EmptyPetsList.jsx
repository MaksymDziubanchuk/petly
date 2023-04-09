import cat from '../../../images/cat_for_empty_user_pets_list.svg'
import scss from './empty-pets-list.module.scss'

export function EmptyPetsList({text}) {
    return (
        <div className={scss.emptyPetsList_box}>
            <img className={scss.emptyPetsList_img} src={cat} alt="cat" />
            <p className={scss.emptyPetsList_text}>
                {text}
            </p>
        </div>
    )
}
