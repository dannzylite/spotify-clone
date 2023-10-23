import React from 'react'
import { useParams } from 'react-router-dom'
import CatergoryList from '../components/catergories/CatergoryList'
import { caterogries } from '../Data/data'

export default function SeeAll() {
    const params = useParams()
    const catergory = caterogries.find(item => item[params.id]
    )
    console.log(catergory)
    const items = catergory[params.id].playlists.items
    console.log(items)

  return (
      <div>
          <CatergoryList items={items} seeAll={true} title={params.id} />
      </div>
  )
}
