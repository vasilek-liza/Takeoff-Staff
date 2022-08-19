import './SearchBar.scss';
import { useAppDispatch } from '../../hook';
import { searchUsers } from '../../store/Users/UsersSlice';
import React, { useState } from 'react';

export const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const [debounce] = useState<{ time: number | null }>({ time: null })
    const dataSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(debounce.time as number);
        debounce.time = window.setTimeout(() => {
            const value = e.target.value.toLowerCase();
            dispatch(searchUsers(value));
        }, 0);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar__input"
                placeholder="Search people by username..."
                onChange={dataSearch}
            />
        </div>
      );
}