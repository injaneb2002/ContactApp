import * as Yup from 'yup';

export const contactScheme = Yup.object().shape({
    fullname : Yup.string().required('نام و نام خانوادگی الزامی میباشذ'),
    photo : Yup.string().url("آدرس معتبر نیست").required('آدرس عکس الزامی است'),
    mobile : Yup.number("").required('شماره موبایل الزامی میباشد'),
    email : Yup.string().email("").required('شماره موبایل الزامی میباشد'),
    job : Yup.string().nullable(),
    group : Yup.string().required("انتخاب گروه الزامی میباشد"),
})
