import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList/PetList';

const App = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

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

  // Handles selecting a pet
  const handleSelect = (pet) => {
    setSelectedPet(pet);
  };

  return (
    <div>
      <PetList
        pets={pets}
        handleSelect={handleSelect}
      />

      <h2>Details Page</h2>

      {selectedPet ? (
        <div>
          <h3>{selectedPet.name}</h3>
          <p>Species: {selectedPet.species}</p>
          <p>Age: {selectedPet.age}</p>
        </div>
      ) : (
        <p>Select a pet to see its details.</p>
      )}
    </div>
  );
};

export default App;