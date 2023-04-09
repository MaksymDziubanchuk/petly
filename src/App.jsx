import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import operations from './redux/operations/userOperations'
import { getLoading } from 'redux/selectors/selectors'
import CatLoaderWrap from './components/utilsFolder/CatLoaderWrap/CatLoaderWrap'
import UserRoutes from './UserRoutes'
import ScrollToTop from 'components/utilsFolder/ScrollToTop/ScrollToTop'

import { useSearchParams } from 'react-router-dom'

export const App = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const isLoadindUser = useSelector(getLoading)

    const [searchParams] = useSearchParams()
    const usertoken = searchParams.get('token')
    const current = usertoken ? usertoken : token

    useEffect(() => {
        if (current) {
            dispatch(operations.current())
        }
    }, [current, dispatch])

    return (
        <>
            {isLoadindUser ? <CatLoaderWrap /> : <UserRoutes />}
            <ScrollToTop />
        </>
    )
}
