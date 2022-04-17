import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
export default function Detail() {
    let {id} = useParams();
    const [dataProduct, setData] = useState([])

    const getData = () => {
        fetch(`http://localhost:2000/products/${id}`)
        .then(res =>res.json())
        .then(res => {
            setData(res.data)
        })
    }
    useEffect(() => {
        console.log(id)
        getData()
    }, [])
    return(
        <>
            <div>
            <p>{dataProduct.name}</p>
            <p>{dataProduct.price}</p>
            </div>
        </>
    )
}