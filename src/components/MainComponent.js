import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './HomeComponent'
import Signin from './SigninComponent';
import Subadminsignin from './Subadminsignin';
import Verify from './VerifyComponent';
import Scan from './ScanComponent';
import Confirm from './ConfirmationComponent';
import Seeyou from './Seeyou';

import {Switch,Route,Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {postComment,fetchDishes,fetchComments,fetchPromos,fetchLeaders,postFeedback} from '../redux/ActionCreators'
import {actions } from 'react-redux-form'
import {TransitionGroup,CSSTransition} from 'react-transition-group'

 const mapStateToProps = state=>
{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}

const mapDispatchToProps = (dispatch)=>
{
  return (
    {
      postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
      fetchDishes:()=>{dispatch(fetchDishes())},
      resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
      fetchComments:()=>{dispatch(fetchComments())},
      fetchPromos:()=>{dispatch(fetchPromos())},
      fetchLeaders:()=>{dispatch(fetchLeaders())},
      postFeedback:(values)=>postFeedback(values),
    }
  )
}



class Main extends Component {

  render() {
    const HomePage=()=>{
      return(
        <Home dish={this.props.dishes.dishes.filter(c=>c.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess = {this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter(c=>c.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess = {this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter(c=>c.featured)[0]}
        leadersLoading={this.props.leaders.isLoading}
        leadersErrMess = {this.props.leaders.errMess}
        />
        
      )
    }


  
    return (
    <div>
    <TransitionGroup > 
      <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
          <Route path='/home' component={HomePage} />
          
          
          <Route exact path='/confirm' component={()=><Confirm resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
          <Route exact path='/signin' component={() => <Signin resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
           <Route exact path='/Subadminsignin' component={() => <Subadminsignin resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/verify' component={() => <Verify resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> />
          <Route exact path='/scan' component={() => <Scan resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> />
          <Route exact path='/seeyou' component={() => <Seeyou resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />

                        <Redirect to="/home" />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
    </div>
    );
  }
}
 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));