import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

export default class AlertSucess extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.props.show) {
      return (
        <Alert bsStyle="success">
          O item foi adicionado com sucesso!
        </Alert>
      );
    }

    return (
      <a></a>
    );
  }
}
