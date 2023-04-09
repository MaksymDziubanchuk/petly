import scss from './login-page.module.scss'
import AuthForm from 'components/userFolder/AuthForm/AuthForm'
import { useSelector } from 'react-redux'
import base from '../../helpers/container.module.scss'
import { getLoading } from 'redux/selectors/selectors'
import { Spinner } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
    const loading = useSelector(getLoading)
    const { t } = useTranslation()

    return (
        <section className={scss.login__container}>
            <div className={base.container}>
                <div className={scss.login__form__section}>
                    <h1 className={scss.login__tittle}>
                        {t('LoginForm.login')}
                    </h1>
                    <AuthForm />
                    {loading && <Spinner />}
                </div>
            </div>
        </section>
    )
}

export default LoginPage
