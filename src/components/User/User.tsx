import './User.scss';
import { useAppSelector } from '../../hook';
import { CustomButton } from '../common/CustomButton';
import { useNavigate } from 'react-router-dom';
import { resources } from '../../resources';
import { IUser } from '../../interfaces/IUser';

interface IUserProps {
  user: IUser
}

export const User: React.FC<IUserProps> = ({user}) => {
  const { account } = useAppSelector((state) => state.authReducer);
  const history = useNavigate();

  const goToUserEdit = async () => {
    history("/api/users/" + user.id);
  }

  return (
    <div className={`user ${(account.username == user.username)? "user__own": ""}`}>
      <span  className="icon icon-ava"/>
      <div className="user__info">
        <div className="user__username">
          {user.username}
        </div>
        <div className="user__full_name">
          {user.first_name} {user.last_name}
        </div>
        <div className="user__details">
          <div className="user__id">
            {resources.id}: {user.id}
          </div>
          <div className="container">
            {account.username !== user.username && <CustomButton text={resources.redact} onClick={goToUserEdit}/>}
            { user.is_active ?
              <span className="user__is_active true">
              </span> :
              <>
                <span className="user__is_active false">
                </span> 
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}