import React from "react";
import InteractiveMap from "./components/InteractiveMap.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowDimensions: {
        height: 100,
        width: 100
      }
    };
  }

  componentDidMount() {
    this._updateDimensions();
    window.addEventListener("resize", this._updateDimensions);
  }

  _updateDimensions = () => {
    this.setState({
      windowDimensions: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    });
  };

  render() {
    return (
      <InteractiveMap
        height={this.state.windowDimensions.height}
        width={this.state.windowDimensions.width}
      />
    );
  }
}

export default App;
