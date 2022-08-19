import { resources } from '../../resources';

export const NotFound: React.FC = () => {
    return (
       <div className="not-found">
           {resources.searchUsers}
       </div>
    );
}