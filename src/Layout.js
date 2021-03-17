import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Card from './Components/Card/Card';
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from '@material-ui/core';
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
    let [limit, setLimit] = useState(9);

    useEffect(() => {
        let query = "?limit=" + limit;
        if (state.landSuccess) {
            query = query + "&land_success=true"
        }
        if (state.launchSuccess) {
            query = query + "&launch_success=true"
        }

        axios.get('https://api.spaceXdata.com/v3/launches' + query)
            .then(function (response) {
                console.log(response);
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [limit, state.launchSuccess, state.landSuccess])


    const fetchMoreData = () => {
        setLimit(limit + 9);
    }

    const handleFilterChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }

    const openSpaceXdetails = (id) => {
        props.history.push('/spacexdetails/' + id);
    }

    return (
        <div>
            <CheckBox handleFilterChange={handleFilterChange} state />
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
