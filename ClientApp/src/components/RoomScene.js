import React, { Component} from 'react';

export class RoomScene extends Component {
  render() {

    return (
      <div>
         <iframe className='room' src={process.env.PUBLIC_URL + "room.html"} title="Інший HTML-файл"></iframe>
      </div>
    );
  }
}