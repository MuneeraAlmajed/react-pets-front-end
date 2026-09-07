// src/services/petService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err.message);
    }
};

export {
    index,
};