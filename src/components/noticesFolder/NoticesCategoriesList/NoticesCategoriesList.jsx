import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NoticesCategoryList from 'components/noticesFolder/NoticesCategoryList/NoticesCategoryList'

import {
    fetchCategoryNotices,
    getAllFavorites,
} from 'redux/operations/noticesOperation'
import {
    getStore,
    getNotices,
    getTotalNotices,
} from 'redux/selectors/noticesSelectors'
import Loader from 'components/utilsFolder/Loader/Loader'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import useAuth from 'redux/utils/useAuth'
import { EmptyFavoriteList } from '../EmptyFavoriteList/EmptyFavoriteList'
import { EmptyOwnList } from '../EmptyOwnList/EmptyOwnList'
import LoadMore from 'components/utilsFolder/LoadMore/LoadMore'
import { Events, scroller } from 'react-scroll'
import { useState, useMemo, useEffect } from 'react'
import { setNameCategory } from 'redux/slices/noticesSlice'
import { useTranslation } from 'react-i18next'

const NoticesCategoriesList = () => {
    const dispatch = useDispatch()
    const { categoryName } = useParams()
    const pets = useSelector(getNotices)
    const totalNotices = useSelector(getTotalNotices)
    const { loading, error } = useSelector(getStore)
    const isLogin = useAuth()
    const [page, setPage] = useState(1)
    const [filterPag, setFilterPag] = useState(1)
    const [name, setName] = useState('sell')
    const limit = 8
    const [searchParams, setSearchParams] = useSearchParams()
    const value = searchParams.get('keyword')
    const { t } = useTranslation()

    const memoizedValue = useMemo(() => {
        const data = {
            categoryName:
                name === categoryName
                    ? name
                    : (setName(categoryName), setPage(1), name),
            page,
            limit,
        }
        return data
    }, [categoryName, page, limit, name])

    useEffect(() => {
        if (isLogin) {
            dispatch(getAllFavorites())
        }
    }, [isLogin, dispatch, name])

    useEffect(() => {
        dispatch(setNameCategory([categoryName, page, filterPag]))
    }, [categoryName, page, filterPag, dispatch])

    useEffect(() => {
        Events.scrollEvent.register('begin', function () {})

        Events.scrollEvent.register('end', function () {})
    }, [])

    useEffect(() => {
        return () => {
            Events.scrollEvent.remove('begin')
            Events.scrollEvent.remove('end')
        }
    })

    useEffect(() => {
        if (!value) {
            setSearchParams({})
            dispatch(fetchCategoryNotices(memoizedValue))
        }
    }, [dispatch, memoizedValue, setSearchParams, value])

    const scrollTo = () => {
        scroller.scrollTo('scroll-to-element', {
            duration: 2000,
            delay: 100,
            smooth: 'easeInOutQuint',
            offset: -150,
        })
    }

    return (
        <>
            {loading && <Loader />}
            {categoryName === 'own' && pets.length === 0 && <EmptyOwnList />}
            {categoryName === 'favorite' && pets.length === 0 && (
                <EmptyFavoriteList />
            )}
            {/* {pets.length === 0 && <EmptyList />} */}
            {pets.length > 0 && <NoticesCategoryList data={memoizedValue} />}
            {totalNotices / 8 > (value ? filterPag : page) ? (
                <LoadMore
                    scroll={scrollTo}
                    changePage={value ? setFilterPag : setPage}
                />
            ) : null}
            {error &&
                Notify.failure(t('NoticesPage.error'), {
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                })}
        </>
    )
}

export default NoticesCategoriesList
