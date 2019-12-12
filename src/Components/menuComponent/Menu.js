import React, { Component } from 'react'
import { connect } from 'react-redux'
import { faDownload, faSave, faUpload, faEraser, faSync, faExpandArrowsAlt, faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import MenuButton from '../parts/MenuButton'
import { Intent } from "@blueprintjs/core"

import { switchExpandAction } from '../../Actions/switchExpandAction'

export class Menu extends Component {

  handleExpandButtonRender = (addToast) => {
    if (this.props.isExpand)
      return <MenuButton icon={faExpandArrowsAlt} backgroundColor={'#D93D3D'} text={'Expand Mode'} onClickCallBack={() => this.props.switchExpand()} intent={Intent.NONE} addToast={addToast} />
    else
      return <MenuButton icon={faCompressArrowsAlt} backgroundColor={'#D93D3D'} text={'Compress Mode'} onClickCallBack={() => this.props.switchExpand()} intent={Intent.NONE} addToast={addToast} />
  }

  render() {
    const { addToast } = this.props
    return (
      <>
        <div style={{ display: 'flex', flex: 1, backgroundColor: '#EAE6DA', padding: 10, borderRadius: 5, flexDirection: 'row' }}>
          <MenuButton icon={faUpload} backgroundColor={'#B7CDC1'} text={'Upload'} intent={Intent.SUCCESS} addToast={addToast} />
          <MenuButton icon={faDownload} backgroundColor={'#84A296'} text={'Download'} intent={Intent.PRIMARY} addToast={addToast} />
          <MenuButton icon={faSave} backgroundColor={'#84A296'} text={'Save'} intent={Intent.SUCCESS} addToast={addToast} />
          <MenuButton icon={faSync} backgroundColor={'#A6A6A6'} text={'Sync'} intent={Intent.PRIMARY} addToast={addToast} />
          <MenuButton icon={faEraser} backgroundColor={'#D93D3D'} text={'Eraser'} intent={Intent.WARNING} addToast={addToast} />
          <div style={{ flex: 1 }}></div>
          {this.handleExpandButtonRender(addToast)}

        </div>

      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentMode: state.dewMain.currentMode,
    isExpand: state.dewMain.isExpand,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchExpand: () => dispatch(switchExpandAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
