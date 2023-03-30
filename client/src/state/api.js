import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001'}),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products', 'Customers', 'Transactions', 'Geography', 'Sales', 'Admins', 'Dashboard'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            provideTags: ['User']
        }),
        getProducts: build.query({
            query: () => 'client/products',
            provideTags: ['Products']
        }),
        getCustomers: build.query({ 
            query: () => 'client/customers',
            providesTags: ['Customers']
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search, transactionsSearch }) => ({
                url: 'client/transactions',
                method: 'GET',
                params: { page, pageSize, sort, search, transactionsSearch}
            }),
            provideTags: ['Transactions']
        }),
        getGeography: build.query({
            query: () => 'client/geography',
            providesTags: ['Geography']
        }),
        getSales: build.query({
            query: () => 'sales/sales',
            provideTags: ['Sales']
        }),
        getAdmins: build.query({
            query: () => 'management/admin',
            provideTags: ['Admins']
        }), 
        getDashboard: build.query({
            query: () => 'general/dashboard',
            providesTags: ['Dashboard']
        }),
        
        })
        
                
                
            
       
    })


export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery,
               useGetGeographyQuery, useGetSalesQuery, useGetAdminsQuery, useGetDashboardQuery,  } = api