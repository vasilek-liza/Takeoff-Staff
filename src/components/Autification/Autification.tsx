import './Autification.scss';
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { getToken } from '../../store/Auth/AuthThunks';
import { useState } from 'react';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';
import { CustomField } from '../common/CustomField';
import { useAppDispatch, useAppSelector } from '../../hook';
import { IUserData } from '../../interfaces/IUserData';

export const  Autification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.authReducer);

  const validationSchema = yup.object({
    username: yup.string()
      .min(1, 'Минимальная длина 1 символ')
      .max(150, 'Максимальная длина 150 символа')
      .matches(/^[\w.@+-]+$/, "Логин содержит недопустимые символы")
      .required('Введите имя пользователя'),
    password: yup.string()
      .min(1, 'Минимальная длина 1 символ')
      .max(128, 'Максимальная длина 128 символа')
      .required('Введите пароль')
  });

  const [initialValues] = useState<IUserData>({
    username: "vasilevskaya@mail.ru",
    password:"vasilevskaya"
  })
  
  const onSubmit = async(data: IUserData, {setSubmitting, resetForm}: FormikHelpers<IUserData>) => {
    try {
      await dispatch(getToken(data));
    } finally {
      resetForm();
      setSubmitting(false);
    }
  }

  return (
    <div className="autification">
      <div className="autification__title">{resources.authorization}</div>
      { error ? <div className="autification__error"> {resources.errorLogin}</div> : ""}
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
                type={"username"}
                error={errors.username}
                touched={touched.username}
                placeholder={resources.username}
              />
              <CustomField 
                name={"password"} 
                type={"password"}
                error={errors.password}
                touched={touched.password}
                placeholder={resources.password}
              />
              <CustomButton 
                text={resources.login} 
                type="submit" 
                disabled={isSubmitting}
              />
            </Form>
        )}
      </Formik>
  </div>
  );
}