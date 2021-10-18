import React from 'react'
import { useState, useEffect} from 'react'
import { Api } from '../../Api/Api';
import ProductCard from '../ProductCard/ProductCard';

export const ProdutosList = () => {
    const [produtos, setProdutos] = useState([]);
    
    useEffect(() => {
        const loadData = async () => {
            const response = await Api.buildApiGetRequest(Api.readAllUrl());

            const results = await response.json();
            
            setProdutos(results);
        };
        
        loadData();
    }, [])

    return (
        <div className="cards">
            {produtos.map((product, index) => (
                <ProductCard 
                    key={`product_list${index}`} 
                    product={product}>
                </ProductCard>
            ))}
        </div>
    )
}
