import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';

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

      <PetDetail selected={selectedPet} />
    </div>
  );
};

export default App;