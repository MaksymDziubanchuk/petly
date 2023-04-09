import scss from './pets-list.module.scss'
import SvgInsert from '../../utilsFolder/Svg/Svg'
import { useDispatch, useSelector } from 'react-redux'
import operationsPets from 'redux/operations/userPetsApi'
import { useState, useEffect } from 'react'
import Loader from 'components/utilsFolder/Loader/Loader'
import EditPetContent from '../ModalAddsPet/ModalAddPetPages/EditPetContent'
import ModalAddsPet from '../ModalAddsPet/ModalAddsPet'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'
import { useTranslation } from 'react-i18next'

export function PetsList() {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false)
    const [isActiveCardEdite, setIsActiveCardEdite] = useState(null)
    const [isActiveCardDelete, setIsActiveCardDelete] = useState(null)
    const [id, setId] = useState(null)
    const loading = useSelector(state => state.user.loading)
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(operationsPets.getUserPet())
    }, [dispatch])

    const pets = useSelector(state => state.user.pets)

    const onDeletePet = _id => {
        Confirm.show(
            '',
            'Are you sure you want to delete your petcard?',
            'Yes',
            'No',
            () => {
                dispatch(operationsPets.deletePet(_id)).then(() => {
                    dispatch(operationsPets.getUserPet())
                })
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

    const closeModal = () => {
        setModalShow(false)
        document.body.style.overflow = 'visible'
        dispatch(operationsPets.getUserPet())
    }

    const showModal = () => {
        setModalShow(true)
        document.body.style.overflow = 'hidden'
    }

    const elements =
        Array.isArray(pets) &&
        pets.map(({ name, birthday, breed, image, comments, _id }) => {
            const editDate = e => {
                const reversDate = e.slice(0, 10).split('-').reverse()
                return reversDate.join('.')
            }

            return (
                <li className={scss.petsList_box} key={_id}>
                    {loading && <Loader />}
                    <img className={scss.petsList_photo} src={image} alt="" />
                    <div className={scss.petsList_text_box}>
                        <p className={scss.petsList_field}>
                            <span className={scss.labelPets}>
                                {t('UserPage.pets.card.name')}:
                            </span>
                            {name}
                        </p>
                        <p className={scss.petsList_field}>
                            <span className={scss.labelPets}>
                                {t('UserPage.pets.card.birthday')}:
                            </span>
                            {editDate(birthday)}
                        </p>
                        <p className={scss.petsList_field}>
                            <span className={scss.labelPets}>
                                {t('UserPage.pets.card.breed')}:
                            </span>
                            {breed}{' '}
                        </p>
                        <p className={scss.petsList_field}>
                            <span className={scss.labelPets}>
                                {t('UserPage.pets.card.comments')}:
                            </span>
                            {comments}{' '}
                        </p>
                        <button
                            className={scss.petsList_button}
                            onClick={() => onDeletePet(_id)}
                            type="button"
                            onMouseEnter={() => setIsActiveCardDelete(_id)}
                            onMouseLeave={() => setIsActiveCardDelete(null)}
                        >
                            <SvgInsert
                                className={scss.icon_delete}
                                id={
                                    _id === isActiveCardDelete
                                        ? 'icon-delete'
                                        : 'icon-deletepet'
                                }
                            />
                        </button>
                        <button
                            className={scss.iconEdit_btn}
                            onClick={() => {
                                setId(_id)
                                showModal()
                            }}
                            onMouseEnter={() => setIsActiveCardEdite(_id)}
                            onMouseLeave={() => setIsActiveCardEdite(null)}
                        >
                            <SvgInsert
                                id={
                                    _id === isActiveCardEdite
                                        ? 'icon-edit-pet'
                                        : 'icon-edit-pet-active'
                                }
                            />
                        </button>
                        <div>
                            {modalShow && (
                                <>
                                    <ModalAddsPet onClose={closeModal}>
                                        <EditPetContent _id={id} />
                                    </ModalAddsPet>
                                </>
                            )}
                        </div>
                    </div>
                </li>
            )
        })

    return (
        <>
            <ol className={scss.petList_container}>{elements}</ol>
        </>
    )
}
