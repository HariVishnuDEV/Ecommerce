import React from 'react'
import ProductCart from '../components/ProductCard'
import { ProductList } from '../data/ProductList'

export default function Dashboard() {
  return (
    <div className='d-flex flex-wrap justify-content-center p-3'>
        {ProductList.map((Product) => <ProductCart{...Product} key={Product.id}/>)}
    </div>
  )
}
