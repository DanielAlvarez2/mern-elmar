import { useState, useEffect } from 'react'
import {FaPlusCircle} from 'react-icons/fa'
import { FaCheckCircle } from "react-icons/fa"
import { FaMinusCircle } from "react-icons/fa"
import { MdChangeHistory } from "react-icons/md"
import Type from './components/Type.jsx'
export default function App() {
  const [wines, setWines] = useState([])
  function getWines(){
     fetch('/api/wines')
      .then(res=>res.json())
      .then(json=>setWines(json))
      .catch(err=>console.log(err))
  }
  useEffect(()=>getWines(),[])
  async function deleteWine(id){
    await fetch(`/api/wines/${id}`,{method:'DELETE'})
            .then(console.log('Deleted from Database: ___'))
            .then(async()=>await getWines())
            .catch(err=>console.log(err))
  }
  async function addWine(formData){
    await fetch('/api/wines',{method:'POST',
                              headers:{'Content-Type':'application/json'},
                              body: JSON.stringify({
                                type:formData.get('type'),
                                section:formData.get('section'),
                                category:formData.get('category'),
                                region:formData.get('region'),
                                subRegion:formData.get('subRegion'),
                                bin:formData.get('bin'),
                                description:formData.get('description'),
                                vintageSize:formData.get('vintageSize'),
                                price:formData.get('price'),
                                microsPrice:formData.get('microsPrice'),
                                sequence:formData.get('sequence'),
                              })
    })
      .then(console.log('Added to Database: ___'))
      .then(async()=>await getWines())
      .catch(err=>console.log(err))
  }
  async function updateWine(formData){
    const bin = formData.get('bin') ? formData.get('bin') : formData.get('binPrev')
    const description = formData.get('description') ? formData.get('description') : formData.get('descriptionPrev')
    const vintageSize = formData.get('vintageSize') ? formData.get('vintageSize') : formData.get('vintageSizePrev')
    const price = formData.get('price') ? formData.get('price') : formData.get('pricePrev')
    const type = formData.get('type') ? formData.get('type') : formData.get('typePrev')
    await fetch(`/api/wines/${formData.get('id')}`,{method:'PUT',
                                                    headers:{'Content-Type':'application/json'},
                                                    body: JSON.stringify({
                                                      bin,
                                                      description,
                                                      vintageSize,
                                                      price,
                                                      type
                                                    })
    })
      .then(console.log('Wine Updated: ___'))
      .then(async()=>await getWines())
      // .then(setTimeout(()=>document.querySelectorAll('.edit-display').forEach(item=>item.style.display = 'none'),1000))
      .then(document.querySelectorAll('.edit-display').forEach(item=>item.style.display = 'none'))
      .catch(err=>console.log(err))
  }
  return(
    <div id='wrapper'>
      <form id='add-form' action={addWine}>
        <div id='form-row-1'>
          <label id='bin-label'>
            Bin#
            <input type='text' maxLength='4' id='bin' name='bin' placeholder='Bin#' />
          </label>
          <label>
            Vintage
            <input type='text' maxLength='6' id='vintage-size' name='vintageSize' placeholder='Vintage' />
          </label>
          <label>
            Price
            <input type='text' maxLength='6' id='price' name='price' placeholder='Price' />
          </label>
          <label>
            Typos
            <input type='text' id='tyops' name='typos' placeholder='Typos' />
          </label>
        </div>
        <label>
          Description
          <input id='description' maxLength='85' name='description' placeholder='Wine Description' />
        </label>
        <div className='form-dropdowns'>
          <Type selected='' />
          <label>
            Section
            <select id='section' name='section' defaultValue='' >
              <option disabled value=''>Select Section...</option>
              <option value='CHAMPAGNE'>CHAMPAGNE</option>
              <option value='WHITE WINE'>WHITE WINE</option>
              <option value='RED WINE'>RED WINE</option>
              <option value='SAKE'>SAKE</option>
            </select>
          </label>

        </div>
        <button style={{background:'green'}}>
          {<><FaPlusCircle /> Add Wine</>}
        </button>
      </form>

      <div id='wines'>  
      
      {wines.map(data=>{
        return(
            <div key={data._id}>
              <div className='wine-display'>
                <span className='bins'><span className='bin-display'>{data.bin}</span></span>
                <span className='descriptions'><span className='description-display'>{data.description}</span></span>
                <span className='vintageSizes'><span className='vintage-size-display'>{data.vintageSize}</span></span> 
                <span className='prices'><span className='price-display'>{data.price}</span></span>
                <button style={{background:'red'}} onClick={()=>deleteWine(data._id)} >
                  <FaMinusCircle /> Delete
                </button>
                <button onClick={()=>{
                                        document.querySelectorAll('.edit-display').forEach(item=>item.style.display = 'none')
                                        document.querySelector(`#edit-display-${data._id}`).style.display = 'block'
                                      }} 
                        style={{background:'yellow',color:'black',border:'1px solid black'}}>
                <MdChangeHistory /> Edit
                </button>
              </div>
              <div className='edit-display' id={`edit-display-${data._id}`}>
                <form action={updateWine} >
                  <div>
                    <input type='hidden' name='id' value={data._id} />
                    <input type='hidden' name='binPrev' value={data.bin} />
                    <input type='hidden' name='descriptionPrev' value={data.description} />
                    <input type='hidden' name='vintageSizePrev' value={data.vintageSize} />
                    <input type='hidden' name='pricePrev' value={data.price} />
                    <input type='hidden' name='typePrev' value={data.type} />
                    <span className='bins'><input style={{color:'blue'}} type='text' name='bin' className='bin-edit' defaultValue={data.bin} /></span>
                    <span className='descriptions'><input style={{color:'blue'}} type='text' name='description' className='description-edit' defaultValue={data.description} /></span>
                    <span className='vintageSizes'><input style={{color:'blue'}} type='text' name='vintageSize' className='vintage-size-edit' defaultValue={data.vintageSize} /></span>
                    <span className='prices'><input style={{color:'blue'}} type='text' name='price' className='price-edit' defaultValue={data.price} /></span>
                  </div>
                  <div style={{display:'flex'}}>
                  <label>
                Type of Wine {data.bin== '2046'? alert(`data.type: ${data.type}`): ''}
                <select id='type' name='type' defaultValue = {data.type} key={Date.now()} >
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
                  </div>
                  <button className='save-changes' style={{background:'blue',marginBottom:'100px'}} >
                    <FaCheckCircle />  &nbsp;Save Changes
                  </button>
                </form>              
              </div>
            </div>
        )
      })}
      </div>
  </div>
  )
}
