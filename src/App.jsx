import { useState, useEffect } from "react";
import "./App.css";
import CardContac from "./components/hooks/CardContac";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
  });
  const [listContact, setListContact] = useState([]);
  const [alert, setAlert] = useState("");
  const [statusEdit, setStatusEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addUser = (newUser) => {
    setListContact((prevContacts) => [
      ...prevContacts,
      {
        id: new Date().getTime(),
        isFavorite: false,
        name: newUser.name,
        phone: newUser.phone,
        gender: newUser.gender,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.gender) {
      return setAlert("Faltan campos a agregar");
    }

    try {
      addUser(formData);
      setFormData({ name: "", phone: "", gender: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const favorite = (id) => {
    setListContact((prevContacts) =>
      prevContacts.map((user) =>
        user.id === id ? { ...user, isFavorite: !user.isFavorite } : user
      )
    );
  };

  const deleteConatc = (id) => {
    setListContact((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const editUser = (contact) => {
    setStatusEdit(true);
    setFormData({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      gender: contact.gender,
    });
  };

  const updateContact = (e) => {
    e.preventDefault();
    try {
      setListContact((prevContact) =>
        prevContact.map((contact) =>
          contact.id === formData.id
            ? {
                ...contact,
                name: formData.name,
                phone: formData.phone,
                gender: formData.gender,
              }
            : contact
        )
      );
      setAlert("Contacto actualizo con  exito ");
    } catch (error) {
      console.log(error);

      setAlert("No se pudo actualizar");
    }
  };
  console.log(listContact);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const countFavorite = listContact.filter(
    (contact) => contact.isFavorite === true
  ).length;
  return (
    <div className="w-full h-[100vh] bg-slate-800 flex justify-center items-center flex-col">
      {alert && (
        <p className="bg-gray-700  text-white w-[540px] m-4 p-3 rounded-md border-b-4 border-blue-600">
          {alert || "error"}
        </p>
      )}

      <div className=" text-white  flex  h-72">
        <div className="">
          <div className="flex  gap-2 mb-2 w-60">
            <p className="bg-white text-gray-600 font-semibold rounded-md p-2">
              <i className={`fa-solid text-yellow-400  fa-star`} />{" "}
              {countFavorite} Favoritos
            </p>
            <p className="bg-green-700 rounded-md p-2 font-semibold">
              <i className={`fa-solid  fa-user`} /> {listContact.length}{" "}
              Contactos
            </p>
          </div>
          <form
            onSubmit={!statusEdit ? handleSubmit : updateContact}
            className="flex  flex-col gap-3 bg-gray-600 w-60 text-black p-3 rounded-md  mr-5"
          >
            <label className="text-gray-300 ">
              Nombre
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-slate-900 text-white rounded-md w-full p-2 font-normal "
              />
            </label>
            <label className="text-gray-300 ">
              Telefono
              <input
                className="bg-slate-900 text-white rounded-md w-full p-2 font-normal"
                type="Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>

            <select
              name="gender"
              className="bg-slate-900 text-white rounded-md w-full p-2 "
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Selecciona un género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
            <button className="bg-blue-900 p-2 rounded-md text-white">
              {statusEdit ? "actualizar" : "Registrar"}
            </button>
          </form>
        </div>
        <div className="text-center font-semibold">
          <h1 className="text-2xl">Libreta de Contactos</h1>
          <ul className="h-[400px] overflow-auto px-5 ">
            {listContact.length > 0 ? (
              listContact.map((contact) => (
                <li
                  key={contact.id}
                  className="border-b border-gray-500 py-2"
                >
                  <CardContac
                    name={contact.name}
                    phone={contact.phone}
                    isFavorite={contact.isFavorite}
                    deleteContact={() => deleteConatc(contact.id)}
                    favorite={() => favorite(contact.id)}
                    gender={contact.gender}
                    editUser={() => editUser(contact)}
                  />
                </li>
              ))
            ) : (
              <li className="mt-10 text-gray-400">No se encontraron contactos</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
