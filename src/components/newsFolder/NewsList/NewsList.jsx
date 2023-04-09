import NewsItem from '../NewsItem/NewsItem'
import s from './newsList.module.scss'
import { nanoid } from 'nanoid'

export default function NewsList({ data }) {
    return (
        <>
            <ul className={s.news_list}>
                {data.map(({ title, url, description, date }) => (
                    <NewsItem
                        key={nanoid()}
                        title={title}
                        url={url}
                        description={description}
                        date={date}
                    />
                ))}
            </ul>
        </>
    )
}
