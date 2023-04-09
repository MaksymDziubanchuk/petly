import { useSelector } from "react-redux";

import { isLogin } from "../selectors/selectors";

const useAuth = () => {
    const result = useSelector(isLogin);
    return result;
}

export default useAuth;