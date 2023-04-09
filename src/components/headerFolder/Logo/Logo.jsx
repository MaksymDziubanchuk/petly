
import { useDispatch, useSelector } from "react-redux";
import scss from "./logo.module.scss";
import SvgInsert from "../../utilsFolder/Svg/Svg";
import { setMenuActive } from "redux/slices/menuSlice";
import { NavLink } from "react-router-dom";
import { useTheme } from '../../../hooks/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';


const Logo = () => {
const isActive = useSelector(state=>state.menu.menuActive)
    const dispatch = useDispatch();
    
    const { theme, setTheme } = useTheme();
    const [isChecked, setIsChecked] = useState(theme === 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setIsChecked(newTheme === 'dark');
  };

    return (
        <div className={scss.logoWrapper}>
                        <div className={scss.theme_box}>
        <NavLink to="/" className={scss.logo} title="logoLink">

                    <SvgInsert id="icon-logo" />
                            </NavLink>
                    <>
                        <label className={scss.toggle}>
                        <input type="checkbox" checked={isChecked} onChange={toggleTheme} />
                        <span className={scss.slider} />
                        <div className={scss.fa_icon}>
                            <FontAwesomeIcon icon={faSun} className={`${!isChecked ? scss.fa_sun : scss.fa_sun_hidden}`} />
                            <FontAwesomeIcon icon={faMoon} className={`${isChecked ? scss.fa_moon : scss.fa_moon_hidden}`} />
                        </div>
                        </label>
                    </>
            </div>

            {isActive === false
            ? <button type="button" title="openMenu" onClick={()=>dispatch(setMenuActive(!isActive))} className={scss.button}><SvgInsert id="icon-menu-open"/> </button>
            : <button type="button" title="closemenu" onClick={()=>dispatch(setMenuActive(!isActive))} className={scss.button}><SvgInsert id="icon-menu-close"/></button>}
        </div>
    )
}

export default Logo;

