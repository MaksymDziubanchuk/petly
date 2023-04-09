import scss from './notices-search.module.scss'
import SvgInsert from 'components/utilsFolder/Svg/Svg'
import { getSearch } from '../../../redux/operations/noticesOperation'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { Notify } from 'notiflix'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const NoticesSearch = () => {
    const { categoryName } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const pagination = useSelector(state => state.notices.nameCategory[2])
    const limit = 8
    const dispatch = useDispatch()
    const value = searchParams.get('keyword')

    useEffect(() => {
        if (pagination > 1 && value) {
            const data = {
                value,
                categoryName,
                page: pagination,
                limit,
            }
            dispatch(getSearch(data))
        }
    }, [pagination, dispatch, categoryName, value])

    const getSearchWord = async value => {
        if (!value) {
            Notify.failure(t('NoticesPage.searchError'), {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
            return
        }
        const data = {
            value,
            categoryName,
            page: pagination,
            limit,
        }
        await dispatch(getSearch(data))
    }

    const { t } = useTranslation()

    return (
        <div className={scss.wrapperSearch}>
            <input
                className={scss.searchInput}
                type="text"
                placeholder={t('NoticesPage.search')}
                name="search"
                onChange={e =>
                    setSearchParams({ keyword: e.currentTarget.value })
                }
                value={value === null ? '' : value}
            />
            <button
                type="button"
                className={scss.get_searct_btn}
                onClick={() => getSearchWord(value)}
            >
                <SvgInsert id="icon-search" />
            </button>
        </div>
    )
}

export default NoticesSearch
