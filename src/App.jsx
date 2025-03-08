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
    <>
      <form action={editForm ? updateWine : addWine}>
        <input type='hidden' id='id' name='id' value={hiddenID} />
        <label>
          Bin#
          <input type='text' id='bin' name='bin' placeholder='Bin#' />
        </label>
        <button style={editForm ? {background:'blue'} : {background:'black'}}>
          {editForm ? <><VscSave /> Save Changes</> : <><FaPlusCircle /> Add Name</>}
        </button>
      </form>
      {wines.map(data=>{
        return(
          <div key={data._id}>
            {data.bin} {data.description} {data.vintageSize} {data.price}
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
    </>
  )
}
