import React, { Component } from "react";

import CanvasDraw from "../../draw";
import classNames from "../../../Style/Openvidu/PenComponent.css";

export default class PenComponent extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      color: "#00000",
      width: 1200,
      height: 720,
      brushRadius: 5,
      lazyRadius: 0,
    };

    this.canvas = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        { this.props.isBlackBoard && (
          <div className="drawing">
            <div className={classNames.tools}>
              <CanvasDraw
                ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
                brushColor={this.state.color}
                brushRadius={this.state.brushRadius}
                lazyRadius={this.state.lazyRadius}
                canvasWidth={this.state.width}
                canvasHeight={this.state.height}
              />
              <div className="items">
                <button
                  onClick={() => {
                    this.saveableCanvas.eraseAll();
                  }}
                  className="btn"
                >
                  모두 지우기
                </button>
                <button
                  onClick={() => {
                    this.saveableCanvas.undo();
                  }}
                  className="btn"
                >
                  되돌리기
                </button>

                {/* <div>
                <label>가로:</label>
                <input
                  type="number"
                  value={this.state.width}
                  onChange={(e) =>
                    this.setState({ width: parseInt(e.target.value, 10) })
                  }
                />
              </div>
              <div>
                <label>세로:</label>
                <input
                  type="number"
                  value={this.state.height}
                  onChange={(e) =>
                    this.setState({ height: parseInt(e.target.value, 10) })
                  }
                />
              </div> */}
                <div>
                  <label>펜의 굵기: </label>
                  <input
                    type="number"
                    value={this.state.brushRadius}
                    onChange={(e) =>
                      this.setState({
                        brushRadius: parseInt(e.target.value, 10),
                      })
                    }
                    className="input"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
