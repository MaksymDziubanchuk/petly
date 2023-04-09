import scss from "./user-nav.module.scss";
import { NavLink } from "react-router-dom";
import SvgInsert from "components/utilsFolder/Svg/Svg";
import { useSelector, useDispatch } from "react-redux";
import { setMenuActive } from "redux/slices/menuSlice";

const UserNav = () => {

    const isActive = useSelector(state => state.menu.menuActive)
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
  
    const newName = user.name;
    const reversName = user.name === undefined ? 'Account' : newName.substr(0, 9);

    return (
        isActive === true 
            ? <NavLink to={'user'} className={scss.account} onClick={()=>dispatch(setMenuActive(!isActive))}>
                {user.avatar
                    ? (<img src={user.avatar} className={scss.avatarURL} alt="" />)
                    : (<SvgInsert className={scss.icone_account} id="icon-account"/>)}
                {reversName}
                </NavLink>
            : <NavLink to={'user'} className={scss.account}>
                {user.avatar
                    ? (<img src={user.avatar} className={scss.avatarURL} alt="" />)
                    : (<SvgInsert className={scss.icone_account} id="icon-account"/>)}
                {reversName}
                  
                </NavLink>
        
    )
}

export default UserNav;
