import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    const {id} = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}, reset,
}= useForm({
    defaultValues:{
        name: "",
        price: 0,
        image: "",
        desc:""
    }
})
const {data, isLoading, isError} = useQuery({
    queryKey: ["PRODUCT", id],
    queryFn: async () => {
        try {
            const reponse = await axios.get(`http://localhost:3000/products/${id}`)
            return reponse.data
        } catch (error) {
            console.log(error)
        }
    }
})
const {mutate} = useMutation({
    mutationFn: async (product: { name: string, price: number, image: string, desc: string }) => {
        try {
            const reponse = await axios.put(`http://localhost:3000/products/${id}`, product)
            return reponse.data
        } catch (error) {
            console.log(error)
        }
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({
            queryKey: ["PRODUCTS"]
        })
        alert('Ban da cap nhat thanh cong')
        reset(data)
        setTimeout(() => {
            navigate('/products')
        }, 1000)
    }
})
const onSubmit: SubmitHandler<{name: string, price: number, desc: string}> =(product) => {
    mutate({...data, ...product})
    console.log(data);
}
useEffect(()=>{
    reset({
        name: data?.name,
        price: data?.price
    })
}, [id, data])
if(isLoading) return <div>Loading</div>
if(isError) return <div>Error</div>
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-ground">
          <div className="form-label">Ten san pham</div>
          <input
            className="form-control"
            type="text"
            defaultValue={data?.name}
            {...register("name", { required: true })}
            placeholder="Ten san pham"
          />
          {errors.name && (
            <p className="error-message">Vui lòng nhập tên sản phẩm</p>
          )}
        </div>
        <div className="form-ground">
          <div className="form-label">Gia san pham</div>
          <input
            className="form-control"
            type="number"
            
            defaultValue={data?.price}
            {...register("price", { required: true, min: 1 })}
            placeholder="Gia san pham"
          />
          {errors.price && (
            <p className="error-message">Vui lòng nhập giá sản phẩm lớn hơn 0</p>
          )}<div className="form-ground">
          <div className="form-label">Mo ta san pham</div>
          <input
            className="form-control"
            type="text"
            defaultValue={data?.desc}
            {...register("desc", { required: true })}
            placeholder="Ten san pham"
          />
          {errors.desc && (
            <p className="error-message">Vui lòng nhập mo ta sản phẩm</p>
          )}
        </div>
        </div>
        <button className="btn btn-primary">Cap nhat</button>
      </form>
    </div>
  )
}

export default Edit