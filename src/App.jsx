import { useState, useEffect } from 'react'
import {FaPlusCircle} from 'react-icons/fa'
import {VscSave} from 'react-icons/vsc'
export default function App() {
  const [wines, setWines] = useState([])
  const [editForm, setEditForm] = useState(false)
  const [hiddenID, setHiddenID] = useState('')
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
    await fetch(`/api/wines/${formData.get('id')}`,{method:'PUT',
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
      .then(console.log('Wine Updated: ___'))
      .then(setEditForm(false))
      .then(async()=>await getWines())
      .catch(err=>console.log(err))
  }
  function updateForm(id,type,section,category,region,subRegion,bin,description,vintageSize,price,microsPrice,sequence){
    setHiddenID(id)
    setEditForm(true)
    document.querySelector('#type').value = type
    document.querySelector('#section').value = section
    document.querySelector('#category').value = category
    document.querySelector('#region').value = region
    document.querySelector('#subRegion').value = subRegion
    document.querySelector('#bin').value = bin
    document.querySelector('#description').value = description
    document.querySelector('#vintageSize').value = vintageSize
    document.querySelector('#price').value = price
    document.querySelector('#microsPrice').value = microsPrice
    document.querySelector('#sequence').value = sequence
  }
  return(
    <div id='wrapper'>
      <form action={editForm ? updateWine : addWine}>
        <input type='hidden' id='id' name='id' value={hiddenID} />
        <div id='form-row-1'>
          <label id='bin-label'>
            Bin#
            <input type='text' maxlength='4' id='bin' name='bin' placeholder='Bin#' />
          </label>
          <label>
            Vintage
            <input type='text' maxlength='6' id='vintage-size' name='vintageSize' placeholder='Vintage' />
          </label>
          <label>
            Price
            <input type='text' maxlength='6' id='price' name='price' placeholder='Price' />
          </label>
        </div>
        <label>
          Description
          <input id='description' name='description' placeholder='Wine Description' />
        </label>
        <div id='form-dropdowns'>
          <label>
            Type of Wine
            <select id='type' name='type' >
              <option disabled selected value=''>Select Wine Type...</option>
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
              <option disabled selected value=''>Select Wine Section...</option>
              <option value='CHAMPAGNE'>CHAMPAGNE</option>
              <option value='WHITE WINE'>WHITE WINE</option>
              <option value='RED WINE'>RED WINE</option>
              <option value='SAKE'>SAKE</option>
            </select>
          </label>

        </div>
        <button style={editForm ? {background:'blue'} : {background:'black'}}>
          {editForm ? <><VscSave /> Save Changes</> : <><FaPlusCircle /> Add Wine</>}
        </button>
      </form>
      {wines.map(data=>{
        return(
          <div className='wine-display' key={data._id}>
            <span className='bin-display'>{data.bin}</span> 
            <span className='description-display'>{data.description}</span> 
            <span className='vintage-size-display'>{data.vintageSize}</span> 
            <span className='price-display'>{data.price}</span>
            <i  className='fa-solid fa-trash-can'
                onClick={()=>deleteWine(data._id)}></i>
            <i  className='fa-solid fa-pen'
                onClick={()=>updateForm(data._id,
                                        data.type,
                                        data.section,
                                        data.category,
                                        data.region,
                                        data.subRegion,
                                        data.bin,
                                        data.description,
                                        data.vintageSize,
                                        data.price,
                                        data.microsPrice,
                                        data.sequence,
                )}></i>

          </div>
        )
      })}
    </div>
  )
}
