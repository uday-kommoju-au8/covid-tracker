import React, { Component } from 'react';
import {Cards,CountryPicker,StatePicker, StateCard} from "./components";
import styles from "./App.module.css";
import {fetchData, fetchStates1} from './api';
import ParticlesBg from 'particles-bg'



export default class App extends Component {
  state = {
      data:{},
      country:"",
      stateData:{},
      st:""
  }
 
  async componentDidMount(){
    const fetchedData = await fetchData();
    this.setState({data : fetchedData});
    const fetchedStates = await fetchStates1;
    this.setState({stateData:fetchedStates});
    
  }

  handleCountryChange = async(country)=>{
   const fetchedData = await fetchData(country);
   this.setState({data:fetchedData,country});
  }


  handleStateChange= async(st)=>{
    const fetchedStates= await fetchStates1(st);
    this.setState({stateData:fetchedStates,st})
  }
   
  render() {
    const {data,country} = this.state;
    const {stateData,st} = this.state;
    return (
      <div className={styles.container}>
        <ParticlesBg type="cobweb" bg={true} />
        
        <Cards data={data} country={country} />
        {st !== ''?
        <StateCard stateData={stateData}></StateCard>:null}
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        {country === 'India'?
        <StatePicker handleStateChange={this.handleStateChange}/>:null}
        
      </div>
    )
  }
}
