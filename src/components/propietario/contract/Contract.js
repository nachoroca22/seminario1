import React, { Component } from 'react';

class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: this.props.property,
        };
    }
    
    render() {
        const contract = this.state.property.contrato;

        let inicio_contrato_texto = ""
        let fin_contrato_texto = ""

        if(contract.condiciones.inicio_contrato !== "" && contract.condiciones.fin_contrato !== "") {
            /* Fecha de inicio y fin del contrato en formato texto. */
            const dbDate_inicio = new Date(contract.condiciones.inicio_contrato);
            inicio_contrato_texto = new Intl.DateTimeFormat('es', { year: "numeric", month: "long", day: "2-digit" }).format(dbDate_inicio);
            const dbDate_fin = new Date(contract.condiciones.fin_contrato);
            fin_contrato_texto = new Intl.DateTimeFormat('es', { year: "numeric", month: "long", day: "2-digit" }).format(dbDate_fin);
        } else {
            inicio_contrato_texto = "Sin fecha"
            fin_contrato_texto = "Sin fecha"
        }
        
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-12 text-justify">
                       <h5 className="font-weight-bold text-center mb-5 mt-3"><u>CONTRATO DE LOCACIÓN</u></h5>
                       <p> {/* Introducción */}
                       En la Ciudad de <u>{contract.condiciones.ciudad}</u>, en el día <u>{inicio_contrato_texto}</u>, entre el Sr/Sra. <u>{contract.locador.apellido}</u> <u>{contract.locador.nombre}</u> DNI N° <u>{contract.locador.DNI}</u>, con domicilio en la calle <u>{contract.locador.domicilio}</u>, por una parte, en lo sucesivo denominado como “LOCADOR”  por una parte, y por la otra Sr/Sra. <u>{contract.locatario.apellido}</u> <u>{contract.locatario.nombre}</u> DNI N° <u>{contract.locatario.DNI}</u>, con domicilio en el inmueble locado, en adelante denominada como “LOCATARIO”, convienen en celebrar el presente contrato de LOCACIÓN  de vivienda, sujeto a las cláusulas siguientes y a las disposiciones del Código Civil y Comercial. 
                       </p>

                       <p> {/* 1. PRIMERA (OBJETO/DESTINO) - Completo */}
                       <span className="font-weight-bold">PRIMERA (OBJETO/DESTINO):</span> El “LOCADOR” cede en locación al “LOCATARIO/A”, que acepta ocupar en tal carácter, el inmueble ubicado en calle <u>{contract.condiciones.direccion_inmueble}</u> Piso <u>{contract.condiciones.piso}</u> Departamento “<u>{contract.condiciones.depto}</u>” de la Ciudad de <u>{contract.condiciones.ciudad}</u>. Todo en perfecto estado de conservación, que el LOCATARIO/A declara conocer por haberlo visitado antes de ahora. Corriendo exclusivamente a partir de la fecha el mantenimiento, limpieza y/o reparación de todas las instalaciones por exclusiva cuenta del LOCATARIO/A, debiendo reintegrar el inmueble al finalizar la locación, por vencimiento del término u otro motivo, en el mismo estado recibido. El LOCATARIO/A se obliga a destinar el inmueble locado para vivienda familiar, no pudiendo ello ser modificado, ni aún en forma temporaria, sin el consentimiento expreso del  “LOCADOR”. 
                       </p>

                       <p> {/* 2. SEGUNDA (PLAZO) */}
                       <span className="font-weight-bold">SEGUNDA (PLAZO):</span> Las partes acuerdan que el plazo de vigencia de la locación será de un año (12) meses a contar desde el día <u>{inicio_contrato_texto}</u> por lo que su vencimiento se producirá de pleno derecho e indefectiblemente el día <u>{fin_contrato_texto}</u>. Si el LOCADOR no quisiera continuar la relación locativa al vencimiento del plazo, deberá notificar al LOCATARIO/A con una antelación mínima de sesenta (60) días. Si el LOCATARIO/A no quiere continuar deberá notificar al LOCADOR/A con una antelación mínima de treinta (30) días. 
                       </p>

                       <p> {/* 3. TERCERA (PRECIO) - Completo */}
                       <span className="font-weight-bold">TERCERA (PRECIO):</span> El precio de la locación se pacta en la suma de $ARG <u>{contract.condiciones.precio_arg}</u> mensuales o su equivalente en dolares de $USD <u>{contract.condiciones.precio_usd}</u>, siendo el plazo de pago del 5 al 10 de cada mes. 
                       </p>

                       <p> {/* 4. CUARTA (FECHA/LUGAR DE PAGO) - Completo */}
                       <span className="font-weight-bold">CUARTA (FECHA/LUGAR DE PAGO):</span> El alquiler será abonado por adelantado del 5 al 10 de cada mes, donde se acuerde posteriormente entre el LOCADOR y el LOCATARIO/A, siempre en el radio de la Ciudad de <u>{contract.condiciones.ciudad}</u>. 
                       </p>

                       <hr className="mt-4 mb-4"/>
                       
                       <p> {/* 5. QUINTA (INTERESES) - Completo */}
                       <span className="font-weight-bold">QUINTA (INTERESES):</span>La mora en el pago de los alquileres se producirá de forma automática por el mero transcurso del tiempo y sin necesidad de interpelación ni gestión previa de ninguna naturaleza. Producida la mora los alquileres siempre deberán abonarse con una multa equivalente a la tasa activa por plazo fijo en el Banco de la Nación Argentina, durante el tiempo que demore en efectivizar el pago de los alquileres  adeudados, pudiendo el LOCADOR a rehusar el cobro del alquiler en mora sin el pago conjunto de este interés. 
                       </p>

                       <p> {/* 6. SEXTA (PROHIBICIONES/INTRANSFERIBILIDAD) - Completo */}
                       <span className="font-weight-bold">SEXTA (PROHIBICIONES/INTRANSFERIBILIDAD):</span>El presente contrato de locación es intransferible. Le queda prohibido al LOCATARIO/A cederlo o subarrendarlo total o parcialmente, sin consentimiento del LOCADOR, ya sea  en forma gratuita u onerosa, ni se podrá dar el inmueble en préstamo de uso, aunque sea gratuito ni permitir su ocupación por terceros en ningún carácter -dicha restricción no alcanza a las modificaciones en Ia conformación del grupo familiar del LOCATARIO/A que pudieran suceder durante Ia relación locativa-. Asimismo, queda estrictamente prohibido usarlo indebidamente por el LOCATARIO/A contrariando las leyes, ni darle otro destino que el establecido de vivienda personal únicamente (siendo específicamente determinado en el presente que no se podrá dar otro destino que el antes mencionado -Habitacional- en los términos del artículo 1194 del Código Civil y Comercial de la Nación sin el consentimiento del LOCADOR.
                       </p>

                       <p> {/* 7. SEPTIMA (MODIFICACIONES): - Completo */}
                       <span className="font-weight-bold">SEPTIMA (MODIFICACIONES):</span>Está terminantemente prohibido realizar modificaciones en el inmueble así como mejoras, en su caso, deberán ser aprobadas previamente por escrito por el LOCADOR y quedarán a su exclusivo beneficio una vez finalizado el plazo de la locación, sin derecho a retribución o compensación alguna por parte del LOCATARIO/A. Aún en el supuesto de que las modificaciones o mejoras introducidas puedan considerarse como necesarias (urgentes o no), toda mejora de cualquier tipo cederá en beneficio de la unidad locada. El LOCATARIO/A responderá de todo deterioro causado por su culpa o negligencia o de las personas por quienes deba responder, excepto los deterioros provenientes del mero transcurso del tiempo y el uso regular. También debe entregar al restituir la unidad al LOCADOR las constancias de pago efectuados por la relación locativa atinentes a ésta o a sus servicios que no haya entregado en forma mensual (art. 1210 CC y C). Se tendrá en cuenta un plazo de 1 mes a partir del inicio del contrato, en el cual el/la LOCATARIO/A podrá verificar el correcto funcionamiento de todos los electrodomésticos y accesorios. En caso de que existiese algún desperfecto, el/la LOCATARIO/A informará al LOCADOR para poder gestionar su reparación.
                       </p>

                       <hr className="mt-4 mb-4"/>

                       <p> {/* 8. OCTAVA (LA CLÁUSULA DE GARANTÍA): - Completo */}
                       <span className="font-weight-bold">OCTAVA (LA CLÁUSULA DE GARANTÍA): </span>El/La señor/a <u>{contract.garante.apellido}</u> <u>{contract.garante.nombre}</u> con D.N.I. N° <u>{contract.garante.DNI}</u> con domicilio en la calle <u>{contract.garante.domicilio}</u>,  de la ciudad de <u>{contract.garante.ciudad}</u>, Provincia de <u>{contract.garante.provincia}</u>, se constituye en codeudor, fiador solidario y principal pagador. Renunciando en este acto a los beneficios de división y excusión, aceptando ser deudor directo de todas las obligaciones que asume el LOCATARIO/A en el presente contrato, y sus responsabilidades subsistirán hasta que el LOCADOR se dé por conforme y reciba el inmueble arrendado en las condiciones establecidas, y dé por pagadas todas las sumas que pudiera adeudar por cualquier concepto el LOCATARIO/A. Subsistirán también sus obligaciones aún después del vencimiento de este contrato. Especialmente se establece que el garante responderá si por cualquier disposición legal y futura el LOCADOR se viera precisado a tolerar una prórroga de la locación en cualquier condición. Asimismo se extenderá su responsabilidad a las costas, gastos y honorarios que pudieren devengarse con motivo de cualquier juicio que a raíz de este contrato se viera precisado a iniciar el LOCADOR, ya sea por desalojo, cobro de alquileres, cobro de reparaciones y/o indemnizaciones en las cuales pudiera ser condenado el LOCATARIO/A, y que podrán ser reclamadas en cualquier juicio o en el mismo expediente donde se devengaron. La garantía que se constituye en cumplimiento del presente, comprende la totalidad del patrimonio del GARANTE.
                       </p>

                       <p> {/* 9. NOVENA (IMPUESTOS/SERVICIOS/EXPENSAS): - Completo */}
                       <span className="font-weight-bold">NOVENA (IMPUESTOS/SERVICIOS/EXPENSAS): </span>Las partes establecen como parte integrante de la prestación dineraria a cargo del LOCATARIO/A los siguientes rubros correspondientes al inmueble objeto del presente: EXPENSAS COMUNES, GAS y LUZ. Se deja especialmente aclarado que todo servicio adicional, fuera de los estipulados en el presente contrato que contrate el LOCATARIO/A, serán a cargo del mismo, de manera que el alquiler que percibe el LOCADOR lo recibirá libre de descuento por gasto o pago alguno, debiendo en cada oportunidad de pagar el alquiler mensual, el LOCATARIO/A, entregar los correspondientes recibos pagados de los rubros antes mencionados, o de los que pudieran corresponder. La falta de pago de cualquiera de los rubros mencionados será considerado como falta de pago del canon convenido y traerá aparejado el inicio de acciones por el "procedimiento judicial ejecutivo", con facultad del LOCADOR para demandar al LOCATARIO/A y CODEUDOR-FIADOR el pago de las cláusulas penales e intereses pactados. Al finalizar el contrato, el/la LOCATARIO/A deberá abonar los servicios a mes vencidos correspondientes a su último mes de alquiler.
                       </p>
                        
                       <hr className="mt-4 mb-4"/>
                       
                       <p> {/* 10. DÉCIMA (DEPÓSITO):  - Completo */}
                       <span className="font-weight-bold">DÉCIMA (DEPÓSITO): </span>En garantía del fiel cumplimiento de todas las obligaciones pactadas en el presente contrato, el LOCATARIO/A entrega en este acto la suma de $ARG <u>{contract.condiciones.precio_arg}</u>, monto que será abonado en un pago junto con el primer mes de alquiler. Este depósito será devuelto al extinguirse la relación locativa, dentro de los sesenta días, sin ningún tipo de actualización y previa verificación del estado del bien y de las cuentas pendientes por todo rubro o concepto establecido como prestación dineraria a cargo del LOCATARIO/A. Sirve el presente de suficiente recibo y eficaz carta de pago por el importe mencionado. La suma entregada en depósito, en ningún caso podrá aplicarse al pago de alquileres atrasados, ni podrá solicitarse su imputación en caso de desalojo.
                       </p>

                       <p> {/* 11. DÉCIMA PRIMERA (ESTADO DEL INMUEBLE E INVENTARIO):  - Completo */}
                       <span className="font-weight-bold">DÉCIMA PRIMERA (ESTADO DEL INMUEBLE E INVENTARIO): </span>El/la LOCATARIO/A se obliga a preservar el inmueble, y a restituirlo en iguales condiciones a las de recepción, salvo por el normal desgaste propio de un uso adecuado. Serán a exclusivo cargo del LOCATARIO/A todas las reparaciones, reconstrucciones y/o refacciones que fueran menester realizar para el debido cumplimiento de esta obligación, cualquiera fuera la causa, naturaleza o cuantía del deterioro, y sin derecho a reembolso alguno a su favor. En caso de no hacerlo, el/la LOCADOR/A tendrá derecho a realizarlo a cuenta del/la LOCATARIO/A.
                       Serán a exclusivo cargo del/la LOCADOR/A las reparaciones, reconstrucciones y/o refacciones que fueran menester realizar en el inmueble por daños causados por fuerza mayor, hechos de terceros, vicios redhibitorios, o por el normal uso de la cosa, y sin derecho a reembolso alguno a su favor. En caso de no hacerlo, el/la LOCATARIO/A tendrá derecho a realizarlo a cuenta del/la LOCADOR/A, pudiendo descontarlo del importe del alquiler.
                       El LOCATARIO declara conocer y aceptar el reglamento de copropiedad y su falta de cumplimiento será causal de rescisión.
                       </p>

                       <p> {/* 12. DÉCIMA SEGUNDA (INCUMPLIMIENTO): - Completo */}
                       <span className="font-weight-bold">DÉCIMA SEGUNDA (INCUMPLIMIENTO): </span>La violación por parte del LOCATARIO/A de cualquiera de las obligaciones que asume en el presente, dará derecho a él LOCADOR para optar entre exigir su cabal cumplimiento o dar por resuelto el presente contrato y exigir el inmediato desalojo del inmueble con el pago de los daños y perjuicios pertinentes.
                       </p>

                       <hr className="mt-4 mb-4"/>

                       <p> {/* 13. DÉCIMA TERCERA (FALTA DE PAGO): - Completo */}
                       <span className="font-weight-bold">DÉCIMA TERCERA (FALTA DE PAGO): </span>La falta de pago de 3 (tres) meses de alquiler consecutivos, dará derecho al LOCADOR a, previos los trámites establecidos por la ley, considerar irrevocablemente rescindido el presente contrato de locación y convenio, pudiendo pedir el desalojo del bien y con derecho a reclamar las pérdidas e intereses que ocasione el incumplimiento. Previo a ello, en todos los casos el LOCADOR deberá intimar fehacientemente al LOCATARIO/A el pago de la cantidad debida, otorgando para ello un plazo que nunca debe ser inferior a diez días corridos contados a partir de la recepción de la intimación, consignando el lugar de pago.
                       </p>

                       <p> {/* 14. DÉCIMA CUARTA (FALTA DE DEVOLUCION): - Completo */}
                       <span className="font-weight-bold">DÉCIMA CUARTA (FALTA DE DEVOLUCION): </span>Rigiéndose este contrato de locación exclusivamente por las disposiciones de la legislación vigente (Código Civil y Comercial), el LOCATARIO/A deberá devolver el inmueble arrendado a su vencimiento, sin excusas, demoras, ni invocación de ninguna naturaleza. No obstante si por cualquier motivo el inmueble no fuera devuelto a su vencimiento, sin perjuicio del ejercicio de las acciones pertinentes por parte del LOCADOR para obtener el desalojo, el LOCATARIO/A deberá abonar además del canon convenido a su cargo, en concepto de indemnización por ocupación ilegítima, una suma mensual igual al alquiler vigente pactado en la cláusula tercera, prorrateado en modo diario y mientras la falta de devolución subsista. Hasta que el LOCADOR obtenga efectivamente la restitución del bien de entera conformidad. Se pacta que dicha indemnización podrá ser reclamada por la misma vía ejecutiva de todas las prestaciones dinerarias a cargo del LOCATARIO/A (art. 1208 CC y C).
                       </p>

                       <p> {/* 15. DÉCIMA QUINTA (PRIMER MES): - Completo */}
                       <span className="font-weight-bold">DÉCIMA QUINTA (PRIMER MES): </span>El LOCATARIO/A abona en este acto la cantidad de $ARG <u>{contract.condiciones.precio_arg}</u> en concepto de primer mes de alquiler. Este contrato firmado es suficiente recibo por la cantidad recibida. El LOCATARIO/A recibe en el presente acto las llaves y toma la tenencia de la locación que les acuerda este contrato. 
                       </p>

                       <p>{/* 16. DÉCIMA SEXTA (ENTREGA DE LLAVES): - Completo */}
                       <span className="font-weight-bold">DÉCIMA SEXTA (ENTREGA DE LLAVES): </span>Al finalizar el contrato la entrega de las llaves o de la propiedad sólo se justificará por escrito emanado del LOCADOR o de quien éste autorice para recibirlas, no admitiéndose otro medio de prueba. Si el LOCATARIO/A consigna las llaves, adeudará al LOCADOR el alquiler fijado en ese momento con más las accesorias previstas, hasta el día en que el LOCADOR acepte la consignación o se le dé posesión del inmueble sin que esto menoscabe su derecho de exigir el pago de las penalidades pactadas por esta circunstancia.
                       </p>

                       <hr className="mt-4 mb-4"/>

                       <p>{/* 17. DÉCIMA SÉPTIMA (RESCISIÓN ANTICIPADA): - Completo */}
                       <span className="font-weight-bold">DÉCIMA SÉPTIMA (RESCISIÓN ANTICIPADA): </span>El LOCATARIO podrá resolver el presente contrato de locación a partir de los seis meses, abonando la suma equivalente a un mes de alquiler vigente. 
                       </p>

                       
                       <p>{/* 18. DÉCIMA OCTAVA (DOMICILIOS DE LAS PARTES): - Completo */}
                       <span className="font-weight-bold">DÉCIMA OCTAVA (DOMICILIOS DE LAS PARTES): </span>Los intervinientes en el presente contrato establecen que los domicilios que indican son domicilios especiales, circunstancia por la cual las notificaciones –extrajudiciales y judiciales- a ellos dirigidas son plenamente válidas y surtirán plenos efectos legales, aun cuando las partes no se encuentren en ellos de modo permanente o transitorio. Los domicilios especiales aquí indicados podrán ser modificados –sola y únicamente- con previa notificación fehaciente a todas las partes, revistiendo siempre los nuevos domicilios también la calidad de domicilios especiales con los efectos  antes descriptos. Se somete a la jurisdicción y competencia de la Justicia Ordinaria en lo Civil de la Capital Federal con expresa renuncia a cualquier otro fuero y/o jurisdicción que pudiera corresponderles. 
                       </p>

                       <p>{/* 19. DÉCIMA NOVENA: REPARACIONES: - Completo */}
                       <span className="font-weight-bold">DÉCIMA NOVENA: REPARACIONES: </span>El LOCATARIO/A dará inmediata cuenta al LOCADOR de cualquier desperfecto que sufriera la propiedad permitiéndole al mismo o a sus representantes el libre acceso a cualquier dependencia, cuando éste juzgue necesario su inspección; obligándose también a efectivizar todo trabajo que sea necesario para la conservación o mejora de la unidad sin derecho a cobrar indemnización alguna. 
                       </p>

                       <p>{/* 20. VIGÉSIMA (FIRMA Y EJEMPLARES): - Completo */}
                       <span className="font-weight-bold">VIGÉSIMA (FIRMA Y EJEMPLARES): </span>En prueba de conformidad, se firma digitalmente dicho contrato.  
                       </p>

                    </div>
                </div>
            </div>
        )
    }
}

export default Contract;