import { useEffect, useState } from "react";

export function useGetImage(gender, setLoader) {
  const [imageContact, setImageContact] = useState();

  const contactImage = async () => {
    try {
      setLoader(true);
      const response = await fetch(
        `https://randomuser.me/api/?gender=${gender}`
      );
      if (!response.ok) {
        return console.log("no se pudo obtener la informacion");
      }

      const result = await response.json();
      setImageContact(result.results[0].picture.large);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    contactImage();
  }, []);
  return { imageContact };
}
