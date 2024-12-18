import { useState } from "react";
import { useGetImage } from "../../../mocks/apiImage";
import CardLoader from "./CardLoader";
function CardContac({
  name,
  phone,
  deleteContact,
  favorite,
  isFavorite,
  gender,
  editUser,
}) {
  const [activeDelete, setActiveDelete] = useState(false);
  const [loader, setLoader] = useState(false);
  const { imageContact } = useGetImage(gender, setLoader);

  return (
    <>
      {" "}
      {!loader ? (
        <>
          <div
            className={`flex flex-col  ${
              imageContact ? "block" : "hidden"
            }`}
          >
            <div className="flex gap-2 relative  ">
              {isFavorite && (
                <i
                  className={`fa-solid z-10  fa-star absolute left-[-10px] top-[-15px] text-2xl text-yellow-400`}
                />
              )}
              <div
                className={`bg-slate-900 p-3 rounded-md flex gap-3  relative items-center min-w-60  ${
                  isFavorite ? "border-yellow-400 border" : ""
                } `}
              >
                <img
                  className="w-10 rounded-lg"
                  src={imageContact}
                  alt="imageContact"
                />
                <div className="flex gap-1 flex-col">
                  <p className="text-md font-semibold">{name || "nombre "}</p>
                  <p className="text-sm text-gray-400">{phone || "phone"}</p>
                </div>
                <p className="absolute right-2 top-1">
                  <i
                    className={`fa-solid ${
                      gender == "male"
                        ? "fa-mars text-blue-600"
                        : "fa-venus text-pink-600"
                    }`}
                  />
                </p>
                <button
                  className="absolute right-3 bottom-3 "
                  onClick={editUser}
                >
                  <i className="fa-regular fa-pen-to-square" />
                </button>
              </div>
              <div className="flex gap-1 flex-col ">
                <button
                  className={`p-2 rounded-md  ${
                    isFavorite ? "bg-yellow-400" : "bg-gray-700"
                  }  `}
                  onClick={favorite}
                >
                  {" "}
                  <i
                    className={`${
                      isFavorite ? " fa-solid" : "fa-regular"
                    }  fa-star`}
                  />
                </button>
                <button
                  className="p-2 rounded-md bg-red-600"
                  onClick={() => setActiveDelete(!activeDelete)}
                >
                  <i className={`fa-solid  fa-trash`} />
                </button>
              </div>
            </div>
            {activeDelete && (
              <div className=" mt-2 flex justify-between gap-3 items-center ">
                <button
                  className="bg-red-600 w-[50%] px-2 py-1 rounded-md"
                  onClick={deleteContact}
                >
                  Borrar
                </button>
                <button
                  className="bg-blue-500  w-[50%]  border px-2 py-1 rounded-md"
                  onClick={() => setActiveDelete(false)}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <CardLoader />
      )}
    </>
  );
}

export default CardContac;
