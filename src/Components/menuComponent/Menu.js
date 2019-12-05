import React, { Component } from 'react';
import { faDownload, faSave, faUpload, faEraser, faSync } from '@fortawesome/free-solid-svg-icons'
import MenuButton from '../parts/MenuButton'

export class Menu extends Component {
  render() {
    return (
      <>
        <div style={{ flex: 1, backgroundColor: '#EAE6DA', padding: 10, borderRadius: 5 }}>
          <MenuButton icon={faUpload} backgroundColor={'#B7CDC1'} />
          <MenuButton icon={faDownload} backgroundColor={'#84A296'} />
          <MenuButton icon={faSave} backgroundColor={'#84A296'} />
          <MenuButton icon={faSync} backgroundColor={'#A6A6A6'} />
          <MenuButton icon={faEraser} backgroundColor={'#D93D3D'} />
        </div>

      </>
    );
  }
}

export default Menu;
