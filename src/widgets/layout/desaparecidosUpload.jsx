import React, {useState} from 'react';
import {PageTitle} from '@/widgets/layout';
import {
    Typography,
    Button,
    Input,
    Textarea,
    Checkbox,
    Card // Importamos el componente Card
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";

export function DesaparecidosUpload() {




    return (
        <div className="w-full h-full">
            <PageTitle section="Reportar Desaparecido" heading="Envia los datos del menor desaparecido">
                Completa los campos para realizar tu reporte
            </PageTitle>

            <Card className="mx-auto w-full mt-4 lg:w-5/12 p-1"> {/* Envolver el formulario en una Card */}

            </Card>
        </div>
    )
}

DesaparecidosUpload.displayName = "/src/widgets/layout/desaparecidosUpload.jsx";

export default DesaparecidosUpload;
