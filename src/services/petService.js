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

const create = async (formData) =>{
    try{
        const res = await fetch (BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
            return res.json();        
        const data = await res.json();

        return data
        console.log(res);
    }catch(err){
        console.log(err);
    }
}

export {
    index, create, 
};