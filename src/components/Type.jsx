export default function Type(props){
    console.log(props.selected)
    return(
            <label>
                Type of Wine 
                <select id='type' name='type' value = {props.selected} >
                    <option disabled value=''>Select Type...</option>
                    <option value='BY THE GLASS'>BY THE GLASS</option>
                    <option value='HALF BOTTLES'>HALF BOTTLES</option>
                    <option value='LARGE FORMATS'>LARGE FORMATS</option>
                    <option value='SAKE'>SAKE</option>
                    <option value='SPARKLING'>SPARKLING</option>
                    <option value='CHAMPAGNE'>CHAMPAGNE</option>
                    <option value='WHITE WINE'>WHITE WINE</option>
                    <option value='ROSÉ WINE'>ROSÉ WINE</option>
                    <option value='RED WINE'>RED WINE</option>
                    <option value='SWEET WINE'>SWEET WINE</option>
                    <option value='FORTIFIED WINE'>FORTIFIED WINE</option>
                </select>
            </label>    
    )
}