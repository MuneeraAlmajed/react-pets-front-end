import { useState, useEffect } from "react";
import * as petService from "./services/petService";
import PetList from "./components/PetList/PetList";
import PetDetail from "./components/PetDetail/PetDetail";
import PetForm from "./components/PetForm/PetForm";

const App = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    async function allPets() {
      try {
        const data = await petService.index();

        if (data.err) {
          throw new Error(data.err);
        }

        setPets(data);
      } catch (err) {
        console.log(err);
      }
    }

    allPets();
  }, []);

  const handleSelect = (pet) => {
    setSelectedPet(pet);
  };

  const handleFormView = (pet) => {
    if (!pet?._id) {
      setSelectedPet(null);
    } else {
      setSelectedPet(pet);
    }

    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);

      if (newPet.err) {
        throw new Error(newPet.err);
      }

      setPets([...pets, newPet]);
      setSelectedPet(newPet);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);

      if (updatedPet.err) {
        throw new Error(updatedPet.err);
      }

      const updatedPetList = pets.map((pet) =>
        pet._id !== updatedPet._id ? pet : updatedPet,
      );

      setPets(updatedPetList);
      setSelectedPet(updatedPet);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);

      if (deletedPet.err) {
        throw new Error(deletedPet.err);
      }

      const updatedPetList = pets.filter((pet) => pet._id !== deletedPet._id);

      setPets(updatedPetList);
      setSelectedPet(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PetList
        pets={pets}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />

      {isFormOpen ? (
        <PetForm
          handleAddPet={handleAddPet}
          selected={selectedPet}
          handleUpdatePet={handleUpdatePet}
        />
      ) : (
        <PetDetail
          selected={selectedPet}
          handleFormView={handleFormView}
          handleDeletePet={handleDeletePet}
        />
      )}
    </>
  );
};

export default App;
