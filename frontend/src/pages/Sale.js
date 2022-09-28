import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {observer} from "mobx-react-lite";
import SaleProductList from "../components/cashier/sale/SaleProductList";
import {Context} from "../index";
import {fetchAllItems, fetchCategories} from "../http/itemAPI";
import {ScaleLoader} from "react-spinners";
import Footer from "../components/Footer";

const Sale = observer(() => {

    const {item} = useContext(Context)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await fetchCategories().then(data => item.setCategories(data)).then(
                await fetchAllItems().then(data => {
                        item.setItem(data)
                    }
                )
            )
        }

        fetchData().then(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center my-20">
                <ScaleLoader size={45} color='#15803d'/>
            </div>
        )
    }

    return (
        <>
            <header className="mt-0 fixed w-full z-10 top-0"><NavBar/></header>
            <div className="max-w-7xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
                {item.categories.map(category =>
                    <div key={category.id}>
                        <h1 className="text-3xl font-bold text-green-100 mt-8 px-2">
                            {category.name}
                        </h1>
                        <SaleProductList categoryId={category.id}/>
                    </div>
                )}
            </div>
            <footer className="w-full h-16 fixed left-0 bottom-0 justify-center items-center">
                <Footer/>
            </footer>
        </>
    );
});

export default Sale;
