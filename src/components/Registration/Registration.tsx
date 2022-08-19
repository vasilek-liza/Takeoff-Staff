import './Registration.scss';
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { useState } from 'react';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';
import { CustomField } from '../common/CustomField';
import { registration } from '../../store/Registration/RegistrationThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector} from '../../hook';
import { IUser } from "../../interfaces/IUser";

export const Registration: React.FC = () =>{
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.registrationReducer);
  const history = useNavigate()

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

  const [initialValues ] = useState<IUser>({ 
    username: "", 
    password: "",
    first_name: "",
    last_name: "",
    is_active: false,
    id: ""
  })

  const onSubmit = async (data: IUser, {setSubmitting, resetForm}: FormikHelpers<IUser>) => {
    try {
      dispatch(registration(data)).then(() => {
        history("/users");
      });
    } finally {
      resetForm();
      setSubmitting(false);
    }
  }

  const onCancel = () => {
    history('/users');
  }

  return (
    <div className="registration">
      <div className="registration__title">{resources.registration}</div>
      { error ? <div className="registration__error"> {resources.errorRegistration}</div> : ""}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        setSubmitting={false}
        onSubmit={onSubmit}
      >
        {({errors, touched, isSubmitting}) => (
            <Form>
              <CustomField 
                name="username" 
                type="input"
                error={errors.username}
                touched={touched.username}
                placeholder={resources.username}
              />
              <CustomField 
                name="firstName"
                type="input"
                error={errors.first_name}
                touched={touched.first_name}
                placeholder={resources.first_name}
              />
              <CustomField 
                name="lastName"
                type="input"
                error={errors.last_name}
                touched={touched.last_name}
                placeholder={resources.last_name}
              />
              <CustomField 
                name="password"
                type="password"
                error={errors.password}
                touched={touched.password}
                placeholder={resources.password}
              />
              <div className="container">
                {resources.isActive}
                <CustomField 
                  name="isActive"
                  type="checkbox"
                  error={errors.is_active}
                  touched={touched.is_active}
                />
              </div>
              <div className="container registration__buttons">
                <CustomButton 
                  text={resources.registrationSubmit} 
                  type="submit"
                  disabled={isSubmitting}
                />
                <CustomButton text={resources.cancel} onClick={onCancel} />
              </div>
            </Form>
        )}
      </Formik>
  </div>
  );
}