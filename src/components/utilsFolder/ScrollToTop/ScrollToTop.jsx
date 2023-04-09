import { useState, useEffect } from 'react';
import scss from "./ScrollToTop.module.scss";
import SvgInsert from 'components/utilsFolder/Svg/Svg';

const ScrollToTop = () => {

    const [scrollToTopButton, setScrollToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                setScrollToTopButton(true);
            } else {
                setScrollToTopButton(false);
            }
        })
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <>
            {scrollToTopButton && (
                <button className={scss.btn}  onClick={scrollUp}>
                    <SvgInsert id="icon-chevron-circle-up" />
                </button>
            )}
        </>
    )
}

export default ScrollToTop;
