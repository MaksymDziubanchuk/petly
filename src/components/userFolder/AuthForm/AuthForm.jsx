import scss from './auth-form.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import operations from '../../../redux/operations/userOperations'
import GoogleAuth from '../../headerFolder/Nav/GoogleNav/GoogleNav'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import Loader from 'components/utilsFolder/Loader/Loader'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import SvgInsert from 'components/utilsFolder/Svg/Svg'
import cities from '../../../helpers/ua.json'
import { useTranslation } from 'react-i18next'

const AuthForm = () => {
    const [stepOne, setStepOne] = useState(true)
    const [onShowPassword, setOnShowPassword] = useState(false)
    const [onShowConfirmPassword, setOnShowConfirmPassword] = useState(false)
    const [coordination, setCoordination] = useState(false)
    const [valuePassword, setValuePassword] = useState('')
    const [valueConfirmPassword, setValueConfirmPassword] = useState('')
    const [tokenForResetPassword, setTokenForResetPassword] = useState('')
    const location = useLocation()
    const page = location.pathname
    const { token } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        if (
            page !== '/register' &&
            page !== '/login' &&
            page !== '/verify' &&
            page !== '/reset-password'
        ) {
            setTokenForResetPassword(token)
        }
    }, [page, token])

    const handleChangePassword = e => {
        switch (e.target.name) {
            case 'password':
                setValuePassword(e.target.value)
                break
            case 'passwordConfirm':
                setValueConfirmPassword(e.target.value)
                break
            case 'coordination':
                setCoordination(e.target.checked)
                break
            default:
                return
        }
    }

    const loading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch()

    const onLogin = data => {
        dispatch(operations.login(data))
    }

    const initialValue = {
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        region: '',
        number: '',
    }

    const schemasForStepFirst = Yup.object().shape({
        email: Yup.string()
            .email()
            .min(10, t('AuthForm.error.passwordMin'))
            .max(63, t('AuthForm.error.passwordMax')),
        password: Yup.string().required().min(7).max(32),
        passwordConfirm: Yup.string().required(),
    })

    function validatePassword(value) {
        let error
        if (!value) {
            error = t('AuthForm.error.passwordFalse')
        } else if (value.includes(' ')) {
            error = t('AuthForm.error.spaces')
        }
        return error
    }

    function validateEmail(value) {
        let error
        if (!value) {
            error = t('AuthForm.error.emailFalse')
        } else if (
            !/^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/i.test(
                value
            )
        ) {
            error = t('AuthForm.error.emailSymbol')
        }
        return error
    }

    const schemasForStepSecond = Yup.object().shape({
        name: Yup.string().required(t('AuthForm.error.name')),
        region: Yup.string().required(t('AuthForm.error.region')),
        number: Yup.string()
            .matches(/[0-9]/, t('AuthForm.error.numberFormat'))
            .required(t('AuthForm.error.numberFalse'))
            .min(9, t('AuthForm.error.numberMin'))
            .max(9, t('AuthForm.error.numberMax')),
    })

    const schemasForLogin = Yup.object().shape({
        email: Yup.string().email().required().min(10).max(63),
        password: Yup.string().required().min(7).max(32),
    })

    const handleSubmitForRegister = (values, actions) => {
        if (stepOne) {
            if (values.password !== values.passwordConfirm) {
                return Notify.failure(t('AuthForm.error.passwordsSameValue'), {
                    timeout: 6000,
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                })
            }
            return setStepOne(false)
        }
        if (!stepOne) {
            if (
                !cities.find(
                    city => `${city.city}, ${city.admin_name}` === values.region
                )
            ) {
                return Notify.failure(t('AuthForm.error.regionList'), {
                    timeout: 6000,
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                })
            }

            const user = {
                email: values.email,
                password: values.password,
                name: values.name,
                city: values.region,
                phone: `380${values.number}`,
            }
            actions.resetForm()
            setStepOne(true)
            return dispatch(operations.registerNewUser(user))
        }
    }

    const handleSubmitForLogin = (values, actions) => {
        const user = {
            email: values.email,
            password: values.password,
        }
        actions.resetForm()
        return onLogin(user)
    }

    const backButtonClick = () => {
        if (!stepOne) {
            return setStepOne(true)
        }
    }

    const showPassword = () => {
        return setOnShowPassword(!onShowPassword)
    }
    const showConfirmPassword = () => {
        return setOnShowConfirmPassword(!onShowConfirmPassword)
    }

    const btnAuthVerify = (values, actions) => {
        const user = {
            email: values.email,
            password: values.password,
        }
        actions.resetForm()
        return dispatch(operations.authVerify(user))
    }

    const resetPassword = (values, actions) => {
        const userEmail = {
            email: values.email,
        }
        actions.resetForm()
        return dispatch(operations.resetUserPassword(userEmail))
    }

    const handleSubmitForChangePassword = (values, actions) => {
        if (values.password !== values.passwordConfirm) {
            return Notify.failure(t('AuthForm.error.passwordsSameValue'), {
                timeout: 6000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        }
        const infoForUpdatePassword = {
            userToken: tokenForResetPassword,
            userNewPassword: {
                password: values.password,
            },
        }
        actions.resetForm()
        setValuePassword('')
        setValueConfirmPassword('')
        setTokenForResetPassword('')
        dispatch(operations.refreshPassword(infoForUpdatePassword))
        return navigate('/login')
    }

    return (
        <>
            {loading && <Loader />}
            {page === '/register' && (
                <>
                    {stepOne ? (
                        <Formik
                            validationSchema={schemasForStepFirst}
                            initialValues={initialValue}
                            onSubmit={handleSubmitForRegister}
                        >
                            <Form
                                className={scss.form__container}
                                autoComplete="off"
                                onChange={handleChangePassword}
                            >
                                <div className={scss.form__input_container}>
                                    <Field
                                        className={scss.form__input}
                                        type="email"
                                        name="email"
                                        validate={validateEmail}
                                        placeholder=" "
                                    />
                                    <label className={scss.form__label}>
                                        {t('AuthForm.stepOne.email')}
                                    </label>
                                    <ErrorMessage
                                        name="email"
                                        render={msg => (
                                            <p className={scss.error__mesage}>
                                                {msg}
                                            </p>
                                        )}
                                    />
                                </div>
                                <div className={scss.form__input_container}>
                                    <Field
                                        className={scss.form__input}
                                        type={
                                            !onShowPassword
                                                ? 'password'
                                                : 'text'
                                        }
                                        name="password"
                                        validate={validatePassword}
                                        placeholder=" "
                                    />
                                    <label className={scss.form__label}>
                                        {t('AuthForm.stepOne.password')}
                                    </label>
                                    {valuePassword.length >= 1 && (
                                        <span
                                            className={
                                                scss.form__input__password_show
                                            }
                                            onClick={showPassword}
                                        >
                                            {!onShowPassword ? (
                                                <SvgInsert id="eye" />
                                            ) : (
                                                <SvgInsert id="eye-blocked" />
                                            )}
                                        </span>
                                    )}
                                    <ErrorMessage
                                        name="password"
                                        render={msg => (
                                            <p className={scss.error__mesage}>
                                                {msg}
                                            </p>
                                        )}
                                    />
                                </div>
                                <div className={scss.form__input_container}>
                                    <Field
                                        className={scss.form__input}
                                        type={
                                            !onShowConfirmPassword
                                                ? 'password'
                                                : 'text'
                                        }
                                        name="passwordConfirm"
                                        placeholder=" "
                                        validate={validatePassword}
                                    />
                                    <label className={scss.form__label}>
                                        {t('AuthForm.stepOne.passwordTwo')}
                                    </label>
                                    {valueConfirmPassword.length >= 1 && (
                                        <span
                                            className={
                                                scss.form__input__password_show
                                            }
                                            onClick={showConfirmPassword}
                                        >
                                            {!onShowConfirmPassword ? (
                                                <SvgInsert id="eye" />
                                            ) : (
                                                <SvgInsert id="eye-blocked" />
                                            )}
                                        </span>
                                    )}
                                    <ErrorMessage
                                        name="passwordConfirm"
                                        render={msg => (
                                            <p className={scss.error__mesage}>
                                                {msg}
                                            </p>
                                        )}
                                    />
                                </div>
                                <div className={scss.coordination__box}>
                                    <Field
                                        className={scss.coordination__box_input}
                                        type="checkbox"
                                        name="coordination"
                                        id="coordination"
                                    />
                                    <label
                                        className={scss.coordination__box_title}
                                        htmlFor="coordination"
                                    >
                                        {t('AuthForm.stepOne.confirm')}{' '}
                                        <a
                                            href="https://www.google.com.ua/"
                                            className={
                                                scss.coordination__box_link
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t('AuthForm.stepOne.confirmLink')}
                                        </a>
                                    </label>
                                </div>
                                <button
                                    className={`${scss.button__primary_main} ${scss.form__button}`}
                                    type="submit"
                                    disabled={!coordination}
                                >
                                    {t('AuthForm.stepOne.btnNext')}
                                </button>
                                <GoogleAuth />
                            </Form>
                        </Formik>
                    ) : (
                        <Formik
                            validationSchema={schemasForStepSecond}
                            initialValues={initialValue}
                            onSubmit={handleSubmitForRegister}
                            autoComplete="off"
                        >
                            <Form className={scss.form__container}>
                                <div className={scss.form__input_container}>
                                    <Field
                                        className={scss.form__input}
                                        type="text"
                                        name="name"
                                        placeholder=" "
                                        required
                                    />
                                    <label className={scss.form__label}>
                                        {t('AuthForm.stepTwo.name')}
                                    </label>
                                    <ErrorMessage
                                        name="name"
                                        render={msg => (
                                            <p className={scss.error__mesage}>
                                                {msg}
                                            </p>
                                        )}
                                    />
                                </div>
                                <div className={scss.form__input_container}>
                                    <Field
                                        className={scss.form__input}
                                        name="region"
                                        list="region"
                                        type="text"
                                        placeholder=" "
                                    />
                                    <datalist id="region">
                                        {cities.map(city => (
                                            <option
                                                key={`${city.city}.${city.lat}`}
                                            >
                                                {city.city}, {city.admin_name}
                                            </option>
                                        ))}
                                    </datalist>
                                    <label className={scss.form__label}>
                                        {t('AuthForm.stepTwo.cityRegion')}
                                    </label>
                                    <ErrorMessage
                                        name="region"
                                        render={msg => (
                                            <p className={scss.error__mesage}>
                                                {msg}
                                            </p>
                                        )}
                                    />
                                </div>
                                <div className={scss.form__input_container}>
                                    <Field
                                        className={`${scss.form__input} ${scss.form__input_phone}`}
                                        type="tel"
                                        name="number"
                                        placeholder=" "
                                    />
                                    <span className={scss.form__input_number}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="25"
                                            height="20"
                                        >
                                            <rect
                                                width="25"
                                                height="10"
                                                fill="#005BBB"
                                            />
                                            <rect
                                                width="25"
                                                height="10"
                                                y="10"
                                                fill="#FFD500"
                                            />
                                        </svg>
                                        <p>+380</p>
                                    </span>
                                    <label className={scss.form__label}>
                                        {t('AuthForm.stepTwo.phone')}
                                    </label>
                                    <ErrorMessage
                                        name="number"
                                        render={msg => (
                                            <p className={scss.error__mesage}>
                                                {msg}
                                            </p>
                                        )}
                                    />
                                </div>
                                <span
                                    className={`${scss.button__primary_not_main} ${scss.form__back_button}`}
                                    onClick={backButtonClick}
                                >
                                    &#5130; {t('AuthForm.stepTwo.btnBack')}
                                </span>
                                <button
                                    className={`${scss.button__primary_main} ${scss.form__button}`}
                                    type="submit"
                                >
                                    {t('AuthForm.stepTwo.btnRegister')}
                                </button>
                                <GoogleAuth />
                            </Form>
                        </Formik>
                    )}
                    <p className={scss.form__description}>
                        {t('AuthForm.haveAccount')}{' '}
                        <NavLink className={scss.description__nav} to="/login">
                            {t('AuthForm.login')}
                        </NavLink>
                    </p>
                </>
            )}
            {page === '/login' && (
                <>
                    <Formik
                        validationSchema={schemasForLogin}
                        initialValues={initialValue}
                        onSubmit={handleSubmitForLogin}
                    >
                        <Form
                            className={scss.form__container}
                            autoComplete="off"
                            onChange={handleChangePassword}
                        >
                            <div className={scss.form__input_container}>
                                <Field
                                    className={scss.form__input}
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                />
                                <label className={scss.form__label}>
                                    {t('LoginForm.email')}
                                </label>
                                <ErrorMessage
                                    name="email"
                                    render={msg => (
                                        <p className={scss.error__mesage}>
                                            {msg}
                                        </p>
                                    )}
                                />
                            </div>
                            <div className={scss.form__input_container}>
                                <Field
                                    className={`${scss.form__input} ${scss.form__login__input}`}
                                    type={!onShowPassword ? 'password' : 'text'}
                                    name="password"
                                    placeholder=" "
                                    validate={validatePassword}
                                />
                                <label className={scss.form__label}>
                                    {t('LoginForm.password')}
                                </label>
                                {valuePassword.length >= 1 && (
                                    <span
                                        className={
                                            scss.form__input__password_show
                                        }
                                        onClick={showPassword}
                                    >
                                        {!onShowPassword ? (
                                            <SvgInsert id="eye" />
                                        ) : (
                                            <SvgInsert id="eye-blocked" />
                                        )}
                                    </span>
                                )}
                                <ErrorMessage
                                    name="password"
                                    render={msg => (
                                        <p className={scss.error__mesage}>
                                            {msg}
                                        </p>
                                    )}
                                />
                            </div>
                            <button
                                className={`${scss.button__primary_main} ${scss.form__button}`}
                                type="submit"
                            >
                                {t('LoginForm.btnLogin')}
                            </button>
                            <p className={scss.form__description}>
                                {t('LoginForm.resendVerification')}{' '}
                                <NavLink
                                    to="/verify"
                                    className={scss.description__nav}
                                >
                                    {t('LoginForm.here')}
                                </NavLink>
                            </p>
                            <p
                                className={`${scss.form__description} ${scss.form__description_reset}`}
                            >
                                {t('LoginForm.forgotPassword')}{' '}
                                <NavLink
                                    to="/reset-password"
                                    className={scss.description__nav}
                                >
                                    {t('LoginForm.here')}
                                </NavLink>
                            </p>
                            <GoogleAuth />
                        </Form>
                    </Formik>
                    <p className={scss.form__description}>
                        {t('LoginForm.notAccount')}{' '}
                        <NavLink
                            to="/register"
                            className={scss.description__nav}
                        >
                            {t('LoginForm.register')}
                        </NavLink>
                    </p>
                </>
            )}
            {page === '/verify' && (
                <>
                    <Formik
                        validationSchema={schemasForLogin}
                        initialValues={initialValue}
                        onSubmit={btnAuthVerify}
                    >
                        <Form
                            className={scss.form__container}
                            autoComplete="off"
                            onChange={handleChangePassword}
                        >
                            <div className={scss.form__input_container}>
                                <Field
                                    className={scss.form__input}
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                />
                                <label className={scss.form__label}>
                                    {t('VerifyForm.email')}
                                </label>
                                <ErrorMessage
                                    name="email"
                                    render={msg => (
                                        <p className={scss.error__mesage}>
                                            {msg}
                                        </p>
                                    )}
                                />
                            </div>
                            <div className={scss.form__input_container}>
                                <Field
                                    className={`${scss.form__input} ${scss.form__login__input}`}
                                    type="password"
                                    name="password"
                                    placeholder=" "
                                    validate={validatePassword}
                                />
                                <label className={scss.form__label}>
                                    {t('VerifyForm.password')}
                                </label>
                                {valuePassword.length >= 1 && (
                                    <span
                                        className={
                                            scss.form__input__password_show
                                        }
                                        onClick={showPassword}
                                    >
                                        {!onShowPassword ? (
                                            <SvgInsert id="eye" />
                                        ) : (
                                            <SvgInsert id="eye-blocked" />
                                        )}
                                    </span>
                                )}
                                <ErrorMessage
                                    name="password"
                                    render={msg => (
                                        <p className={scss.error__mesage}>
                                            {msg}
                                        </p>
                                    )}
                                />
                            </div>

                            <button
                                className={`${scss.button__primary_main} ${scss.form__button}`}
                                type="submit"
                            >
                                {t('VerifyForm.verify')}
                            </button>
                        </Form>
                    </Formik>

                    <p className={scss.form__description}>
                        {t('VerifyForm.back')}{' '}
                        <NavLink to="/login" className={scss.description__nav}>
                            {t('VerifyForm.login')}
                        </NavLink>
                    </p>
                </>
            )}
            {page === '/reset-password' && (
                <>
                    <Formik
                        initialValues={initialValue}
                        onSubmit={resetPassword}
                    >
                        <Form className={scss.form__container}>
                            <p className={scss.form__description_recover}>
                                {t('ResetPasswordForm.title')}
                            </p>
                            <div className={scss.form__input_container}>
                                <Field
                                    className={scss.form__input}
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    validate={validateEmail}
                                />
                                <label className={scss.form__label}>
                                    {t('ResetPasswordForm.email')}
                                </label>
                                <ErrorMessage
                                    name="email"
                                    render={msg => (
                                        <p className={scss.error__mesage}>
                                            {msg}
                                        </p>
                                    )}
                                />
                            </div>
                            <button
                                className={`${scss.button__primary_main} ${scss.form__button}`}
                                type="submit"
                            >
                                {t('ResetPasswordForm.resetPassword')}
                            </button>
                        </Form>
                    </Formik>

                    <p className={scss.form__description}>
                        {t('ResetPasswordForm.back')}{' '}
                        <NavLink to="/login" className={scss.description__nav}>
                            {t('ResetPasswordForm.login')}
                        </NavLink>
                    </p>
                </>
            )}
            {page !== '/register' &&
                page !== '/login' &&
                page !== '/verify' &&
                page !== '/reset-password' && (
                    <Formik
                        validationSchema={schemasForStepFirst}
                        initialValues={initialValue}
                        onSubmit={handleSubmitForChangePassword}
                    >
                        <Form
                            className={scss.form__container}
                            autoComplete="off"
                            onChange={handleChangePassword}
                        >
                            <div className={scss.form__input_container}>
                                <Field
                                    className={scss.form__input}
                                    type={!onShowPassword ? 'password' : 'text'}
                                    name="password"
                                    validate={validatePassword}
                                    placeholder=" "
                                />
                                <label className={scss.form__label}>
                                    {t('changePasswordForm.password')}
                                </label>
                                {valuePassword.length >= 1 && (
                                    <span
                                        className={
                                            scss.form__input__password_show
                                        }
                                        onClick={showPassword}
                                    >
                                        {!onShowPassword ? (
                                            <SvgInsert id="eye" />
                                        ) : (
                                            <SvgInsert id="eye-blocked" />
                                        )}
                                    </span>
                                )}
                                <ErrorMessage
                                    name="password"
                                    render={msg => (
                                        <p className={scss.error__mesage}>
                                            {msg}
                                        </p>
                                    )}
                                />
                            </div>
                            <div className={scss.form__input_container}>
                                <Field
                                    className={scss.form__input}
                                    type={
                                        !onShowConfirmPassword
                                            ? 'password'
                                            : 'text'
                                    }
                                    name="passwordConfirm"
                                    placeholder=" "
                                    validate={validatePassword}
                                />
                                <label className={scss.form__label}>
                                    {t('changePasswordForm.confirmPassword')}
                                </label>
                                {valueConfirmPassword.length >= 1 && (
                                    <span
                                        className={
                                            scss.form__input__password_show
                                        }
                                        onClick={showConfirmPassword}
                                    >
                                        {!onShowConfirmPassword ? (
                                            <SvgInsert id="eye" />
                                        ) : (
                                            <SvgInsert id="eye-blocked" />
                                        )}
                                    </span>
                                )}
                                <ErrorMessage
                                    name="passwordConfirm"
                                    render={msg => (
                                        <p className={scss.error__mesage}>
                                            {msg}
                                        </p>
                                    )}
                                />
                            </div>
                            <button
                                className={`${scss.button__primary_main} ${scss.form__button}`}
                                type="submit"
                            >
                                {t('changePasswordForm.changePassword')}
                            </button>
                        </Form>
                    </Formik>
                )}
        </>
    )
}

export default AuthForm
