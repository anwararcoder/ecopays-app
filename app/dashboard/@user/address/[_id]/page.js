"use client";
import EditAddress from '@/Components/Dashboard/Address/EditAddress'
import { getAddressById } from '@/ReactQuery/FunctionsReactQuery';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from "next/navigation";
import Loading from '@/Components/Loading/Loading';


const EditAddressPage = () => {
  const params = useParams();
  const addressId = params._id;
  console.log("addressId", addressId);
  const { data: address, isLoading } = useQuery({
    queryKey: ["Address", addressId],
    queryFn: () => getAddressById(addressId),
  });

  if (isLoading) {
    return <Loading />
  }

  return (
    <EditAddress addressId={addressId} address={address?.data} />
  )
}

export default EditAddressPage
