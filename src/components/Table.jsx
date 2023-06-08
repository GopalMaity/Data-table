import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const Table = () => {
    const [search, setSearch] = useState("")
    const [countries, setCountries] = useState([])
    const [filterCountries, setFilterCountries] = useState([])
    const getData = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v2/all")
            setCountries(response.data)
            setFilterCountries(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    const colums = [
        {
            name: "Country Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Country Native Name",
            selector: (row) => row.nativeName,
        }, {
            name: "Country numericCode",
            selector: (row) => row.numericCode,
        }
    ]

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const result = countries.filter(country => {
            return country.name.toLowerCase().match(search.toLowerCase());
        })
        setFilterCountries(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        
        <DataTable
            title="Country List"
            columns={colums}
            data={filterCountries}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            subHeader
            subHeaderComponent={<input type="text" placeholder='Search here' className='w-25 form-control' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        }
        />
    )
}

export default Table
