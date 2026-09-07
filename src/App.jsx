import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';
import PetForm from './components/PetForm/PetForm';

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
    // setIsFormOpen(false);
  };

  const handleFormView = () =>{
    setIsFormOpen(!isFormOpen);
  }

  const handleAddPet = async(formData) => {
    try{

      const newPet = await petService.create(formData);

      if(newPet.err){
        throw new Error(newPet.err);
      }

      setPets([newPet, ...pets]);

      //reset the form 
      setIsFormOpen(false);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      <PetList
        pets={pets}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet}/>
      ):(
        <PetDetail selected={selectedPet} />

      )}


    </div>
  );
};

export default App;