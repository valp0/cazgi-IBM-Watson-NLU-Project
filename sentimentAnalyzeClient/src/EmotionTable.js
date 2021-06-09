import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

  render() {
    if (typeof this.props.emotions === "string") {
      var emotionsOutput = this.props.emotions;
    } else {
      var emotionsOutput = Object.keys(this.props.emotions).map((emotion) => {
        return (
          <tr key={emotion}>
            <td className="table table-bordered"> {emotion} </td>
            <td className="table table-bordered"> {this.props.emotions[emotion]} </td>
          </tr>
        )
      });
    }

    return (
      <div>
        {/*You can remove this line and the line below. */}
        {/* {JSON.stringify(this.props.emotions)} */}
        <table className="table table-bordered">
          <tbody>
            {
              //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
              // this.state.emotionDetails
              emotionsOutput
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default EmotionTable;
