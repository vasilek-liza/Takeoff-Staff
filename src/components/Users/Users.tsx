import { User } from '../User/User';
import './Users.scss';
import { getUsers } from '../../store/Users/UsersThunks';
import { useEffect} from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SortButton } from '../SortButton/SortButton';
import { resources } from '../../resources';
import { sorting } from '../../store/Users/UsersSlice';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../common/CustomButton';
import { NotFound } from '../SearchBar/NotFound';
import { useAppDispatch, useAppSelector } from '../../hook'
import { IUser } from '../../interfaces/IUser'

export function  Users() {
  const dispatch = useAppDispatch();
  const { modifidedUsers, loading } = useAppSelector((state) => state.usersReducer);
  const { username } = useAppSelector((state) => state.authReducer);
  const history = useNavigate();

  const goToRegistration = () => {
    history("/registration");
    dispatch(getUsers());
  }

  useEffect(() => {
    try {
      dispatch(getUsers());
      dispatch(sorting());
    } catch {
    }
  }, []);

  return (
    <div className="users__wrapper wrapper">
      <div className="users__header container">
        <CustomButton text={'Создать контакт'} onClick={goToRegistration} />
        <div className="users__login">
          <p className="users__login-text">{resources.username}: </p>
          <p className="users__login-content">{username}</p>
        </div>
      </div>
      <div className="users__content">
          <div className="users__content-title">{resources.users}</div>
          <div className="users__content-fields container">
            <SearchBar />
            <SortButton />
          </div>
          <div className="users__content-main">
            {modifidedUsers.map((user: IUser, index: string) => (
              <User key={index} user={user} />
            ))} 
          { !loading && !modifidedUsers.length && <NotFound /> }
          </div>
      </div>
    </div>
  );
}