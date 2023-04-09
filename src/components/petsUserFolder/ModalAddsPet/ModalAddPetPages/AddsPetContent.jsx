import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import scss from './modal-add-pet-pages.module.scss'
import operationsPets from 'redux/operations/userPetsApi'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import Loader from 'components/utilsFolder/Loader/Loader'
import SvgInsert from '../../../utilsFolder/Svg/Svg'
import Flatpickr from 'react-flatpickr'
import { useTranslation } from 'react-i18next'

const AddsPetContent = ({ close }) => {
    const [stepOne, setStepOne] = useState(true)
    const [petName, setPetName] = useState('')
    const [petDate, setPetDate] = useState('')
    const [petBreed, setPetBreed] = useState('')
    const [imageURL, setImageURL] = useState(null)

    const loading = useSelector(state => state.user.loading)

    const dispatch = useDispatch()

    const { t } = useTranslation()

    const changeStepOne = e => {
        switch (e.currentTarget.name) {
            case 'name':
                setPetName(e.currentTarget.value)
                break

            case 'breed':
                setPetBreed(e.currentTarget.value)
                break

            default:
                return
        }
    }

    const changeStep = () => {
        return setStepOne(!stepOne)
    }

    const handleImageChange = e => {
        const reader = new FileReader()
        const image = e.target.files[0]
        if (image?.size > 5242880) {
            Notify.warning(t('UserPage.modalAddPet.bigSizeImage'), {
                timeout: 6000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
            setImageURL(null)
            return
        }
        reader.onloadend = () => {
            setImageURL(reader.result)
        }
        reader.readAsDataURL(image)
        return
    }

    const dateNow = new Date()

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

    const handleSubmitForStepOne = e => {
        e.preventDefault()
        const form = e.currentTarget
        const { name, date, breed } = form.elements
        setPetName(name.value)
        setPetDate(date.value)
        setPetBreed(breed.value)
        return changeStep()
    }

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.currentTarget
        const { image, comments } = form.elements
        const data = new FormData()
        data.append('name', petName)
        data.append('birthday', petDate)
        data.append('breed', petBreed)
        data.append('comments', comments.value)
        data.append('image', image.files[0])
        setPetBreed('')
        setPetDate('')
        setPetName('')
        setImageURL(null)
        dispatch(operationsPets.addPet(data))
        form.reset()
        return close()
    }

    const validateFile = () => {
        if (!imageURL) {
            Notify.failure(t('UserPage.modalAddPet.imageFalse'), {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        }
    }

    return (
        <>
            {loading && <Loader />}
            <div className={scss.modalAdds_page}>
                <div className={scss.modalAdds_page__close} onClick={close}>
                    <SvgInsert id="icon-close" />
                </div>
                <h3 className={scss.modalAdds_page__tittle}>
                    {t('UserPage.modalAddPet.title.addPet')}
                </h3>
                {stepOne && (
                    <form onSubmit={handleSubmitForStepOne}>
                        <label
                            className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                        >
                            {t('UserPage.modalAddPet.title.name')}
                        </label>
                        <input
                            className={scss.modalAdds_page__input}
                            name="name"
                            placeholder={t('UserPage.modalAddPet.ph.name')}
                            type="text"
                            required
                            value={petName}
                            onChange={changeStepOne}
                        />
                        <label
                            className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                        >
                            {t('UserPage.modalAddPet.title.birth')}
                        </label>
                        <Flatpickr
                            className={scss.modalAdds_page__input}
                            name="date"
                            type="text"
                            placeholder={t('UserPage.modalAddPet.ph.birth')}
                            required
                            value={petDate}
                            options={{
                                dateFormat: 'm.d.Y',
                                maxDate: `${formatDate(dateNow)}`,
                            }}
                            onChange={([date]) => {
                                setPetDate(formatDate(date))
                            }}
                        />
                        <label
                            className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                        >
                            {t('UserPage.modalAddPet.title.breed')}
                        </label>
                        <input
                            className={scss.modalAdds_page__input}
                            type="text"
                            name="breed"
                            placeholder={t('UserPage.modalAddPet.ph.breed')}
                            required
                            value={petBreed}
                            onChange={changeStepOne}
                        />
                        <div className={scss.addPet__button}>
                            <button
                                className={`${scss.button__primary_main} ${scss.modalAdds_page__button}`}
                                type="submit"
                            >
                                {t('UserPage.modalAddPet.btn.next')}
                            </button>
                            <span
                                className={`${scss.button__primary_not_main} ${scss.modalAdds_page__button}`}
                                onClick={close}
                            >
                                {t('UserPage.modalAddPet.btn.cancel')}
                            </span>
                        </div>
                    </form>
                )}
                {!stepOne && (
                    <form
                        action=""
                        id="book-add-form"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <div className={scss.add__pet__container}>
                            <p className={scss.modalAdds_page__field}>
                                {t('UserPage.modalAddPet.title.loadImage')}
                            </p>

                            <input
                                className={scss.addspet__imgInput}
                                type="file"
                                name="image"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                id="img"
                                required
                                title="is required"
                                multiple
                                onChange={handleImageChange}
                            />
                            <label
                                className={scss.addspet__imgLabel}
                                htmlFor="img"
                            >
                                {imageURL && (
                                    <div
                                        className={scss.addspetPhoto__container}
                                    >
                                        <img
                                            src={imageURL}
                                            alt="pet"
                                            className={scss.addspet__photo}
                                        />
                                    </div>
                                )}
                            </label>
                            <label
                                className={`${scss.modalAdds_page__label} ${scss.modalAdds_commit_box}`}
                            >
                                {t('UserPage.modalAddPet.title.comments')}
                            </label>
                            <textarea
                                className={scss.modalAdds_commit}
                                type="text"
                                name="comments"
                                placeholder={t(
                                    'UserPage.modalAddPet.ph.comment'
                                )}
                                minLength={8}
                                required
                            />

                            <div className={scss.addPet__button}>
                                <button
                                    className={`${scss.button__primary_main} ${scss.modalAdds_page__button}`}
                                    type="submit"
                                    onClick={validateFile}
                                >
                                    {t('UserPage.modalAddPet.btn.done')}
                                </button>
                                <span
                                    className={`${scss.button__primary_not_main} ${scss.modalAdds_page__button}`}
                                    onClick={changeStep}
                                >
                                    {t('UserPage.modalAddPet.btn.back')}
                                </span>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}
export default AddsPetContent
