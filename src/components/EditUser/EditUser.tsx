import './EditUser.scss';
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useState } from 'react';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';
import { CustomField } from '../common/CustomField';
import { updateUser } from '../../store/Users/UsersThunks';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteUser } from '../DeleteUser/DeleteUser';
import { useAppDispatch, useAppSelector } from '../../hook';
import { IUser } from '../../interfaces/IUser';

export const EditUser: React.FC = () =>{
  const dispatch = useAppDispatch();
  const [isDailog, setDialog] = useState(false);
  const history = useNavigate();
  const { id } = useParams();
  const { error } = useAppSelector((state) => state.usersReducer);
  const { modifidedUsers } = useAppSelector((state) => state.usersReducer);
  const validationSchema = yup.object({
    username: yup.string()
      .matches(/^[\w.@+-]+$/, "Логин содержит недопустимые символы")
      .min(1, 'Минимальная длина 1 символ')
      .max(150, "Максимальная длина логина")
      .required('Введите логин пользователя'),
    first_name: yup.string()
      .max(30, "Максимальная длина 30"),
    last_name: yup.string()
      .max(150, "Максимальная длина 150"),
    password: yup.string()
      .min(1, 'Минимальная длина 1 символ')
      .max(128, 'Максимальная длина 128 символа')
      .required('Введите пароль'),
    is_active: yup.boolean()
  });

  const userData = modifidedUsers.filter((user: IUser) => user.id == (id!))

  const initialValues = {
    username: userData[0].username, 
    password: userData[0].password,
    first_name: userData[0].first_name,
    last_name: userData[0].last_name,
    is_active: userData[0].is_active
  };

  const onSubmit = async (data: IUser) => {
    try {
      await dispatch(updateUser({ id: id!, data }));
    } finally {
      history("/users");
    }
  } 

  const openPopUp = () => {
    setDialog(true)
  }

  const onCancel =  () => {
    history('/users');
  }

  if (!initialValues) {
    return <p className='main__loading'>Загрузка</p>;
  }

  return (
    <div className="edit-user">
      <div className="edit-user__title">{ resources.profile + " " +initialValues.username }</div>
      { error ? <div className="edit-user__error"> {resources.errorRegistration}</div> : ""}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        setSubmitting={false}
        onSubmit={onSubmit}
      >
        {({errors, touched, isSubmitting}) => (
            <Form>
              <CustomField 
                name={"username"} 
                type={"input"}
                placeholder={resources.username}
              />
              <CustomField 
                name={"first_name"} 
                type={"input"}
                placeholder={resources.first_name}
              />
              <CustomField 
                name={"last_name"} 
                type={"input"}
                placeholder={resources.last_name}
              />
              <CustomField 
                name={"password"} 
                type={"password"}
                placeholder={resources.password}
              />
              <div className="container">
                {resources.isActive}
                <CustomField 
                  name={"is_active"} 
                  type={"checkbox"}
                />
              </div>
              <div className="edit-user__buttons">
              <CustomButton 
                text={resources.edit} 
                type="submit" 
                disabled={isSubmitting}
              />
            </div>
            </Form>
        )}
      </Formik>
      <div className="edit-user__buttons">
        <CustomButton text={resources.remove} onClick={openPopUp} />
        <CustomButton text={resources.cancel} onClick={onCancel} />
      </div>
      { isDailog ? <DeleteUser id={id as string} setOpen={setDialog} /> : ""}
  </div>
  );
}