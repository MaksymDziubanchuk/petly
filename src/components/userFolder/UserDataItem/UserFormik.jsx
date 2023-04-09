import scss from './user-data-item.module.scss'
import SvgInsert from '../../utilsFolder/Svg/Svg'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import operations from 'redux/operations/userOperations'
import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import 'flatpickr/dist/themes/airbnb.css'
import Flatpickr from 'react-flatpickr'
import { useTranslation } from 'react-i18next'

const { REACT_APP_BASE_URL } = process.env
axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`

export function UserFormik() {
    const dispatch = useDispatch()
    const userInStore = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userBirthday, setUserBirthday] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userCity, setUserCity] = useState('')
    const dateNow = new Date()

    const { t } = useTranslation()

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

    useEffect(() => {
        if (token !== undefined) {

            fetch(`${REACT_APP_BASE_URL}/api/users/current`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setUserName(data.name)
                    setUserEmail(data.email)
                    setUserBirthday(
                        data.birthday !== undefined
                            ? formatDate(data.birthday)
                            : '00.00.0000'
                    )
                    setUserPhone(data.phone)
                    setUserCity(data.city)
                })
                .catch(error => {
                    Notify.failure(`${error.message}`)
                })
            return
        } else {
            setUserName(userInStore.name)
            setUserEmail(userInStore.email)
            setUserBirthday(
                userInStore.birthday !== undefined
                    ? formatDate(userInStore.birthday)
                    : '00.00.0000'
            )
            setUserPhone(userInStore.phone)
            setUserCity(userInStore.city)
        }
    }, [userInStore, token])

    const handleChange = e => {
        switch (e.currentTarget.name) {
            case 'name':
                setUserName(e.currentTarget.value)
                break

            case 'phone':
                setUserPhone(e.currentTarget.value)
                break

            case 'city':
                setUserCity(e.currentTarget.value)
                break

            default:
                return
        }
    }

    const [active, setActive] = useState('')

    const changeIcon = name => {
        if (active === name) {
            return setActive('')
        }
        setActive(name)
    }

    const toggleIcon = name => {
        if (active === name) {
            return <SvgInsert id="icon-done" />
        } else {
            return <SvgInsert id="icon-edit-active" />
        }
    }

    const handleSubmitName = e => {
        e.preventDefault()
        const form = e.currentTarget
        const { name } = form.elements
        if (!name.disabled) {
            return
        }
        if (!name.value) {
            return Notify.failure(t('UserPage.error.required'), {
                timeout: 5000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        }
        return dispatch(operations.updateUser({ name: name.value }))
    }

    const handleSubmitBirthday = e => {
        e.preventDefault()
        const form = e.currentTarget
        const { birthday } = form.elements
        if (!birthday.disabled) {
            return
        }
        if (!birthday.value) {
            return Notify.failure(t('UserPage.error.required'), {
                timeout: 5000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        }
        return dispatch(operations.updateUser({ birthday: birthday.value }))
    }

    const handleSubmitPhone = e => {
        e.preventDefault()
        const form = e.currentTarget
        const { phone } = form.elements
        if (!phone.disabled) {
            return
        }
        if (!phone.value) {
            return Notify.failure(t('UserPage.error.required'), {
                timeout: 5000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        }
        if (phone.value.length !== 12) {
            return Notify.failure(t('UserPage.error.numberFormat'), {
                timeout: 5000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        }
        if (
            !/^3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/.test(
                phone.value
            )
        ) {
            return Notify.failure(t('UserPage.error.numberFormat'), {
                timeout: 5000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        } else {
            return dispatch(operations.updateUser({ phone: phone.value }))
        }
    }

    const handleSubmitCity = e => {
        e.preventDefault()
        const form = e.currentTarget
        const { city } = form.elements
        if (!city.disabled) {
            return
        }
        if (!city.value) {
            return Notify.failure(t('UserPage.error.required'), {
                timeout: 5000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        }
        if (!/^[aA-zZ]/.test(city.value)) {
            return Notify.failure(t('UserPage.error.onlyLetters'), {
                timeout: 5000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        } else {
            return dispatch(operations.updateUser({ city: city.value }))
        }
    }

    return (
        <>
            <div className={scss.userDataForm_box}>
                    <>
                        <form onSubmit={handleSubmitName}>
                            <div className={scss.field_box}>
                                <label className={scss.userDataForm_label}>
                                    {t('UserPage.info.card.name')}:
                                </label>
                                {active && active === 'name' ? (
                                    <input
                                        onChange={handleChange}
                                        type="name"
                                        name="name"
                                        value={userName}
                                        className={
                                            scss.userDataForm_field_active
                                        }
                                    />
                                ) : (
                                    <input
                                        onChange={handleChange}
                                        type="name"
                                        name="name"
                                        value={userName}
                                        disabled
                                        className={scss.userDataForm_field}
                                    />
                                )}
                                <button
                                    className={scss.iconEdit_btn}
                                    onClick={() => changeIcon('name')}
                                    type="submit"
                                >
                                    {active ? (
                                        toggleIcon('name')
                                    ) : (
                                        <SvgInsert id="icon-edit" />
                                    )}
                                </button>
                            </div>
                        </form>

                        <form>
                            <div
                                className={`${scss.field_box_email} ${scss.field_box}`}
                            >
                                <label className={scss.userDataForm_label}>
                                    {t('UserPage.info.card.email')}:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userEmail}
                                    disabled
                                    className={scss.userDataForm_field}
                                />
                                <button className={scss.iconEdit_btn} style={{pointerEvents: 'none'}}>
                                    <SvgInsert id="icon-email"/>
                                </button>
                            </div>
                        </form>

                        <form onSubmit={handleSubmitBirthday}>
                            <div className={scss.field_box}>
                                <label className={scss.userDataForm_label}>
                                    {t('UserPage.info.card.birthday')}:
                                </label>
                                {active && active === 'birthday' ? (
                                    <Flatpickr
                                        options={{
                                            dateFormat: 'm.d.Y',
                                            maxDate: `${formatDate(dateNow)}`,
                                        }}
                                        onChange={([date]) => {
                                            setUserBirthday(formatDate(date))
                                        }}
                                        name="birthday"
                                        value={userBirthday}
                                        style={{cursor:'auto'}}
                                        className={scss.userDataForm_field_active}
                                    />
                                ) : (
                                    <Flatpickr
                                        name="birthday"
                                        value={userBirthday}
                                        disabled
                                        style={{cursor:'auto'}}
                                        className={scss.userDataForm_field}
                                    />
                                )}
                                <button
                                    className={scss.iconEdit_btn}
                                    onClick={() => changeIcon('birthday')}
                                >
                                    {active ? (
                                        toggleIcon('birthday')
                                    ) : (
                                        <SvgInsert id="icon-edit" />
                                    )}
                                </button>
                            </div>
                        </form>

                        <form onSubmit={handleSubmitPhone}>
                            <div className={scss.field_box}>
                                <label className={scss.userDataForm_label}>
                                    {t('UserPage.info.card.phone')}:
                                </label>
                                {active && active === 'phone' ? (
                                    <input
                                        onChange={handleChange}
                                        type="tel"
                                        name="phone"
                                        value={userPhone}
                                        className={
                                            scss.userDataForm_field_active
                                        }
                                    />
                                ) : (
                                    <>
                                        <span
                                            className={scss.inputNumber}
                                        ></span>
                                        <input
                                            onChange={handleChange}
                                            type="tel"
                                            name="phone"
                                            value={userPhone}
                                            disabled
                                            className={`${scss.userDataForm_field} ${scss.userDataForm_number}`}
                                        />
                                    </>
                                )}
                                <button
                                    className={scss.iconEdit_btn}
                                    onClick={() => changeIcon('phone')}
                                    type="submit"
                                >
                                    {active ? (
                                        toggleIcon('phone')
                                    ) : (
                                        <SvgInsert id="icon-edit" />
                                    )}
                                </button>
                            </div>
                        </form>

                        <form onSubmit={handleSubmitCity}>
                            <div className={scss.field_box}>
                                <label className={scss.userDataForm_label}>
                                    {t('UserPage.info.card.city')}:
                                </label>
                                {active && active === 'city' ? (
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="city"
                                        value={userCity}
                                        className={
                                            scss.userDataForm_field_active
                                        }
                                    />
                                ) : (
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="city"
                                        value={userCity}
                                        disabled
                                        className={scss.userDataForm_field}
                                    />
                                )}
                                <button
                                    className={scss.iconEdit_btn}
                                    onClick={() => changeIcon('city')}
                                >
                                    {active ? (
                                        toggleIcon('city')
                                    ) : (
                                        <SvgInsert id="icon-edit" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                {/* )} */}
            </div>
        </>
    )
}
