import React from 'react'
import { UserData } from '../../components/userFolder/UserData/UserData'
import Logout from '../../components/userFolder/Logout/Logout'
import PetsData from '../../components/petsUserFolder/PetsData/PetsData'
import DeleteAccount from '../../components/userFolder/DeleteAccount/DeleteAccount'
import scss from '../../helpers/container.module.scss'
import style from './user-page.module.scss'
import { useTranslation } from 'react-i18next'

function UserPage() {
    const { t } = useTranslation()

    return (
        <div className={style.userPage_container}>
            <div className={scss.container}>
                <div className={style.userPage_section}>
                    <h2 className={style.userPage_title}>
                        {t('UserPage.info.title')}:
                    </h2>
                    <div className={style.userData_box}>
                        <UserData />
                        <div className={style.userData_box_btn}>
                            <Logout />
                            <DeleteAccount />
                        </div>
                    </div>
                </div>
                <div className={style.petsData_section}>
                    <PetsData />
                </div>
            </div>
        </div>
    )
}
export default UserPage
