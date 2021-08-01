import React from 'react';

class Map extends React.Component{
  render(){
    if(this.props.display){
      return(
        <div className={'map'}>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.props.lat},${this.props.lon}&zoom=11&size=600x400`} alt=''/>
        </div>
      );
    }else{
      return '';
    }
  }
}

export default Map;
