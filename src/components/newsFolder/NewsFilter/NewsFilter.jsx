import PropTypes from 'prop-types'
import s from './newsFilter.module.scss'
import SvgInsert from 'components/utilsFolder/Svg/Svg'
import { useTranslation } from 'react-i18next'

export default function NewsFilter({
    input,
    onChange,
    resetInput,
    inputValue,
}) {
    const { t } = useTranslation()

    return (
        <div className={s.search}>
            <input
                className={s.search_input}
                type="text"
                placeholder={t('NewsPage.search')}
                name="filter"
                onInput={onChange}
                value={input}
            />
            <div className={s.icon}>
                {inputValue && (
                    <div onClick={() => resetInput()}>
                        <SvgInsert id="icon-reset-search" />
                    </div>
                )}
                {!inputValue && <SvgInsert id="icon-search-news" />}
            </div>
        </div>
    )
}

NewsFilter.propTypes = {
    input: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}
