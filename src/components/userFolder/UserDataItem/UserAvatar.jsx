import scss from './user-data-item.module.scss'
import SvgInsert from '../../utilsFolder/Svg/Svg'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { useSelector, useDispatch } from 'react-redux'
import operations from 'redux/operations/userOperations'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useTranslation } from 'react-i18next'

const { REACT_APP_BASE_URL } = process.env
axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`

export default function UserAvatar() {
    const userInStore = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const usertoken = searchParams.get('token')

    const { t } = useTranslation()

    const current = usertoken ? usertoken : token

    const defaultImg =
        'https://dummyimage.com/150x150/FDF7F2.gif&text=Add+your+photo!'

    const handleImageChange = e => {
        const reader = new FileReader()
        const file = e.target.files[0]
        if (file?.size > 5242880) {
            Notify.warning(t('UserPage.modalAddPet.bigSizeImage'), {
                timeout: 5000,
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })

            return
        }

        setLoading(true)

        reader.onloadend = async () => {
            await dispatch(operations.updateUserAvatar(file))
            setLoading(false)
        }

        if (current !== undefined) {
            reader.readAsDataURL(file)
        } else {
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            {loading && (
                <div className={scss.loader_oval_avatar}>
                    <Oval
                        height={40}
                        width={40}
                        color="#F59256"
                        wrapperStyle={{}}
                        wrapperClass={scss.loaderAvatar}
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#F59256"
                        strokeWidth={4}
                        strokeWidthSecondary={2}
                    />
                </div>
            )}

            <div className={scss.userItem_box_yourPhoto}>
                <img
                    className={scss.userItem__yourPhoto}
                    src={userInStore.avatar ? userInStore.avatar : defaultImg}
                    alt=""
                />
                <div className={scss.userItem_box_btnPhoto}>
                    <input
                        className={scss.userItem_input_edit_photo}
                        type="file"
                        name="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        id="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="file" className={scss.userItem_edit_photo}>
                        <SvgInsert id="icon-edit-avatar" />
                        {t('UserPage.info.btn.editPhoto')}
                    </label>
                </div>
            </div>
        </>
    )
}
