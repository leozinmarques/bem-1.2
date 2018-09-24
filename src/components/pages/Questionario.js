import React from 'react';
import {getToken} from '../../tils/Auth';
import {Button, FormControl, FormGroup, Modal, ControlLabel, Table, Row, Grid, Col} from 'react-bootstrap';
import axios from 'axios';
import ModalDel from '../layout/ModalDel.js';
import AlertSucess from '../layout/AlertSucess.js';
import '../../styles/css/Questionario.css';

export default class CrudPerguntas extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      questionarios: [], quesTitulo: '', quesDescricao: '', modifiedTitulo: '', modifiedDesc: '',
      show: false, idChange: '', idDel: '', keyId: '', alert: false
    };

    var config = {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }

    this.onDelete = (evento) => {
        evento.persist();
        axios.delete('https://bemapi.herokuapp.com/questionario/'+ this.state.idDel, config)
        .then(res =>{
          if (res.data.status === 'success'){
            var array = [...this.state.questionarios];
            var index = this.state.keyId;
            array.splice(index,1);
            this.setState({
              questionarios: array,
              show: false
            })
          }
        })
        .catch(error => {
          console.log(error.response);
        })
      }


    this.onCreate = (evento) => {
        evento.persist();
        const questionario = {
            titulo: this.state.quesTitulo,
            descricao: this.state.quesDescricao
        }
        axios.post('https://bemapi.herokuapp.com/questionario', questionario, config)
        .then(res => {
            console.log(questionario);
            const dataTest = this.state.questionarios;
            const object = {
                titulo: this.state.quesTitulo,
                descricao: this.state.quesDescricao,
                id: res.data.id
            }
            dataTest.push(object);
            this.setState({questionarios : dataTest, alert: true})
            setTimeout(() => {
              this.setState({ alert: false });
            }, 5000);
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
        })
      }

    this.onChange = (evento) => {
      const questionario = {
          descricao: this.state.modifiedDesc
      }
      axios.put('https://bemapi.herokuapp.com/questionario/' + this.state.idChange, questionario, config)
      .then(res =>{

      })
      .catch(error =>{
        console.log(error.response);
      })
    }

    this.onModalDel = (evento) => {
      this.setState({
          show: true,
          idDel: evento.target.name,
          keyId: evento.target.getAttribute('keyId')
      });
      console.log('keyId');
    }

    this.onCloseModal = () =>{
      this.setState({
				show: false
			});
    }
  }



  componentWillMount(){
    axios.get('https://bemapi.herokuapp.com/questionario')
		.then((response) => {
			this.setState({
				questionarios: response.data
			});
		})
		.catch((error) =>{
			console.log(error.response);
		});
	}

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state);
  }



    render(){
  		return(
  			<Grid>
          <Row>
            <Col sm={1} xs={1} md={1} />
            <Col sm={10} xs={10} md={10} >
            <AlertSucess show={this.state.alert} />

            <h1>Adicionar Questionário</h1>
            <FormGroup controlId="quesTitulo"  bsSize="large">
              <ControlLabel>Título</ControlLabel>
              <FormControl className="form-control" autoFocus type="text" value={this.state.quesTitulo} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup controlId="quesDescricao" bsSize="large">
              <ControlLabel>Descrição</ControlLabel>
              <FormControl componentClass="textarea" controlId="quesDescricao" className="form-control" value={this.state.quesDescricao} onChange={this.handleChange} />
              <Button className="btn-add" onClick={this.onCreate} bsStyle="success" bsSize="large" block>
                  Adicionar
              </Button>
              </FormGroup>
            <h1>Remover Questionário</h1>
      			<Table striped bordered condensed hover>
    				<thead>
    					<tr>
    					  <th>ID</th>
    					  <th>TÍTULO</th>
    					  <th>DESCRIÇÃO</th>
                <th></th>
                <th></th>
    					</tr>
    				</thead>
            {
              this.state.questionarios.map((row,index) => (
                 <tbody>
          				<tr>
          				  <td>{row.id}</td>
          				  <td>{row.titulo}</td>
          				  <td>{row.descricao}</td>
          				  <td><Button bsStyle="warning" className="btn-form" name={row.id} keyId={index} onClick={this.onShowModal}>Editar</Button></td>
          				  <td><Button bsStyle="danger" className="btn-form" name={row.id} keyId={index} onClick={this.onModalDel}>Excluir</Button></td>
          				</tr>
        			  </tbody>
  			       ))
            }
            </Table>

            <Modal show={this.state.show} >
              <Modal.Body>
                <h2>Você tem certeza que quer excluir esse item?</h2>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.onDelete} bsStyle="success">Confirma</Button>
                <Button onClick={this.onCloseModal} bsStyle="danger">Cancelar</Button>
              </Modal.Footer>
            </Modal>
            </Col>
            <Col sm={1} xs={1} md={1} />
          </Row>
        </Grid>
  		)
  	}
  }
