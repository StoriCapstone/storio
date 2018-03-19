import React from "react";

class FadeImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isVisible:this.props.isVisible };

    // this.handleLoad = this.handleLoad.bind(this)
  }

  // handleLoad() {
  //   this.setState({ timeToShow: false });
  // }
  // componentDidMount(){
  //   this.setState({timeToShow:true})
  // }
// componentWillUnmount(){
//   //this.setState({timeToShow:false})

// }
  render() {
    return (


        <img
        className = "fadeImg"
        style={{opacity: this.state.isVisible ?   '1':'0' }}
        src={this.props.src}
        // onLoad={this.handleLoad}
        />

    )
  }
}
export default FadeImg;
