import './EditUser.scss';
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useEffect, useState } from 'react';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';
import { CustomField } from '../common/CustomField';
import { resetUser } from '../../store/Users/UsersSlice';
import { getUser, updateUser } from '../../store/Users/UsersThunks';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteUser } from '../DeleteUser/DeleteUser';
import { useAppDispatch, useAppSelector } from '../../hook';

export const EditUser: React.FC = () =>{
  const dispatch = useAppDispatch();
  const [isDailog, setDialog] = useState(false);
  const history = useNavigate();
  const { id } = useParams();
  const { error, user } = useAppSelector((state) => state.usersReducer);
  const { account } = useAppSelector((state) => state.authReducer);

  const validationSchema = yup.object({
    username: yup.string()
      .matches(/^[\w.@+-]+$/, "Логин содержит недопустимые символы")
      .min(1, 'Минимальная длина 1 символ')
      .max(150, "Максимальная длина логина")
      .required('Введите логин пользователя'),
    firstName: yup.string()
      .max(30, "Максимальная длина 30"),
    lastName: yup.string()
      .max(150, "Максимальная длина 150"),
    password: yup.string()
      .min(1, 'Минимальная длина 1 символ')
      .max(128, 'Максимальная длина 128 символа')
      .required('Введите пароль'),
    isActive: yup.boolean()
  });

  useEffect(() => {
      dispatch(getUser(id!));
    return () => {
      dispatch(resetUser())
    }
  }, []);

  const initialValues = {
    username: user.username, 
    password: user.password,
    firstName: user.first_name,
    lastName: user.last_name,
    isActive: user.is_active
  };

  const onSubmit = async (data: any) => {
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

  if (!user.id) {
    return <p className='main__loading'>Загрузка</p>;
  }

  return (
    <div className="edit-user">
      <div className="edit-user__title">{ resources.profile + " " + user.username }</div>
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
                error={errors.username}
                touched={touched.username}
                placeholder={resources.username}
              />
              <CustomField 
                name={"firstName"} 
                type={"input"}
                error={errors.firstName}
                touched={touched.firstName}
                placeholder={resources.first_name}
              />
              <CustomField 
                name={"lastName"} 
                type={"input"}
                error={errors.lastName}
                touched={touched.lastName}
                placeholder={resources.last_name}
              />
              <CustomField 
                name={"password"} 
                type={"password"}
                error={errors.password}
                touched={touched.password}
                placeholder={resources.password}
              />
              <div className="container">
                {resources.isActive}
                <CustomField 
                  name={"isActive"} 
                  type={"checkbox"}
                  error={errors.isActive}
                  touched={touched.isActive}
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
      {/* <div className="edit-user__buttons">
        {account.is_superuser && <CustomButton text={resources.remove} type="input"onClick={openPopUp} />}
        <CustomButton text={resources.cancel} onClick={onCancel} />
      </div>
      { isDailog ? <DeleteUser id={id} setOpen={setDialog} /> : ""} */}
  </div>
  );
}