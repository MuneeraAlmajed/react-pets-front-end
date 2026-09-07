const PetList = ({
  pets,
  handleSelect,
  handleFormView,
  isFormOpen
}) => {
  return (
    <div>
      <h1>Pet List</h1>

      {!pets.length ? (
        <h2>No Pets Yet!</h2>
      ) : (
        <ul>
          {pets.map((pet) => (
            <li
              key={pet._id}
              onClick={() => handleSelect(pet)}
              style={{
                cursor: 'pointer',
                color: '#646CFF'
              }}
            >
              {pet.name}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleFormView}>
        {isFormOpen ? 'Close Form' : 'New Pet'}
      </button>
    </div>
  );
};

export default PetList;