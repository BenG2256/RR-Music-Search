// Gallery.js
import { useContext } from 'react'

import GalleryItem from './GalleryItem'

function Gallery(){
    const data = useContext()
    
    const display = data.map((item,index) => {
        return (
            <GalleryItem item={item} key={index} />
        )
    })
    return (
        <div>
            {display}
        </div>
    )
}

export default Gallery