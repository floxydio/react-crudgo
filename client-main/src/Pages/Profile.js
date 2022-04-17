import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';



export default function Profile({name}) {
    const navigate = useNavigate()

    const [dataProduct, setDataProduct] = useState([])
    const [namabarang, setNamaBarang] = useState("")
    const [pembuat, setPembuat] = useState("")
    const [harga, setHarga] = useState("")
    const [isClicked, setClicked] = useState(false)

    const getData = () => {
        fetch('http://localhost:2000/product')
        .then(res => res.json())
        .then(res => {
            
            setDataProduct(res.data)
        })
    }

    const showHide = () => {
        setClicked(!isClicked)
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:2000/products/del/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            getData()
        })
    } 

    useEffect(() => {
        getData()
    }, [])

    const handleDetail = (id) => {
        navigate(`/detail/${id}`)
         
        
    }
    const addProduct = (e) => {
        e.preventDefault()
        fetch('http://localhost:2000/products', {
            method: "POST",
            headers: {  "Content-Type": "application/json" },
            body: JSON.stringify({ "name": namabarang, "price": parseFloat(harga), "uploaded_by" : pembuat  }),
        }).then(res => res.json()).then(res => {
            alert(res.message)
            getData()
        })
    }
    const removeToken = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }
    
    return (
        <>
        <div className='product'>
            <div className='product-header flex justify-between'>
            <button style={{
                backgroundColor: '#007BFF',
                color: 'white',
                padding: '10px',
                marginBottom: isClicked ? '40px' : '20px',
            }} onClick={showHide}>+Add Product</button>
            <button style={{

marginBottom: isClicked ? '40px' : '20px',
            }} onClick={removeToken}>Logout</button>
            </div>
            {isClicked ? <form className='flex justify-around'>
                <input type="text" placeholder='Masukan Nama Barang'  onChange={(e) => setNamaBarang(e.target.value)} />
                <input type="text" placeholder='Masukan Harga' onChange={(e) => setHarga(e.target.value)} />
                <input type="text" placeholder='Masukan Pembuat' onChange={(e) => setPembuat(e.target.value)} />
                <button onClick={addProduct}>Tambah</button>
            </form> : <span></span>}
            {dataProduct.map((item) => {
                return (
                    <div className='product-item mx-2' key={item.id}>
                        <p className='my-3'>Nama Barang: {item.name}</p>
                        <p className='my-3'>Harga Barang: {item.price}</p>
                        <button style={{
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            fontWeight: 'bold',
                            marginRight: '10px'
                        }} onClick={() => handleDetail(item.id)}>Detail</button>
                        <button style={{
                            color: 'red',
                        }} onClick={() => handleDelete(item.id)}>X</button>
                    </div>
                )
            })}
        </div>
        </>
    );
}