import {useState, useEffect} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import _ from "lodash";
import {ContactContext} from "./context/contactContext";
import {
    AddContact,
    ViewContact,
    Contacts,
    EditContact,
    Navbar,
} from "./components";

import {
    getAllContacts,
    getAllGroups,
    createContact,
    deleteContact,
} from "./services/contactService";

import "./App.css";
import {
    CURRENTLINE,
    FOREGROUND,
    PURPLE,
    YELLOW,
    COMMENT,
} from "./helpers/colors";
import {contactScheme} from "./validation/contactValidation";

import {useImmer} from "use-immer";
import {ToastContainer, toast} from 'react-toastify';

const App = () => {
    const [loading, setLoading] = useImmer(false);
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);
    const [contact, setContact] = useImmer({});
    // const [error,setError] = useState([]) yup
    const navigate = useNavigate();

    useEffect(() => {


        const fetchData = async () => {
            try {
                setLoading(true);

                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();

                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const createContactForm = async (values) => {

        try {
            setLoading((prevLoading) => !prevLoading);
            // await contactScheme.validate(contact,{abortEarly:false})
            const {status, data} = await createContact(contact);

            /*
             * NOTE
             * 1- Rerender -> forceRender, setForceRender
             * 2- setContact(data)
             */

            if (status === 201) {
                toast.success("مخاطب با موفیقت ساخته شد")
                setContacts(draft => {
                    draft.push(data)
                });

                setFilteredContacts(draft => {
                    draft.push(data)
                })
                // setContact({});
                setLoading((prevLoading) => !prevLoading);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            // setError(err.inner)
            // console.log(err.inner)
            setLoading((prevLoading) => !prevLoading);
        }
    };


    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor: CURRENTLINE,
                            border: `1px solid ${PURPLE}`,
                            borderRadius: "1em",
                        }}
                        className="p-4"
                    >
                        <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                        <p style={{color: FOREGROUND}}>
                            مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{backgroundColor: PURPLE}}
                        >
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{backgroundColor: COMMENT}}
                        >
                            انصراف
                        </button>
                    </div>
                );
            },
        });
    };

    const removeContact = async (contactId) => {
        /*
         * NOTE
         * 1- forceRender -> setForceRender
         * 2- Server Request
         * 3- Delete Local State
         * 4- Delete State Before Server Request
         */

        // Contacts Copy
        const allContacts = [...contacts];
        try {
            const updatedContact = contacts.filter((c) => c.id !== contactId);
            setContacts(updatedContact);
            setFilteredContacts(updatedContact);

            // Sending delete request to server
            const {status} = await deleteContact(contactId);

            if (status !== 200) {
                setContacts(allContacts);
                setFilteredContacts(allContacts);
            }
        } catch (err) {
            console.log(err.message);

            setContacts(allContacts);
            setFilteredContacts(allContacts);
        }
    };

    let filterTimeout;
    const contactSearch = _.debounce(query => {
        if (!query) return setFilteredContacts([...contacts]);

        // clearTimeout(filterTimeout);

        // filterTimeout = setTimeout(() => {
        setFilteredContacts(
            contacts.filter((contact) => {
                return contact.fullname.toLowerCase().includes(query.toLowerCase());
            })
        );
        // }, 1000);
    }, 1000)

    return (
        <ContactContext.Provider
            value={{
                loading,
                setLoading,
                contact,
                setContacts,
                setFilteredContacts,
                contacts,
                filteredContacts,
                groups,

                deleteContact: confirmDelete,
                createContact: createContactForm,
                contactSearch,
            }}
        >
            <div className="App">

                <ToastContainer rtl={true} position={"top-right"} theme={"colored"}/>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="contacts" element={<Contacts/>}/>
                    <Route path="contacts/add" element={<AddContact/>}/>
                    <Route path="contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="contacts/edit/:contactId" element={<EditContact/>}/>
                </Routes>


            </div>
        </ContactContext.Provider>
    );
};

export default App;
