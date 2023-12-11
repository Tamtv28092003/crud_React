import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const List = () => {
    const queryClient = useQueryClient()
    const {data, isLoading, isError} = useQuery({
        queryKey: ["PRODUCTS"],
        queryFn: async () => {
            try {
                const reponse = await axios.get("http://localhost:3000/products")
                return reponse.data
            }catch (error){
                console.log(error)
            }
        }
    })
    const {mutate} = useMutation({
        mutationFn: async (id: number) => {
            try{
                const reponse = await axios.delete(`http://localhost:3000/products/${id}`)
                return reponse.data
            }catch (error){
                console.log(error)
            }
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({
                queryKey: ["PRODUCTS"]
            })
        }
    })
    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    const removeProduct = (id: number) => {
        mutate(id)
    }
  return (
    <div>
        <Link to="/products/add"> Them san pham</Link>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>Ten san pham</th>
          <th>Anh san pham</th>
          <th>Gia</th>
          <th>Mo ta</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((product: { id?: number | undefined, name: string, price: number, desc: string }, index: number) => (
          <tr key={product?.id}>
            <td>{index + 1}</td>
            <td>{product?.name}</td>
            <td><img src={product?.image} alt=""/></td>
            <td>{product?.price}</td>
            <td>{product?.desc}</td>
            <table>
              <Link to={`/products/${product.id}/edit`}>
              <button className="btn btn-danger" >Cap nhat</button>
              </Link>
              <button className="btn btn-primary" onClick={() => window.confirm("Ban chac chan muon xoa khong?") && removeProduct(product.id!)}>Xoa</button>

            </table>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default List