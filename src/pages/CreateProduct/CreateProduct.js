import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Api } from "../../Api/Api";

export default function CreateProduct(props) {
    const [categories, setCategories] = useState([]);
    
    const [categoriesIds, setCategoriesIds] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const response = await Api.buildApiGetRequest(
                Api.readAllCategoriesUrl(),
                true
            );

            const results = await response.json();

            setCategories(results);
        };

        loadCategories();
    }, []);

    const handleSubmit = async event => {
        // Previne o comportamento padrão do submit, que no caso do form é o refresh
        event.preventDefault();

        // Obtém os dados dos inputs
        const name = event.target.name.value;
        const price = +event.target.price.value;
        const imageUrl = event.target.imageUrl.value;

        // Constrói um payload com esses dados
        const payload = {
            name,
            price,
            images: [
                {
                    url: imageUrl,
                },
            ],
            categoriesIds,
        };

        // Faz uma requisição no backend
        const response = await Api.buildApiPostRequest(
            Api.createProductUrl(),
            payload,
            true
        );

        const body = await response.json();

        if (response.status === 201) {
            //Product created sucessfully
            console.log(body);

            const id = body.id;

            props.history.push(`/product/view/${id}`)

            console.log(id);
        } else {
            // erro
        }
        
    };
    const options = categories.map(category => ({
        value: category.id, 
        label: category.name
    }))
    

      const handleCategoryChange =(selectedOption) => {
        setCategoriesIds(selectedOption.map(option => option.value));
      }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label className="form__label" htmlFor="name">Name:</label>
                    <br />

                    <input className="form__input-text" type="text" id="name" name="name" />
                    <br />
                </div>

                <div>
                    <label className="form__label" htmlFor="price">Price:</label>
                    <br />

                    <input className="form__input-text" type="number" id="price" name="price" />
                    <br />
                </div>

                <div>
                    <label className="form__label" htmlFor="imageUrl">Image URL:</label>
                    <br />

                    <input className="form__input-text" type="text" id="imageUrl" name="imageUrl" />
                    <br />
                </div>

                <div>
                    <label className="form__label" >Categories</label>
                    <br />
                </div>

                <div>
                    <Select isMulti options={options} onChange={handleCategoryChange}/>
                </div>

                <input className="form__submit" type="submit" value="Add" />
            </form>
        </div>
    );
}
