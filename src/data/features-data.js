import {
  BellAlertIcon,
  CogIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/solid";

export const featuresData = [
  {
    
    color: "blue-600",
    title: "Como funciona nuestro aplicativo",
    icon:   CogIcon,
    description: 

      "Nuestra aplicación ofrece predefinir rutas . El padre crea y monitorea las rutas, mientras que el menor las sigue desde su dispositivo. Si se desvía, el padre recibe una notificación instantánea.",
  },
  {
    color: "gray",
    title: "De interés para ti",
    icon: ShieldCheckIcon,
    description:
      " Nuestra prioridad es que tengas ubicación del menor en tiempo real y enviar notificaciones instantáneas si se desvía de las rutas predefinidas por el tutor a cargo. Adicional, un tutor puede realizar como solicitudes publicat un menor desaparecido",
  },
  {
    color: "gray",
    title: "Chat en tiempo real",
    icon: BellAlertIcon,
    description:
      "Si un menor necesita comunicar al tutor una desviación para no  preocupar a su tutor responsable, puede enviarle un mensaje o dirigirlo realizar una llamada y avisar anticipadamente la notificación de alerta  ",
  },
];

export default featuresData;
