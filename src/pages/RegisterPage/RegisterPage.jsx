import scss from './register-page.module.scss'
import base from '../../helpers/container.module.scss'
import AuthForm from 'components/userFolder/AuthForm/AuthForm'
import { useTranslation } from 'react-i18next'

const RegisterPage = () => {
    const { t } = useTranslation()

    return (
        <section className={scss.register__container}>
            <div className={base.container}>
                <div className={scss.register__section}>
                    <h1 className={scss.register__tittle}>
                        {t('AuthForm.registration')}
                    </h1>
                    <AuthForm />
                </div>
            </div>
        </section>
    )
}

export default RegisterPage
