import React, { useEffect, useState } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";

const News = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadDataNews();
    }, []);

    const loadDataNews = async () => {
        try {
            const response = await axios.get("https://nuevomern-7y1b.onrender.com/api/noticias");
            setData(response.data);
        } catch (error) {
            console.error("Error:", error.response.data);
        }
    }

    return (
        <section>
            <div className="mx-auto">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-blue-800 mb-4">¡Adolescentes Desaparecidos!</h3>
                    <p className="text-lg text-gray-700">¡Ayúdanos a encontrar a estos adolescentes desaparecidos! Si tienes información, por favor contáctanos.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map(({ _id, nombre, descripcion, foto }) => (
                        <Card key={_id} color="white" shadow="xl" className="text-center">
                            <img src={foto} alt={nombre} className="w-full h-auto object-cover rounded-t-lg" style={{ height: '200px' }} />
                            <div className="p-4">
                            <Typography variant="h5" className="text-blue-800 mb-2">
                                    {nombre}
                                </Typography>
                                <Typography className="font-normal text-gray-800">
                                    {descripcion}
                                </Typography>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
