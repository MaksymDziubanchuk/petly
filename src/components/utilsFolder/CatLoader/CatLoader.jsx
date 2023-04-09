import scss from './cat-loader.module.scss'

export default function CatLoader() {
    return (
        <div className={scss.box}>
            <div className={scss.cat}>
                <div className={scss.cat__body}></div>
                <div className={scss.cat__body}></div>
                <div className={scss.cat__tail}></div>
                <div className={scss.cat__head}></div>
            </div>
        </div>
    )
}
