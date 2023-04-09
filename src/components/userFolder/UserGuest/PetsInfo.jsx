import Loader from 'components/utilsFolder/Loader/Loader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchInfoPetUser } from 'redux/operations/userGuestOperations'
import scss from '../../petsUserFolder/PetsList/pets-list.module.scss'
import style from '../../petsUserFolder/PetsData/pets-data.module.scss'
import { EmptyPetsList } from 'components/petsUserFolder/EmptyPetsList/EmptyPetsList'
import { useTranslation } from 'react-i18next'

const PetsInfo = () => {
    const loading = useSelector(state => state.guest.loading)
    const pets = useSelector(state => state.guest.pets)
    const userName = useSelector(state => state.guest.user.name)

    const { id } = useParams()
    const dispatch = useDispatch()

    const { t } = useTranslation()

    useEffect(() => {
        dispatch(fetchInfoPetUser(id))
    }, [dispatch, id])

    const editDate = e => {
        const reversDate = e.slice(0, 10).split('-').reverse()
        return reversDate.join('.')
    }
    const textEmptyPetsList = t('UserPage.pets.emptyPetsList')

    return (
        <div className={style.overflow}>
            <ul className={scss.petList_container}>
                {loading && <Loader />}
                {!loading && pets.length === 0 ? (
                    <EmptyPetsList text={`${userName} ${textEmptyPetsList}`} />
                ) : (
                    pets.map(
                        ({ name, birthday, breed, image, comments, _id }) => {
                            return (
                                <li className={scss.petsList_box} key={_id}>
                                    <img
                                        className={scss.petsList_photo}
                                        src={image}
                                        alt="pet"
                                    />
                                    <div className={scss.petsList_text_box}>
                                        <p className={scss.petsList_field}>
                                            <span className={scss.labelPets}>
                                                {t('UserPage.pets.card.name')}:
                                            </span>
                                            {name}
                                        </p>
                                        <p className={scss.petsList_field}>
                                            <span className={scss.labelPets}>
                                                {t(
                                                    'UserPage.pets.card.birthday'
                                                )}
                                                :
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
                                                {t(
                                                    'UserPage.pets.card.comments'
                                                )}
                                                :
                                            </span>
                                            {comments}{' '}
                                        </p>
                                    </div>
                                </li>
                            )
                        }
                    )
                )}
            </ul>
        </div>
    )
}

export default PetsInfo
