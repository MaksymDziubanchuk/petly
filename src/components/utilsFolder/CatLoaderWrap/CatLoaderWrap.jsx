import CatLoader from '../CatLoader/CatLoader'
import CatLoaderDark from '../CatLoaderDark/CatLoaderDark'

export default function CatLoaderWrap() {
    const theme = localStorage.getItem('app-theme')

    return (
        <div>
            {theme === 'dark' && <CatLoaderDark />}
            {theme === 'light' && <CatLoader />}
        </div>
    )
}
