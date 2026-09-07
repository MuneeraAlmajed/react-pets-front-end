import { useState } from 'react';

const PetForm = (props) => {
  const initialState = {
    name: '',
    age: '',
    breed: '',
  };

  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  );

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (props.selected) {
      props.handleUpdatePet(
        formData,
        props.selected._id
      );
    } else {
      props.handleAddPet(formData);
    }
  };

  return (
    <div className='form-container'>
      <h1>{props.selected ? 'Update Pet' : 'Add Pet'}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="breed">Breed:</label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <button type="submit">
          {props.selected ? 'Update Pet' : 'Add New Pet'}
        </button>
      </form>
    </div>
  );
};

export default PetForm;