// import axios from "axios";

const BASE_URL= 'http://localhost:8080';

export const GetAllEmp = async (search='',page=1,limit=5)=>{
     const url = `${BASE_URL}/api/employees/?search=${search}&page=${page}&limit=${limit}`;

    try {
        const options = {
            method:'GET',
            'Content-Type':'application/json'
        }
        const result = await fetch(url,options);
        const data = await result.json();
        return data;

    } catch (error) {
        return error;
    } 
}

export const CreateEmp = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;

    try {
        const formData = new FormData();

        for (const key in empObj) {
            if (empObj[key] !== undefined && empObj[key] !== null) {
                formData.append(key, empObj[key]);
            }
        }

        const result = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const data = await result.json();

        if (!result.ok) {
            return {
                success: false,
                message: data.message || 'Failed to create employee'
            };
        }

        return data;

    } catch (error) {
        console.error('Error creating employee:', error);

        return {
            success: false,
            message: 'Cannot connect to the server'
        };
    }
};

export const UpdateEmpById = async (empObj,id)=>{
     const url = `${BASE_URL}/api/employees/${id}`;

    try {
        const formData = new FormData();

        for(const key in empObj){
            formData.append(key,empObj[key])
        }
      const options = {
            method: 'PUT',
            body: formData
            // DO NOT manually set 'Content-Type' when using FormData
        };

        const result = await fetch(url, options);
        const data = await result.json();

        return data;

    } catch (error) {
        console.error("Error creating employee:", error);
        return { error: true, message: error.message };
    }
};

export const DeleteEmpById = async (id)=>{
     const url = `${BASE_URL}/api/employees/${id}`;

    try {
    
      const options = {
            method: 'DELETE',
            // DO NOT manually set 'Content-Type' when using FormData
        };

        const result = await fetch(url, options);
        const data = await result.json();

        return data;

    } catch (error) {
        console.error("Error creating employee:", error);
        return { error: true, message: error.message };
    }
};


export const GetEmpById = async (id)=>{
     const url = `${BASE_URL}/api/employees/${id}`;

    try {
    
      const options = {
            method: 'GET',
            'Content-Type': 'application/json'
            // DO NOT manually set 'Content-Type' when using FormData
        };

        const result = await fetch(url, options);
        const data = await result.json();

        return data;

    } catch (error) {
        console.error("Error creating employee:", error);
        return { error: true, message: error.message };
    }
};