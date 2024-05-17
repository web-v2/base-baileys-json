const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const fs = require('fs');
//import sendMessageIA from './ia.js';
//const { sendMessageIA } = require('./ia.js');


const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)


const flowProductos = addKeyword(['1', 'productos'])
    .addAnswer(['💥 *Listado de productos* 💥'])
    .addAnswer(
    [
        '1 - Costeñitas - Caja x 38 - *$80.000* - c/u *$3.000*',
        '2 - Aguila Negra - Caja x 30 - *$75.000* - c/u *$3.000*',
        '3 - Aguila Light - Caja x 30 - *$75.000* - c/u *$3.000*',
        '4 - Nativa - Caja x 30 - *$60.000* - c/u *$2.000*',
        '5 - Club Colombia - Caja x 30 - *$85.000* - c/u *$4.000*',
        '👉*Menu*',
    ]
)

const flowHorarios = addKeyword(['2', 'horario', 'horarios'])
    .addAnswer(['🕓 *Horarios de atenciones* 🕓'])
    .addAnswer(
    [
        'Atendemos de *Lunes* a *Sabado*',
        'De 10 am a 10 pm y *domingos* de 11 am a 9 pm',
        '👉*Menu*',
    ]
)

const flowDireccion = addKeyword(['3', 'direccion', 'ubicacion'])
    .addAnswer(['🚩 *Ubicación* 🚩'])
    .addAnswer(
    [
        'Estamos ubicados en el barrio *La Palma, Sincelejo*',
        '👉*Menu*',
    ]
)

const flowEmpresa = addKeyword(['4', 'contacto', 'info' , 'empresa'])
    .addAnswer(['✅ *Información de la Empresa* ✅'])
    .addAnswer(
    [
        '*Nombre:* Punto Frio Mr Beer',
        '*Ubicación:* Barrio La Palma',
        '*Propietario:* Fernando Yepez',
        '*Celular:* 313 674 5356',
        '👉*Menu*',
    ]
)

const flowFormaPagoEfectivo = addKeyword(['Efectivo']).addAnswer(['Gracias por comunicarte, pronto te llamaremos para finalizar el proceso']).addAnswer(['👉*Menu*'])

const flowFormaPagoNequi = addKeyword(['Nequi'])
    .addAnswer(['Nequi: *3136745356*'])
    .addAnswer(['Nombre: *Fernando Yepez*'])
    .addAnswer(['Gracias por comunicarte, pronto te llamaremos para finalizar el proceso'])
    .addAnswer(['👉*Menu*'])

    const flowFormaPagoDaviplata = addKeyword(['Daviplata'])
    .addAnswer(['Nequi: *Daviplata*'])
    .addAnswer(['Nombre: *Fernando Yepez*'])
    .addAnswer(['Gracias por comunicarte, pronto te llamaremos para finalizar el proceso'])
    .addAnswer(['👉*Menu*'])

const flowPedidoA = addKeyword(['A', 'Costeñitas'])
    .addAnswer(['💯 *A* - Costeñitas - Caja x 38 - *$80.000* 💯'])
    .addAnswer(['Formas de pago:'])
    .addAnswer(
    [
        '👉 Efectivo',
        '👉 Nequi',
        '👉 Daviplata',
        '👉*Menu*',
    ],
    null,
    null,
    [flowFormaPagoEfectivo, flowFormaPagoNequi, flowFormaPagoDaviplata]
)
const flowPedidoB = addKeyword(['B', 'Negra'])
    .addAnswer(['💯 *B* - Aguila Negra - Caja x 30 - *$75.000* 💯'])
    .addAnswer(['Formas de pago:'])
    .addAnswer(
    [
        '👉 Efectivo',
        '👉 Nequi',
        '👉 Daviplata',
        '👉*Menu*',
    ],
    null,
    null,
    [flowFormaPagoEfectivo, flowFormaPagoNequi, flowFormaPagoDaviplata]
)
const flowPedidoC = addKeyword(['C', 'Light'])
    .addAnswer(['💯 *C* - Aguila Light - Caja x 30 - *$75.000* 💯'])
    .addAnswer(['Formas de pago:'])
    .addAnswer(
    [
        '👉 Efectivo',
        '👉 Nequi',
        '👉 Daviplata',
        '👉*Menu*',
    ],
    null,
    null,
    [flowFormaPagoEfectivo, flowFormaPagoNequi, flowFormaPagoDaviplata]
)
const flowPedidoD = addKeyword(['D', 'Nativa'])
    .addAnswer(['💯 *D* - Nativa - Caja x 30 - *$60.000* 💯'])
    .addAnswer(['Formas de pago:'])
    .addAnswer(
    [
        '👉 Efectivo',
        '👉 Nequi',
        '👉 Daviplata',
        '👉*Menu*',
    ],
    null,
    null,
    [flowFormaPagoEfectivo, flowFormaPagoNequi, flowFormaPagoDaviplata]
)
const flowPedidoE = addKeyword(['E', 'Club'])
    .addAnswer(['💯 *E* - Club Colombia - Caja x 30 - *$85.000* 💯'])
    .addAnswer(['Formas de pago:'])
    .addAnswer(
    [
        '👉 Efectivo',
        '👉 Nequi',
        '👉 Daviplata',
        '👉*Menu*',
    ],
    null,
    null,
    [flowFormaPagoEfectivo, flowFormaPagoNequi, flowFormaPagoDaviplata]
)

const flowPedidos = addKeyword(['5', 'pedidos'])
    .addAnswer(['💯 *Realiza tu pedido* 💯'])
    .addAnswer(
    [
        '👉 *A* - Costeñitas - Caja x 38 - *$80.000*',
        '👉 *B* - Aguila Negra - Caja x 30 - *$75.000*',
        '👉 *C* - Aguila Light - Caja x 30 - *$75.000*',
        '👉 *D* - Nativa - Caja x 30 - *$60.000*',
        '👉 *E* - Club Colombia - Caja x 30 - *$85.000*',
        '👉*Menu*',
    ],
    null,
    null,
    [flowPedidoA, flowPedidoB, flowPedidoC, flowPedidoD, flowPedidoE]
)

let r = '';
const flowGPT = addKeyword(['6'])
        .addAnswer('🤖 *Realiza tu consulta a la IA* 🤖', {capture: true}, async (ctx, {flowDynamic}) => {
            let textSolicitud = ctx.body
            console.log({ textSolicitud: ctx.body })
            r = await sendMessageIA(textSolicitud)
            console.log('Respuesta IA: '+ r)   
            console.log('***Fin respuesta IA***')     
            return  'Respuesta IA: '+ r 
        })        
        .addAnswer('🤖🤖 Gracias por tu participacion');

const flowPrincipal = addKeyword(['Menu', 'hola', 'ole', 'alo' , 'Hola', 'menu'])
    .addAnswer('🤖 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'Escoje una opción',
            '👉 *1* para ver los productos',
            '👉 *2*  para ver los horarios de atención',
            '👉 *3*  para ver la dirección donde nos encontramos',
            '👉 *4*  para ver información de contactos y empresa',
            '👉 *5*  para realizar un pedido',
            '👉 *6*  para realizar una consulta a la IA',
        ],
        null,
        null,
        [flowProductos, flowHorarios, flowDireccion, flowEmpresa, flowPedidos, flowGPT]
)






const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()




async function fetchChatGPTResponse(message) {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer gAAAAABmMF89uVU6D1xtnTQOBsntvHIkdAtwhR-j5E1la_aFagT67Rs8V3C3-hOOdI3PgEPHCCNck8vpXtiWJen1oKVFAzfe5es8WHfBH4Xql4-8uazZHGBtv8LWa-ca8_Ewd1Cu2lTd",
      },
      body: JSON.stringify({
        formality: "default",
        max_tokens: 2048,
        model: "chat-sophos-1",
        n: 1,
        source_lang: "es",
        target_lang: "es",
        temperature: 0.7,
        text: message,
      }),
    };
    let r = "";
    const resp = await fetch(
      "https://api.textcortex.com/v1/texts/expansions",
      options
    )
      .then((response) => response.json())
      .then((response) => (r = response.data.outputs[0].text.trim()))
      .catch((err) => console.error(err));
    //console.log(r);
    return r;
  }


async function sendMessageIA(message) {        
    if (message === "") return;
    let responseIA = "";
    try {
      responseIA = await fetchChatGPTResponse(message);
    } catch (error) {
      console.error("Error:", error.message);
    }
    return responseIA;
  }