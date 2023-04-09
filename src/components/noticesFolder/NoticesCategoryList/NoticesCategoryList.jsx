import scss from './notices-category-list.module.scss';
import NoticeCategoryItem from 'components/noticesFolder/NoticeCategoryItem/NoticeCategoryItem';
import { useSelector } from 'react-redux';
import { getNotices } from 'redux/selectors/noticesSelectors';

const NoticesCategoryList = ({ data}) => {

  const pets = useSelector(getNotices);
 
  return (
    <ul className={scss.card_list}>
      {pets.map(pet => (
        <NoticeCategoryItem
          notice={pet}
          key={pet._id}
          value={data}
        />
      ))}
    </ul>
  );
};

export default NoticesCategoryList;
