import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paper, Typography } from '@material-ui/core';
import Accordin from '../Accordin/Accordin'

const SpaceXdetails = (props) => {

    const [data, setdata] = useState(null);

    useEffect(() => {
        if (props.match.params.id) {
            let query = "?flight_number=" + props.match.params.id;
            axios.get('https://api.spaceXdata.com/v3/launches' + query)
                .then(function (response) {
                    console.log(response.data[0]);
                    if (response.data.length != 0) {
                        setdata(response.data[0]);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [])



    let post = <p style={{ textAlign: 'center' }}>Please select a SpaceX Program!</p>;
    if (props.match.params.id) {
        post = <p style={{ textAlign: 'center' }}>Loading....</p>;
    }
    if (data) {
        let flicker_image = (
            <div>
                <Typography variant="h6" component="h6">
                    Flicker Images:
                    </Typography>
                <ul>
                    {data.links.flickr_images.map((image) => {
                        return <img style={{ width: 300, height: 400 }} src={image} />
                    })}
                </ul>
            </div>
        )

        let ships = (
            <div>
                <Typography variant="h6" component="h6">
                    Ships:
                    </Typography>
                <ul>
                    {data.ships.map((ship) => {
                        return <li>{ship}</li>
                    })}
                </ul>
            </div>
        )
        post = (
            <div>
                {/* <p>{JSON.stringify(data)}</p> */}
                <Paper elevation={3} style={{ margin: 10, padding: 20 }}>
                    <Typography variant="h5" component="h2">
                        {data.mission_name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {data.details}
                        <br />
                    </Typography>
                    <Typography variant="h6" component="h6">
                        Rocket Details:
                    </Typography>
                    <ul>
                        <li>{data.rocket.rocket_id}</li>
                        <li>{data.rocket.rocket_name}</li>
                        <li>{data.rocket.rocket_type}</li>
                    </ul>
                    {/* <Accordin header="First Stage" accordinData={JSON.stringify(data.rocket.first_stage)} /> */}
                    {/* <Accordin header="Second Stage" accordinData={JSON.stringify(data.rocket.second_stage)} /> */}

                    {data.ships.length != 0 ? ships : null}

                    <Typography variant="h6" component="h6">
                        Launch Sites:
                    </Typography>

                    <ul>
                        {Object.keys(data.launch_site).map((site) => {
                            return data.launch_site[site] !== null && typeof data.launch_site[site] == 'string' ? <li>{site.replace(/_/g, " ")}: {data.launch_site[site]}</li> : null
                        })}
                    </ul>

                    <Typography variant="h6" component="h6">
                        Links:
                    </Typography>
                    <ul>
                        {Object.keys(data.links).map((link_key) => {
                            return data.links[link_key] !== null && typeof data.links[link_key] == 'string' ? <li>{link_key.replace(/_/g, " ")}: <a href={data.links[link_key]} target="_blank">{data.links[link_key]}</a></li> : null
                        })}
                    </ul>
                    {data.links.flickr_images.length != 0 ? flicker_image : null}



                </Paper>
            </div>
        )
    }

    return (
        <div>
            {post}
        </div>
    )
}

export default SpaceXdetails;
