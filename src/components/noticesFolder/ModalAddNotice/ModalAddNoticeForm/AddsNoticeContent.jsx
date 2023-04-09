import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import scss from './modal-add-pet-pages.module.scss'
import { addNotice } from 'redux/operations/noticesOperation'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import Loader from 'components/utilsFolder/Loader/Loader'
import SvgInsert from 'components/utilsFolder/Svg/Svg'
import 'flatpickr/dist/themes/airbnb.css'
import Flatpickr from 'react-flatpickr'
import cities from '../../../../helpers/ua.json'
import { useTranslation } from 'react-i18next'

const AddsNoticeContent = ({ close }) => {
    const [sell, setSell] = useState(false)
    const [stepOne, setStepOne] = useState(true)

    const [petCategory, setPetCategory] = useState('')
    const [petName, setPetName] = useState('')
    const [petTitle, setPetTitle] = useState('')
    const [petDate, setPetDate] = useState('')
    const [petBreed, setPetBreed] = useState('')
    const [currentRadioValue, setCurrentRadioValue] = useState('')
    const [petLocation, setPetLocation] = useState('')
    const [petPrice, setPetPrice] = useState(Number)
    const [currencyValue, setCurrencyValue] = useState('UAH')
    const [imageURL, setImageURL] = useState(null)
    const loading = useSelector(state => state.user.loading)

    const dispatch = useDispatch()

    const { t } = useTranslation()

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

    const changeStepOne = e => {
        switch (e.currentTarget.name) {
            case 'title':
                setPetTitle(e.currentTarget.value)
                break
            case 'name':
                setPetName(e.currentTarget.value)
                break
            case 'breed':
                setPetBreed(e.currentTarget.value)
                break
            case 'location':
                setPetLocation(e.currentTarget.value)
                break
            case 'price':
                setPetPrice(e.currentTarget.value)
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
            Notify.warning(t('NoticesPage.modalAddPet.notify.bigSizeImage'), {
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

    const handleSubmitForStepOne = e => {
        e.preventDefault()
        if (petCategory === '') {
            return Notify.warning(
                t('NoticesPage.modalAddPet.notify.petCategoryFalse'),
                {
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                }
            )
        }
        if (petDate === '') {
            return Notify.warning(
                t('NoticesPage.modalAddPet.notify.petBirthFalse'),
                {
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                }
            )
        }
        const form = e.currentTarget
        const { title, name, date, breed } = form.elements
        setPetTitle(title.value)
        setPetName(name.value)
        setPetDate(date.value)
        setPetBreed(breed.value)
        return changeStep()
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (currentRadioValue === '') {
            return Notify.warning(
                t('NoticesPage.modalAddPet.notify.petSexFalse'),
                {
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                }
            )
        }
        if (
            !cities.find(
                city => `${city.city}, ${city.admin_name}` === petLocation
            )
        ) {
            return Notify.warning(
                t('NoticesPage.modalAddPet.notify.petLocationFalse'),
                {
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                }
            )
        }
        const form = e.currentTarget
        const { image, comments } = form.elements
        const data = new FormData()

        data.append('category', petCategory)
        data.append('title', petTitle)

        data.append('name', petName)
        data.append('birthday', petDate)
        data.append('breed', petBreed)
        data.append('location', petLocation)
        data.append('sex', currentRadioValue)
        data.append('price', `${petPrice} ${currencyValue}`)
        data.append('comments', comments.value)
        data.append('image', image.files[0])

        setPetTitle('')
        setPetCategory('')
        setPetBreed('')
        setPetDate('')
        setPetName('')
        setPetLocation('')
        setPetPrice('')
        setCurrentRadioValue('')
        setCurrencyValue('UAH')
        setImageURL(null)
        dispatch(addNotice(data))
        form.reset()
        return close()
    }

    const handleRadioChangeCategory = e => {
        setPetCategory(e.target.value)
        if (e.target.value === 'sell') {
            setSell(true)
        } else {
            setSell(false)
        }
    }

    const handleRadioChange = e => {
        setCurrentRadioValue(e.target.value)
    }

    const validateFile = () => {
        if (!imageURL) {
            return Notify.warning(
                t('NoticesPage.modalAddPet.notify.petImageFalse'),
                {
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                }
            )
        }
    }

    return (
        <>
            {loading && <Loader />}
            <div className={scss.modalAdds_page}>
                <div className={scss.modal_notice__close} onClick={close}>
                    <SvgInsert id="icon-close-add-notice" />
                </div>
                <h3 className={scss.modalAdds_page__tittle}>
                    {t('NoticesPage.modalAddPet.title.addPet')}
                </h3>
                {stepOne && (
                    <>
                        <p
                            className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                        >
                            {t('NoticesPage.modalAddPet.title.category')}{' '}
                            <span className={scss.star}>*</span>
                        </p>
                        <div className={scss.buttonCont}>
                            <input
                                id="lost-found"
                                required
                                name="petCategory"
                                value="lost-found"
                                type="radio"
                                checked={petCategory === 'lost-found'}
                                className={scss.radioButtonInput}
                                onChange={handleRadioChangeCategory}
                            />
                            <label
                                htmlFor="lost-found"
                                className={scss.buttonCategory}
                            >
                                {t('NoticesPage.categories.lostFound')}
                            </label>
                            <input
                                id="for-free"
                                required
                                name="petCategory"
                                value="for-free"
                                type="radio"
                                checked={petCategory === 'for-free'}
                                className={scss.radioButtonInput}
                                onChange={handleRadioChangeCategory}
                            />
                            <label
                                htmlFor="for-free"
                                className={scss.buttonCategory}
                            >
                                {t('NoticesPage.categories.inGoodHands')}
                            </label>
                            <input
                                id="sell"
                                required
                                name="petCategory"
                                value="sell"
                                type="radio"
                                checked={petCategory === 'sell'}
                                className={scss.radioButtonInput}
                                onChange={handleRadioChangeCategory}
                            />
                            <label
                                htmlFor="sell"
                                className={scss.buttonCategory}
                            >
                                {t('NoticesPage.categories.sell')}
                            </label>
                        </div>
                        <form onSubmit={handleSubmitForStepOne}>
                            <label
                                className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                            >
                                {t('NoticesPage.modalAddPet.title.title')}{' '}
                                <span className={scss.star}>*</span>
                            </label>
                            <input
                                className={scss.modalAdds_page__input}
                                name="title"
                                placeholder={t(
                                    'NoticesPage.modalAddPet.ph.title'
                                )}
                                type="text"
                                minLength="2"
                                maxLength="48"
                                required
                                value={petTitle}
                                onChange={changeStepOne}
                            />
                            <label
                                className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                            >
                                {t('NoticesPage.modalAddPet.title.name')}{' '}
                                <span className={scss.star}>*</span>
                            </label>
                            <input
                                className={scss.modalAdds_page__input}
                                name="name"
                                placeholder={t(
                                    'NoticesPage.modalAddPet.ph.name'
                                )}
                                type="text"
                                minLength="2"
                                maxLength="16"
                                required
                                value={petName}
                                onChange={changeStepOne}
                            />
                            <label
                                className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                            >
                                {t('NoticesPage.modalAddPet.title.birth')}{' '}
                                <span className={scss.star}>*</span>
                            </label>
                            <Flatpickr
                                className={scss.modalAdds_page__input}
                                options={{
                                    dateFormat: 'm.d.Y',
                                    maxDate: `${formatDate(dateNow)}`,
                                }}
                                onChange={([date]) => {
                                    setPetDate(formatDate(date))
                                }}
                                name="date"
                                type="text"
                                placeholder={t(
                                    'NoticesPage.modalAddPet.ph.birth'
                                )}
                                value={petDate}
                            />
                            <label
                                className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                            >
                                {t('NoticesPage.modalAddPet.title.breed')}{' '}
                                <span className={scss.star}>*</span>
                            </label>
                            <input
                                className={scss.modalAdds_page__input}
                                type="text"
                                name="breed"
                                placeholder={t(
                                    'NoticesPage.modalAddPet.ph.breed'
                                )}
                                minLength="2"
                                maxLength="24"
                                required
                                value={petBreed}
                                onChange={changeStepOne}
                            />
                            <div className={scss.addPet__button}>
                                <button
                                    className={`${scss.button__primary_main} ${scss.modalAdds_page__button}`}
                                    type="submit"
                                >
                                    {t('NoticesPage.modalAddPet.btn.next')}
                                </button>
                                <span
                                    className={`${scss.button__primary_not_main} ${scss.modalAdds_page__button}`}
                                    onClick={close}
                                >
                                    {t('NoticesPage.modalAddPet.btn.cancel')}
                                </span>
                            </div>
                        </form>
                    </>
                )}
                {!stepOne && (
                    <form
                        id="book-add-form"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <section>
                            <h2
                                className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                            >
                                {t('NoticesPage.modalAddPet.title.sex')}
                                <span className={scss.star}>*</span>:
                            </h2>
                            <div className={scss.radioButtonSection}>
                                <input
                                    required
                                    className={scss.radioButtonInputSex}
                                    type="radio"
                                    name="sex"
                                    value={currentRadioValue}
                                    defaultChecked
                                />
                                <input
                                    id="male"
                                    required
                                    className={scss.radioButtonInputSex}
                                    type="radio"
                                    name="sex"
                                    value="male"
                                    onChange={handleRadioChange}
                                />
                                <label
                                    htmlFor="male"
                                    className={scss.radioButton}
                                >
                                    <SvgInsert id="icon-male" />
                                    {t('NoticesPage.modalAddPet.male')}
                                </label>
                                <input
                                    id="female"
                                    required
                                    className={scss.radioButtonInputSex}
                                    type="radio"
                                    name="sex"
                                    value="female"
                                    onChange={handleRadioChange}
                                />
                                <label
                                    htmlFor="female"
                                    className={scss.radioButton}
                                >
                                    <SvgInsert id="icon-female" />
                                    {t('NoticesPage.modalAddPet.female')}
                                </label>
                            </div>
                        </section>
                        <label
                            className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                        >
                            {t('NoticesPage.modalAddPet.title.location')}
                            <span className={scss.star}>*</span>:
                        </label>
                        <input
                            className={scss.modalAdds_page__input}
                            list="region"
                            name="location"
                            placeholder={t(
                                'NoticesPage.modalAddPet.ph.cityRegion'
                            )}
                            onChange={changeStepOne}
                        />
                        <datalist id="region">
                            {cities.map(city => (
                                <option
                                    key={`${city.city}.${city.lat}`}
                                    value={`${city.city}, ${city.admin_name}`}
                                />
                            ))}
                        </datalist>
                        {sell && (
                            <label
                                className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                            >
                                {t('NoticesPage.modalAddPet.title.price')}
                                <span className={scss.star}>*</span>:
                                <div
                                    className={scss.modalAdds_page__input_price}
                                >
                                    <select
                                        name="currency"
                                        className={
                                            scss.modalAdds_page__input_select
                                        }
                                        onChange={e => {
                                            setCurrencyValue(e.target.value)
                                        }}
                                    >
                                        <option value="UAH">UAH</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                    <input
                                        className={
                                            scss.modalAdds_page__input_select
                                        }
                                        type="number"
                                        name="price"
                                        min="1"
                                        required
                                        placeholder={t(
                                            'NoticesPage.modalAddPet.ph.price'
                                        )}
                                        value={petPrice}
                                        onChange={changeStepOne}
                                    />
                                </div>
                            </label>
                        )}
                        <div className={scss.add__pet__container}>
                            <p
                                className={`${scss.modalAdds_page__label} ${scss.modalAdds_page_box}`}
                            >
                                {t('NoticesPage.modalAddPet.title.loadImage')}{' '}
                                <span className={scss.star}>*</span>
                            </p>
                            <input
                                className={scss.addspet__imgInput}
                                type="file"
                                name="image"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                id="img"
                                required
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
                                {t('NoticesPage.modalAddPet.title.comments')}{' '}
                                <span className={scss.star}>*</span>
                            </label>
                            <textarea
                                className={scss.modalAdds_commit}
                                type="text"
                                name="comments"
                                placeholder={t(
                                    'NoticesPage.modalAddPet.ph.comment'
                                )}
                                required
                                minLength="8"
                                maxLength="120"
                            />
                            <div className={scss.addPet__button}>
                                <button
                                    className={`${scss.button__primary_main} ${scss.modalAdds_page__button}`}
                                    type="submit"
                                    onClick={validateFile}
                                >
                                    {t('NoticesPage.modalAddPet.btn.done')}
                                </button>
                                <span
                                    className={`${scss.button__primary_not_main} ${scss.modalAdds_page__button}`}
                                    onClick={changeStep}
                                >
                                    {t('NoticesPage.modalAddPet.btn.back')}
                                </span>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}
export default AddsNoticeContent
