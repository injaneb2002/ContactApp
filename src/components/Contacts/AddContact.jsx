import {useContext} from "react";
import {Link} from "react-router-dom";

import {ContactContext} from "../../context/contactContext";
import {Spinner} from "../";
import {COMMENT, GREEN, PURPLE} from "../../helpers/colors";
import {useFormik} from 'formik';
import {contactScheme} from "../../validation/contactValidation";
const AddContact = () => {
    const {loading, contact, onContactChange, groups, createContact,} =
        useContext(ContactContext);
    const formik = useFormik({
        initialValues: {
            fullname: "",
            photo: "",
            mobile: "",
            email: "",
            job: "",
            group: "",

        },
        validationSchema: contactScheme,
        onSubmit: values => {
            createContact(values)
            console.log(values);
        }
    })
    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <section className="p-3">
                        <img
                            src={require("../../assets/man-taking-note.png")}
                            height="400px"
                            style={{
                                position: "absolute",
                                zIndex: "-1",
                                top: "130px",
                                left: "100px",
                                opacity: "50%",
                            }}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p
                                        className="h4 fw-bold text-center"
                                        style={{color: GREEN}}
                                    >
                                        ساخت مخاطب جدید
                                    </p>
                                </div>
                            </div>
                            <hr style={{backgroundColor: GREEN}}/>

                            <div className="row mt-5">
                                <div className="col-md-4">
                                    {/*{error?.map((err,index) => (*/}
                                    {/*    <p key={index}>{err.message}</p>*/}
                                    {/*))}*/}
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-2">
                                            <input id="fullname"
                                                   name="fullname"
                                                   type="text"
                                                   // value={formik.values.fullname}
                                                   // onChange={formik.handleChange}
                                                   // onBlur={formik.handleBlur}
                                                   {...formik.getFieldProps("fullname")}
                                                   className="form-control"
                                                   placeholder="نام و نام خانوادگی"

                                            />
                                            {formik.touched.fullname && formik.errors.fullname ? (
                                                <div className="text-danger"> {formik.errors.fullname} </div>) : null}
                                        </div>
                                        <div className="mb-2">
                                            <input id="photo"
                                                   name="photo"
                                                   type="text"
                                                   // value={formik.values.photo}
                                                   // onChange={formik.handleChange}
                                                   // className="form-control"
                                                   // onBlur={formik.handleBlur}
                                                   {...formik.getFieldProps("photo")}
                                                   placeholder="آدرس تصویر"
                                            />
                                            {formik.touched.photo && formik.errors.photo ? (
                                                <div className="text-danger"> {formik.errors.photo} </div>) : null}
                                        </div>
                                        <div className="mb-2">
                                            <input id="mobile"
                                                   name="mobile"
                                                   type="number"
                                                   // value={formik.values.mobile}
                                                   // onChange={formik.handleChange}
                                                   // className="form-control"
                                                   // onBlur={formik.handleBlur}
                                                   {...formik.getFieldProps("mobile")}
                                                   placeholder="شماره موبایل"
                                            />
                                          {formik.touched.mobile && formik.errors.mobile ? (
                                              <div className="text-danger"> {formik.errors.mobile} </div>) : null}
                                        </div>
                                        <div className="mb-2">
                                            <input id="email"
                                                   type="email"
                                                   name="email"
                                                   // value={formik.values.email}
                                                   // onChange={formik.handleChange}
                                                   // className="form-control"
                                                   // onBlur={formik.handleBlur}
                                                   {...formik.getFieldProps("email")}
                                                   placeholder="آدرس ایمیل"
                                            />
                                          {formik.touched.email && formik.errors.email ? (
                                              <div className="text-danger"> {formik.errors.email} </div>) : null}
                                        </div>
                                        <div className="mb-2">
                                            <input id="job"
                                                   type="text"
                                                   name="job"
                                                   // value={formik.values.job}
                                                   // onChange={formik.handleChange}
                                                   // className="form-control"
                                                   // onBlur={formik.handleBlur}
                                                   {...formik.getFieldProps("job")}

                                                   placeholder="شغل"
                                            />
                                          {formik.touched.job && formik.errors.job ? (
                                              <div className="text-danger"> {formik.errors.job} </div>) : null}
                                        </div>
                                        <div className="mb-2">
                                            <select id="group"
                                                    name="group"
                                                    // value={formik.values.group}
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    {...formik.getFieldProps("group")}

                                                    className="form-control"
                                            >
                                                <option value="">انتخاب گروه</option>
                                                {groups.length > 0 &&
                                                    groups.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                            </select>
                                          {formik.touched.group && formik.errors.group ? (
                                              <div className="text-danger"> {formik.errors.group} </div>) : null}
                                        </div>
                                        <div className="mx-2">
                                            <input
                                                type="submit"
                                                className="btn"
                                                style={{backgroundColor: PURPLE}}
                                                value="ساخت مخاطب"
                                            />
                                            <Link
                                                to={"/contacts"}
                                                className="btn mx-2"
                                                style={{backgroundColor: COMMENT}}
                                            >
                                                انصراف
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default AddContact;
