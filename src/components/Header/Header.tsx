import './Header.scss';
import { removeToken } from '../../store/Auth/AuthSlice';
import { CustomButton } from '../common/CustomButton';
import { resetUsers } from '../../store/Users/UsersSlice';
import { useAppDispatch, useAppSelector } from '../../hook';


export const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.authReducer);

    const logOut = () => {
        dispatch(removeToken())
        dispatch(resetUsers())
    }

   return (
    <header className="header">
        <div className="header__wrapper">
            <a href="https://takeoff-staff.ru/" className="header__logo">
                Takeoff Staff
            </a>
            { token 
                ? <CustomButton onClick={logOut} text={"выйти"} />
                : ""
            }
        </div>
    </header>  
   );
}