import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Card from './Components/Card/Card';
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Grid, TextField } from '@material-ui/core';
import CheckBox from './Components/CheckBox/CheckBox'

// Develop a front-end application which would help users list and browse all launches by SpaceX program.

// Important API information that would help you to fetch the data
// API end point for the first-time
// page load without any Filters: ---> pagination 

// API end point with Filters applied:


// https://api.spaceXdata.com/v3/launches?limit=100


// Launch Success Filter:
// https://api.spaceXdata.com/v3/launches?limit=100&amp;launch_success=true


// Launch & Land Filter:
// https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true



// All:
// https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014


// Assignment should have Server side rendering, a Client side and Build and Packaging. 


// Launch Success ==> all data ==> check box => API call with filter
// Land Success ==> all data ==> check box => 
// Launch Year ==> drop down

// Table for all data 

const Layout = (props) => {

    const [data, setData] = useState([]);
    const [state, setState] = React.useState({
        launchSuccess: false,
        landSuccess: false,
    });
    const [yearFilter, setYearFilter] = useState(false);

    const [year, setYear] = useState();
    let [limit, setLimit] = useState(9);

    useEffect(() => {
        let query = "?limit=" + limit;
        if (state.landSuccess) {
            query = query + "&land_success=true"
        }
        if (state.launchSuccess) {
            query = query + "&launch_success=true"
        }
        if (yearFilter) {
            query = query + "&launch_year=" + year;
        }

        axios.get('https://api.spaceXdata.com/v3/launches' + query)
            .then(function (response) {
                console.log(response);
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [limit, state.launchSuccess, state.landSuccess, yearFilter])


    const fetchMoreData = () => {
        setLimit(limit + 9);
    }

    const handleFilterChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }

    const openSpaceXdetails = (id) => {
        props.history.push('/spacexdetails/' + id);
    }

    const handleYearChange = (evt) => {
        const val = (evt.target.validity.valid) ? evt.target.value : year;
        setYear(val);
    }
    const applyYearFilter = () => {
        console.log()
        if (year < 2021 && year > 1900) {
            setYearFilter(true);
        } else {
            alert("Please Enter the year between 1900 to 2021");
        }
    }
    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <CheckBox handleFilterChange={handleFilterChange} state />
                </Grid>
                <Grid item xs={6}>

                    <TextField style={{ top: 40 }} label="Fill Year" variant="outlined" type="text" pattern="[0-9]*" onInput={handleYearChange} value={year} />
                    <Button style={{ top: 40, margin: 10 }} variant="contained" color="primary" onClick={applyYearFilter}>Apply Year Filter</Button>
                </Grid>
            </Grid>

            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <Grid container style={{ justifyContent: "space-evenly" }}>
                    {data.map((item) => (
                        <Grid item xs={3} sm={4} style={{ flexGrow: 3 }} key={item.flight_number}>
                            <Card
                                flight_number={item.flight_number}
                                mission_name={item.mission_name}
                                launch_date_local={item.launch_date_local}
                                details={item.details}
                                openDetails={openSpaceXdetails}
                            >
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </InfiniteScroll>
        </div>
    )
}

export default Layout;
