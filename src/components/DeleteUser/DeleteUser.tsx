import './DeleteUser.scss';
import { CustomButton } from '../common/CustomButton';
import { useNavigate } from 'react-router-dom';
import { deleteUser, fetchUsers } from '../../store/Users/UsersThunks';
import { useAppDispatch } from '../../hook'
import { resources } from '../../resources';

interface IDeleteUserProps {
    id: string | undefined,
    setOpen: (arg: boolean) => void,
} 

export const DeleteUser: React.FC<IDeleteUserProps> = ({id, setOpen}) =>{
    const history = useNavigate();
    const dispatch = useAppDispatch();

    const onDelete = async () => {
        try {
          await dispatch(fetchUsers());
          history('/users');
        } catch {}
    }
    
    const onCancel =  () => {
        setOpen(false);
    }

   return (
      <div className="delete__user">
          <div className="delete__wrapper">
              <div className="delete__title">{resources.confirm}</div>
              <div className="delete__container container">
                <CustomButton text={resources.accept}  type="submit" onClick={onDelete} />
                <CustomButton text={resources.cancel}  onClick={onCancel} />
              </div>
          </div>
      </div> 
   );
}