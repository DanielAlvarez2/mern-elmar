import { useState, useEffect } from 'react'
import {FaPlusCircle} from 'react-icons/fa'
import { FaCheckCircle } from "react-icons/fa"
import { FaMinusCircle } from "react-icons/fa"
import { MdChangeHistory } from "react-icons/md"
export default function App() {
  const [wines, setWines] = useState([])
  const getWines = ()=>{
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
    await fetch(`/api/wines/${formData.get('id')}`,{method:'PUT',
                                                    headers:{'Content-Type':'application/json'},
                                                    body: JSON.stringify({
                                                      bin,
                                                      description,
                                                      vintageSize,
                                                      price:formData.get('price'),
                                                    })
    })
      .then(console.log('Wine Updated: ___'))
      .then(async()=>await getWines())
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
          <input id='description' name='description' placeholder='Wine Description' />
        </label>
        <div className='form-dropdowns'>
          <label>
            Type of Wine
            <select id='type' name='type' >
              <option disabled defaultValue value=''>Select Type...</option>
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
          <label>
            Section
            <select id='section' name='section' >
              <option disabled defaultValue value=''>Select Section...</option>
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
              <button style={{background:'yellow',color:'black',border:'1px solid black'}}>
                <MdChangeHistory /> Edit
              </button>
            </div>
            <div id={`edit-display-${data._id}`}>
              <form action={updateWine} >
                <input type='hidden' name='id' value={data._id} />
                <input type='hidden' name='binPrev' value={data.bin} />
                <input type='hidden' name='descriptionPrev' value={data.description} />
                <input type='hidden' name='vintageSizePrev' value={data.vintageSize} />
                <input type='hidden' name='pricePrev' value={data.price} />
                <span className='bins'><input type='text' name='bin' className='bin-edit' placeholder={data.bin} /></span>
                <span className='descriptions'><input type='text' name='description' className='description-edit' placeholder={data.description} /></span>
                <span className='vintageSizes'><input type='text' name='vintageSize' className='vintage-size-edit' placeholder={data.vintageSize} /></span>
                <span className='prices'><input type='text' name='price' className='price-edit' placeholder={data.price} /></span>
                <button className='save-changes' style={{background:'blue'}} >
                  <FaCheckCircle />  &nbsp;Save Changes
                </button>
              </form>              
            </div>
          </div>
        )
      })}
    </div>
  )
}
