import scss from './recover-password-page.module.scss'
import AuthForm from 'components/userFolder/AuthForm/AuthForm'
import { useSelector } from 'react-redux'

import { getLoading } from 'redux/selectors/selectors'
import { Spinner } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const RecoverPasswordPage = () => {
    const loading = useSelector(getLoading)
    const { t } = useTranslation()

    return (
        <section className={scss.reset__password__container}>
            <div className={scss.reset__password__form__section}>
                <h1 className={scss.reset__password__tittle}>
                    {t('changePasswordForm.recoverPassword')}
                </h1>
                <AuthForm />
                {loading && <Spinner />}
            </div>
        </section>
    )
}

export default RecoverPasswordPage
