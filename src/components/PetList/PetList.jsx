const PetList = ({ pets, handleSelect }) => {
  console.log(pets);
  console.log(handleSelect);

  return (
    <div>
      <h1>Pet List</h1>

      <ul>
        {pets.map((pet) => (
          <li
            key={pet._id}
            onClick={() => handleSelect(pet)}
            style={{ cursor: 'pointer', color: '#646CFF' }}
          >
            {pet.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;