import scss from './user-data-item.module.scss';
import { UserFormik } from './UserFormik';

import UserAvatar from './UserAvatar'

export default function UserDataItem() {

  return (
    
      <div className={scss.userItem_container}>
        <UserAvatar/>
        <UserFormik />
      </div>
  );
}