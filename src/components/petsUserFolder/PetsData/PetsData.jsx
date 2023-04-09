import { PetsList } from '../PetsList/PetsList'
import { EmptyPetsList } from '../EmptyPetsList/EmptyPetsList'
import ModalAddsPet from '../ModalAddsPet/ModalAddsPet'
import AddsPetContent from '../ModalAddsPet/ModalAddPetPages/AddsPetContent'
import operationsPets from 'redux/operations/userPetsApi'
import { useEffect } from 'react'
import Loader from 'components/utilsFolder/Loader/Loader'
import { useState } from 'react'
import SvgInsert from '../../utilsFolder/Svg/Svg'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import scss from './pets-data.module.scss'

function PetsData() {
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(operationsPets.getUserPet())
    }, [dispatch])

    const pets = useSelector(state => state.user.pets)

    const loading = useSelector(state => state.user.loading)

    const closeModal = () => {
        setModalShow(false)
        document.body.style.overflow = 'visible'
    }

    const showModal = () => {
        setModalShow(true)
        document.body.style.overflow = 'hidden'
    }

    return (
        <>
            {loading && <Loader />}
            <div className={scss.petsData_title_box}>
                <h2 className={scss.petsData_title}>
                    {t('UserPage.pets.title')}:
                </h2>
                <div className={scss.addPetModal_buttonBox}>
                    <button
                        className={scss.addPetModal_button}
                        type="button"
                        onClick={showModal}
                    >
                        {t('UserPage.pets.btn.addPet')}{' '}
                        <SvgInsert
                            className={scss.iconAddPet}
                            id="icon-add-pet"
                        />
                    </button>
                </div>
            </div>
            <div className={scss.petsData__container}>
                {modalShow && (
                    <>
                        <ModalAddsPet onClose={closeModal}>
                            <AddsPetContent />
                        </ModalAddsPet>
                    </>
                )}

                <div className={scss.overflow}>
                    {pets.length === 0 ? (
                        <EmptyPetsList text="You haven`t added any animals to your list yet" />
                    ) : (
                        <PetsList />
                    )}
                </div>
            </div>
        </>
    )
}

export default PetsData
