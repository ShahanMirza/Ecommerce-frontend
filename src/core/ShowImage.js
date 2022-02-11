import React from 'react'
import { PHOTO_API } from '../Config'

const ShowImage=({item,url})=>(
    <div className='product-img'>
        <img src={`${PHOTO_API}/${item.photoName}`} alt={item.name} className='mb-3'
        style={{maxHeight:'100%',maxWidth:'100%'}}/>
    </div>
)
export default ShowImage