import './SortButton.scss';
import { sorting } from '../../store/Users/UsersSlice';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';
import { useAppDispatch, useAppSelector } from '../../hook'

export const SortButton: React.FC = () =>{
    const dispatch = useAppDispatch();
    const { sortUp } = useAppSelector((state) => state.usersReducer);

    const sort = () => {
        dispatch(sorting())
    }

    return (
        <div className="sort-button">
            <CustomButton className={`${sortUp ? "up": "down"}`} onClick={sort}> 
                <span className="sort-text"> {resources.sorting} </span>
                <span className="sort-icon"></span>
            </CustomButton>
        </div>
    )
}