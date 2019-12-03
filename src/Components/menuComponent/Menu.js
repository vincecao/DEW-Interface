import React, { Component } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import MenuButton from '../parts/MenuButton'

export class Menu extends Component {
  render() {
    return (
      <>
        <div style={{ flex: 1, backgroundColor: '#EAE6DA', padding: 10, borderRadius: 5 }}>
          <MenuButton icon={faDownload} backgroundColor={'#84A296'} />
          <MenuButton icon={faSave} backgroundColor={'#B7CDC1'} />
        </div>

      </>
    );
  }
}

export default Menu;
