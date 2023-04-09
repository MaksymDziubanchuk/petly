import OurFriendsPageItem from '../OurFriendsPageItem/OurFriendsPageItem';
import scss from './our-friends-page-list.module.scss';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';

const OurFriendsPageList = ({ items }) => {
  var dt = DateTime.local();
  let weekday = dt.weekday;
  let targetDay = weekday - 1;

  return (
    <ul className={scss.card_list}>
      {items.map(item => (
        <OurFriendsPageItem
          key={nanoid()}
          title={item.title}
          url={item.url}
          start={item.workDays?.[targetDay].from || '------------'}
          end={item.workDays?.[targetDay].to || '-------------'}
          address={item.address || '-------------------------'}
          addressUrl={item.addressUrl}
          email={item.email || '-------------------------'}
          phone={item.phone || '--------------------------'}
          foto={item.imageUrl}
          workDays={item.workDays}
          day={targetDay}
        ></OurFriendsPageItem>
      ))}
    </ul>
  );
};

export default OurFriendsPageList;
