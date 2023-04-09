import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceStrict } from 'date-fns'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'
import scss from './notice-category-item.module.scss'
import SvgInsert from 'components/utilsFolder/Svg/Svg'
import {
    fetchCategoryNotices,
    addNoticeToFavorite,
    deleteNotice,
    deleteFavoriteNotice,
} from 'redux/operations/noticesOperation'
import useAuth from 'redux/utils/useAuth'
import Modal from '../ModalNotice/Modal/Modal'
import ModalNotice from '../ModalNotice/ModalNotice'
import ModalAddNotice from 'components/noticesFolder/ModalAddNotice/ModalAddNotice'
import EditNoticeContent from 'components/noticesFolder/ModalAddNotice/ModalAddNoticeForm/EditNoticeContent'
import {
    fetchInfoPetUser,
    fetchInfoUser,
} from 'redux/operations/userGuestOperations'
import { useTranslation } from 'react-i18next'

const NoticeCategoryItem = ({ notice, value }) => {
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
    } = notice

    const [modalShow, setModalShow] = useState(false)
    const [modalShowEditNotice, setModalShowEditNotice] = useState(false)
    const dispatch = useDispatch()
    const isLogin = useAuth()
    const idUser = useSelector(state => state.auth.user.userId)
    const favoriteNotices = useSelector(state => state.notices.favoriteNotices)
    const filter = useSelector(state => state.filter)
    const [isFavorite, setIsFavorite] = useState(false)

    const { t } = useTranslation()

    useEffect(() => {
        if (favoriteNotices.length > 0) {
            favoriteNotices.map(item => item._id === _id && setIsFavorite(true))
        }
    }, [favoriteNotices, dispatch, _id])

    const btnAddToFavorite = async noticeId => {
        if (!isLogin) {
            Notify.failure(t('NoticesPage.needAuthorization'), {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
            return
        } else if (!isFavorite) {
            if (filter !== null) {
                dispatch(addNoticeToFavorite(noticeId))
                setIsFavorite(true)
                return
            }
        } else if (isFavorite) {
            await dispatch(deleteFavoriteNotice(noticeId))
            setIsFavorite(false)
            dispatch(fetchCategoryNotices(value))
        }
    }

    function closeModal() {
        setModalShow(false)
        document.body.style.overflow = 'visible'
    }

    const showModal = () => {
        document.body.style.overflow = 'hidden'
        setModalShow(true)
    }

    const getPlacePet = () => {
        const result = location.split(', ')
        return result[0]
    }

    const btnDeleteNotice = noticeId => {
        Confirm.show(
            '',
            t('NoticesPage.deleteNotis'),
            t('NoticesPage.yes'),
            t('NoticesPage.no'),
            () => {
                dispatch(deleteNotice(noticeId))
            },
            () => {},
            {
                messageFontSize: '20px',
                borderRadius: '8px',
                cssAnimationStyle: 'zoom',
                okButtonColor: '#ffffff',
                okButtonBackground: '#eebb9c',
                cancelButtonColor: '#ffffff',
                cancelButtonBackground: '#F59256',
            }
        )
    }

    const getAgePet = formatDistanceStrict(new Date(), new Date(birthday))

    const getCategoryNotice = category => {
        if (category === 'for-free') {
            category = t('NoticesPage.categories.inGoodHands')
        }
        if (category === 'lost-found') {
            category = t('NoticesPage.categories.lostFound')
        }
        if (category === 'sell') {
            category = t('NoticesPage.categories.sell')
        }
        return category
    }

    const showModalEditNotice = () => {
        setModalShowEditNotice(true)
        document.body.style.overflow = 'hidden'
    }

    const closeModalEditNotice = () => {
        document.body.style.overflow = 'visible'
        setModalShowEditNotice(false)
    }

    return (
        <>
            {modalShow && (
                <>
                    <Modal onClose={closeModal}>
                        <ModalNotice
                            onClose={closeModal}
                            onAddDelete={btnAddToFavorite}
                            categoryNotice={getCategoryNotice}
                            favorite={isFavorite}
                            deleteNotice={btnDeleteNotice}
                            info={notice}
                        />
                    </Modal>
                </>
            )}

            {modalShowEditNotice && (
                <>
                    <ModalAddNotice onClose={closeModalEditNotice}>
                        <EditNoticeContent
                            notice={notice}
                            noticeCategory={value}
                        />
                    </ModalAddNotice>
                </>
            )}

            <li className={scss.card_item}>
                <img src={image} alt="pet" className={scss.card_img} />
                <div className={scss.card_info}>
                    <h3 className={scss.card_info_title}>{title}</h3>
                    <ul className={scss.card_info_list}>
                        <li className={scss.card_info_item}>
                            <p className={`${scss.card_info_item_text} ${scss.text_width}`}>
                                {t('NoticesPage.card.breed')}:
                            </p>
                            <p className={scss.card_info_item_text}>{breed ? breed : 'no information'}</p>
                        </li>
                        <li className={scss.card_info_item}>
                            <p className={`${scss.card_info_item_text} ${scss.text_width}`}>
                                {t('NoticesPage.card.place')}:
                            </p>
                            <p className={scss.card_info_item_text}>{getPlacePet()}</p>
                        </li>
                        <li className={scss.card_info_item}>
                            <p className={`${scss.card_info_item_text} ${scss.text_width}`}>
                                {t('NoticesPage.card.age')}:
                            </p>
                            <p className={scss.card_info_item_text}>{getAgePet}</p>
                        </li>
                        {category === 'sell' && (
                            <li className={scss.card_info_item}>
                                <p className={`${scss.card_info_item_text} ${scss.text_width}`}>
                                    {t('NoticesPage.card.price')}:
                                </p>
                                <p className={scss.card_info_item_text}>{price}</p>
                            </li>
                        )}
                        <li className={scss.card_info_item}>
                            <p className={`${scss.card_info_item_text} ${scss.text_width}`}>
                                {t('NoticesPage.card.owner')}:
                            </p>
                            <Link
                                to={
                                    owner._id === idUser
                                        ? '/user'
                                        : `/user/${owner._id}`
                                }
                                onClick={() => {
                                    if (owner._id === idUser) {
                                        return
                                    } else {
                                        dispatch(
                                            fetchInfoUser(owner._id),
                                            fetchInfoPetUser(owner._id)
                                        )
                                    }
                                }}
                                className={scss.card_info_item_link}
                                data-action="owner"
                            >
                                {owner.name} &#8601;
                            </Link>
                        </li>
                    </ul>
                    <div className={scss.box_btn}>
                        <button
                            type="button"
                            className={scss.learn_more_btn}
                            onClick={showModal}
                        >
                            {t('NoticesPage.card.learnMore')}
                        </button>
                        {isLogin && idUser === owner._id && (
                            <>
                                <button
                                    type="button"
                                    className={scss.delete_btn}
                                    onClick={() => btnDeleteNotice(_id)}
                                >
                                    {t('NoticesPage.card.delete')}
                                    <SvgInsert id="icon-delete-notice" />
                                </button>
                                <button
                                    type="button"
                                    className={scss.edit_notice_btn}
                                    onClick={showModalEditNotice}
                                >
                                    <SvgInsert id="icon-edit" />
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => btnAddToFavorite(_id)}
                            type="button"
                            className={
                                isFavorite
                                    ? `${scss.add_to_favorite_btn} ${scss.add_to_favorite_btn_active}`
                                    : scss.add_to_favorite_btn
                            }
                        >
                            <SvgInsert id="icon-heart" />
                        </button>
                    </div>
                    <p className={scss.card_text}>
                        {getCategoryNotice(category)}
                    </p>
                </div>
            </li>
        </>
    )
}

export default NoticeCategoryItem
