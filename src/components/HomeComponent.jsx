import React from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle,CardSubtitle,Badge,Button} from 'reactstrap'
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl'
import {FadeTransform} from 'react-animation-components';

function RenderCard({item,isLoading,errMess})
{
    if(isLoading)
    {
        return(
            <Loading />
        )
    }
    else if(errMess)
    {
        return(
            <h4>{errMess}</h4>
        )
    }
    else
    {
        return(
            <FadeTransform in 
            transformProps={{
                exitTransform:'scale(0.5) translateY(-50%)'
            }}>
        <Card>
                <CardImg src={baseUrl+item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
                    <CardText>{item.description}</CardText>
                </CardBody>
        </Card>
        </FadeTransform>
    );
}
}

function Home(props)
{
    return(
        <div className="container">
            <h3><span className="fa fa-arrow-right fa-lg"></span>&nbsp;Performance</h3>
            <div className="row align-items-start">
                <br /><br />
                <div className="col-12 col-md m-1">
                    <Card body style={{ backgroundColor: "#F8F8F8" }}><b><span className="fa fa-money fa-lg"></span>&nbsp;₹13080.40</b><br />
                        Total Revenue
                        </Card>
            </div>
                <div className="col-12 col-md m-1">

                    <Card body style={{ backgroundColor: "#F8F8F8 " }}><b><span className="fa fa-check fa-lg"></span>&nbsp;52</b><br /> Total Order</Card>
                    
            </div>
                <div className="col-12 col-md m-1">
                    <Card body style={{ backgroundColor: "#F8F8F8" }}><b><span className="fa fa-barcode fa-lg"></span>&nbsp;69</b>  <br /> Total Scans</Card>

                </div>
                

            </div>
            <br /><br />
            <h3><span className="fa fa-arrow-right fa-lg"></span>&nbsp;Live order status</h3>
            <div className="row align-items-start">
                <br /><br />
                <div className="col-12 col-md m-1">
                    <Card body style={{ backgroundColor: "#F8F8F8" }}><b><span className="fa fa-list-alt fa-lg"></span>&nbsp;3</b><br />
                        Order Pending
                        </Card>
                </div>
                <div className="col-12 col-md m-1">

                    <Card body style={{ backgroundColor: "#F8F8F8 " }}><b><span className="fa fa-lemon-o fa-lg"></span>&nbsp;7</b><br /> Kitchen</Card>

                </div>
                <div className="col-12 col-md m-1">
                    <Card body style={{ backgroundColor: "#F8F8F8" }}><b><span className="fa fa-cutlery fa-lg"></span>&nbsp;2</b>  <br /> Ready to Leave</Card>

                </div>


            </div>

            <br /><br />
            <h3><span className="fa fa-arrow-right fa-lg"></span>&nbsp;Active Waiters</h3>
            <div className="row align-items-start">
                <br /><br />
                <div className="col-12 col-md m-1">
                    <Card body style={{ backgroundColor: "#F8F8F8" }}><b><span className="fa fa-user fa-lg"></span>&nbsp;3</b><br />
                        Mr A
                        </Card>
                </div>
                <div className="col-12 col-md m-1">

                    <Card body style={{ backgroundColor: "#F8F8F8 " }}><b><span className="fa fa-user fa-lg"></span>&nbsp;7</b><br /> Mr B</Card>

                </div>
                <div className="col-12 col-md m-1">
                    <Card body style={{ backgroundColor: "#F8F8F8" }}><b><span className="fa fa-user fa-lg"></span>&nbsp;2</b>  <br /> Mr C</Card>
                  
                </div>
               


            </div>
            <br /><br />
            </div>
 
    )
       
       
}
export default Home;