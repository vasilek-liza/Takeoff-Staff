import { Field } from "formik";

interface IFieldProps {
    error?: string,
    name: string,
    placeholder?: string,
    type?: string,
    touched?: boolean,
}

export const CustomField: React.FC<IFieldProps> = ({ error, touched, type, name, placeholder }) => {
    return (
        <>
            <Field name={name} type={type} placeholder={placeholder} />

            {error && touched && (
                <div>{error}</div>
            )}
        </>
    )
}