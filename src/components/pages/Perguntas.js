import React from 'react';
import {getToken} from '../../tils/Auth';
import {Button, FormControl, FormGroup, Modal, Table, Grid, Col, Row} from 'react-bootstrap';
import AlertSucess from '../layout/AlertSucess.js';
import axios from 'axios';
import ModalDel from '../layout/ModalDel.js';

export default class CrudPerguntas extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      perguntas: [], newPergunta: '', questionario: [], questionarios: [], questionarioId: '',
      modified: '', show: false, idChange: '', idDel: '', keyId: '', alert: false
    };

    var config = {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }

    this.onDelete = (evento) => {
      evento.persist();
          axios.delete('https://bemapi.herokuapp.com/pergunta/'+ this.state.idDel, config)
          .then(res =>{
            if (res.data.status === 'success'){
              var array = [...this.state.perguntas];
              var index = this.state.keyId;
              array.splice(index,1);
              this.setState({
                perguntas: array,
                show: false
              })
            }
          })
          .catch(error => {
            console.log(error.response);
          })
    }

    this.onCreate = (evento) => {
          const pergunta = {
              descricao: this.state.newPergunta,
              questionario_id: this.state.questionarioId
          }
          axios.post('https://bemapi.herokuapp.com/pergunta', pergunta, config)
          .then(res => {
              const dataTest = this.state.perguntas;
              const object = {
                  descricao: this.state.newPergunta,
                  id: res.data.id
              }
              dataTest.push(object);
              this.setState({perguntas : dataTest, alert:true})

              setTimeout(() => {
                this.setState({ alert: false });
              }, 5000);
          })
          .catch(error => {
            console.log(error.response);
          })
    }

    this.onChange = (evento) => {
      const pergunta = {
          descricao: this.state.modified
      }
      axios.put('https://bemapi.herokuapp.com/pergunta/' + this.state.idChange, pergunta, config)
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

    this.handleChangeQues = (evento) => {
      evento.persist();

      this.setState({
        [evento.target.id]: evento.target.value
      });

      axios.get('https://bemapi.herokuapp.com/questionario/' + evento.target.value + '/perguntas')
  		.then((response) => {
  			this.setState({
  				perguntas: response.data
  			});
  		})
  		.catch((error) =>{
  			console.log(error.response);
  		});
    }

    this.invalid = () => {
      if (this.state.questionarioId == ''){
        return true;
      }else{
        return false;
      }
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
  }

  render(){
		return(
			<Grid>
        <Row>
          <Col sm={1} xs={1} md={1} />
          <Col sm={10} xs={10} md={10} >
          <FormGroup controlId="questionarioId">
            <AlertSucess show={this.state.alert} />
            <h1>Questionário</h1>

            <FormControl onChange={this.handleChangeQues} componentClass="select" placeholder="select">
                    <option value=''>Escolha o Questionário</option>
                {
                  this.state.questionarios.map((row,index) => (
                    <option value={row.id} keyId={index}>{row.titulo}</option>
                  ))
                }
            </FormControl>
          </FormGroup>

          <h2>Adicionar Nova Pergunta</h2>

            <FormGroup controlId="newPergunta" bsSize="large">
              <FormControl className="form-control" autoFocus type="text" disabled={this.invalid()} value={this.state.newPergunta} onChange={this.handleChange} />
              <Button bsStyle="success" bsSize="large" onClick={this.onCreate} block>
                Adicionar
              </Button>
            </FormGroup>

          <h2>Remover Perguntas</h2>

    			<Table striped bordered condensed hover>
    				<thead>
    					<tr>
    					  <th>ID</th>
    					  <th>DESCRIÇÃO</th>
                <th></th>
                <th></th>
    					</tr>
    				</thead>
        			{
        				this.state.perguntas.map((row,index) => (
    					<tbody>
    						<tr>
    							<td>{row.id}</td>
    							<td>{row.descricao}</td>
    							<td><Button bsStyle="warning" className="btn-right" name={row.id} keyId={index} onClick={this.onShowModal}>Editar</Button></td>
    							<td><Button bsStyle="danger" className="btn-right" name={row.id} keyId={index} onClick={this.onModalDel}>Excluir</Button></td>
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
              <Button onClick={this.onCloseModal} bsStyle="danger">Close</Button>
            </Modal.Footer>
          </Modal>
          </Col>
          <Col sm={1} xs={1} md={1} />
        </Row>
			</Grid>
		)
	}
}
