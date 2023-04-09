import scss from './modal-notice.module.scss'
import SvgInsert from '../../utilsFolder/Svg/Svg'
import useAuth from 'redux/utils/useAuth'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    fetchInfoPetUser,
    fetchInfoUser,
} from 'redux/operations/userGuestOperations'
import { useTranslation } from 'react-i18next'

const ModalNotice = ({
    onClose,
    onAddDelete,
    categoryNotice,
    favorite,
    deleteNotice,
    info,
}) => {
    const idUser = useSelector(state => state.auth.user.userId)
    const isLogin = useAuth()
    const dispatch = useDispatch()

    const {
        _id,
        image,
        title,
        breed,
        location,
        birthday,
        price,
        category,
        owner,
        comments,
        name,
        sex,
    } = info

    const formatDate = date => {
        const dateFormat = new Date(date)
        return `${
            dateFormat.getMonth() + 1 < 10
                ? `0${dateFormat.getMonth() + 1}`
                : dateFormat.getMonth() + 1
        }.${
            dateFormat.getDate() < 10
                ? `0${dateFormat.getDate()}`
                : dateFormat.getDate()
        }.${dateFormat.getFullYear()}`
    }

    const { t } = useTranslation()

    return (
        <>
            <div className={scss.modal_notice__content}>
                <div className={scss.modal_notice__content_info}>
                    <div className={scss.modal_notice__close} onClick={onClose}>
                        <SvgInsert id="icon-close-add-notice" />
                    </div>
                    <div className={scss.modal_notice__image_content}>
                        <img
                            className={scss.modal_notice__image}
                            src={image}
                            alt={name}
                        />
                        <span className={scss.modal_notice__category}>
                            {categoryNotice(category)}
                        </span>
                    </div>
                    <div>
                        <h3 className={scss.modal_notice__title}>{title}</h3>
                        <ul className={scss.modal_notice__list}>
                            <li className={scss.modal_notice__item}>
                                <h4 className={scss.modal_notice__item_title}>
                                    {t('NoticesPage.card.name')}:
                                </h4>
                                <p
                                    className={
                                        scss.modal_notice__item_description
                                    }
                                >
                                    {name}
                                </p>
                            </li>
                            <li className={scss.modal_notice__item}>
                                <h4 className={scss.modal_notice__item_title}>
                                    {t('NoticesPage.card.birthday')}:
                                </h4>
                                <p
                                    className={
                                        scss.modal_notice__item_description
                                    }
                                >
                                    {formatDate(birthday)}
                                </p>
                            </li>
                            <li className={scss.modal_notice__item}>
                                <h4 className={scss.modal_notice__item_title}>
                                    {t('NoticesPage.card.breed')}:
                                </h4>
                                <p
                                    className={
                                        scss.modal_notice__item_description
                                    }
                                >
                                    {breed}
                                </p>
                            </li>
                            <li className={scss.modal_notice__item}>
                                <h4 className={scss.modal_notice__item_title}>
                                    {t('NoticesPage.card.location')}:
                                </h4>
                                <p
                                    className={
                                        scss.modal_notice__item_description
                                    }
                                >
                                    {location}
                                </p>
                            </li>
                            <li className={scss.modal_notice__item}>
                                <h4 className={scss.modal_notice__item_title}>
                                    {t('NoticesPage.card.sex')}:
                                </h4>
                                <p
                                    className={
                                        scss.modal_notice__item_description
                                    }
                                >
                                    {t(`NoticesPage.card.${sex}`)}
                                </p>
                            </li>
                            <li className={scss.modal_notice__item}>
                                <h4 className={scss.modal_notice__item_title}>
                                    {t('NoticesPage.card.email')}:
                                </h4>
                                <a
                                    href={`mailto:${owner.email}`}
                                    className={`${scss.modal_notice__item_description} ${scss.modal_notice__item_description_link}`}
                                    type="button"
                                >
                                    {owner.email}
                                </a>
                            </li>
                            <li className={scss.modal_notice__item}>
                                <h4 className={scss.modal_notice__item_title}>
                                    {t('NoticesPage.card.phone')}:
                                </h4>
                                <a
                                    href={`tel:+${owner.phone}`}
                                    className={`${scss.modal_notice__item_description} ${scss.modal_notice__item_description_link}`}
                                    type="button"
                                >
                                    {`+${owner.phone}`}
                                </a>
                            </li>
                            {category === 'sell' && (
                                <li className={scss.modal_notice__item}>
                                    <h4
                                        className={
                                            scss.modal_notice__item_title
                                        }
                                    >
                                        {t('NoticesPage.card.price')}:
                                    </h4>
                                    <p
                                        className={
                                            scss.modal_notice__item_description
                                        }
                                    >
                                        {price}
                                    </p>
                                </li>
                            )}
                            <li className={scss.modal_notice__item}>
                                <h4 className={scss.modal_notice__item_title}>
                                    {t('NoticesPage.card.owner')}:
                                </h4>
                                <Link
                                    to={
                                        owner._id === idUser
                                            ? '/user'
                                            : `/user/${owner._id}`
                                    }
                                    onClick={() => {
                                        if (owner._id === idUser) {
                                            document.body.style.overflow =
                                                'visible'
                                            return
                                        } else {
                                            document.body.style.overflow =
                                                'visible'
                                            dispatch(
                                                fetchInfoUser(owner._id),
                                                fetchInfoPetUser(owner._id)
                                            )
                                        }
                                    }}
                                    className={`${scss.modal_notice__item_description} ${scss.modal_notice__item_description_link}`}
                                >
                                    {owner.name} &#8601;
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <article className={scss.modal_notice__item_comment}>
                    <span className={scss.modal_notice__item_title}>
                        {t('NoticesPage.card.comments')}:{' '}
                    </span>
                    {comments}
                </article>
                <div className={scss.modal_notice__button_container}>
                    <a
                        href={`tel:+${owner.phone}`}
                        className={`${scss.button__primary_main} ${scss.modal_notice__button} ${scss.modal_notice__button_contact}`}
                        type="button"
                    >
                        {t('NoticesPage.card.contact')}
                    </a>

                    <button
                        onClick={() => {
                            onAddDelete(_id)
                        }}
                        className={`${scss.button__primary_not_main} ${scss.modal_notice__button}`}
                        type="button"
                    >
                        {favorite
                            ? t('NoticesPage.card.remove')
                            : t('NoticesPage.card.addTo')}
                        <SvgInsert
                            className={scss.modal_notice__button_favorite}
                            id="icon-heart-favorite"
                        />
                    </button>

                    {isLogin && idUser === owner._id && (
                        <button
                            type="button"
                            className={`${scss.button__primary_not_main} ${scss.modal_notice__button}`}
                            onClick={() => deleteNotice(owner._id)}
                        >
                            {t('NoticesPage.card.delete')}
                            <SvgInsert id="icon-delete-notice" />
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default ModalNotice
