import scss from './load-more.module.scss'
import { Element } from 'react-scroll'
import { useTranslation } from 'react-i18next'

const LoadMore = ({ scroll, changePage }) => {
    const { t } = useTranslation()

    return (
        <div onClick={() => scroll()}>
            <button
                type="button"
                className={scss.buttonLoad}
                onClick={() => changePage(prev => (prev += 1))}
            >
                {t('NoticesPage.loadMore')}
            </button>
            <Element className="element" name="scroll-to-element" />
        </div>
    )
}

export default LoadMore
