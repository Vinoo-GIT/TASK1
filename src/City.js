import React, { Component } from "react";
import * as CityService from "./services/CityServices"
import "regenerator-runtime/runtime.js";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
} from "reactstrap";



class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],

      newCityData: {
        title: "",
        rating: "",
      },
      editCityData: {
        id: "",
        title: "",
        rating: "",
      },
      newCityModal: false,
      editCityModal: false,
      confirmationModal: false,
      toasterUpdated: false,
      errorMess: "",
    };
    this.initialState = this.state;
  }
  
  componentWillMount() {
    // React Lifecycle
    this._refreshcities(); // Call back Method
  }
  togglenewCityModal() {
    this.setState({
      newCityModal: !this.state.newCityModal,
    });
  }
  toggleeditCityModal() {
    this.setState({
      editCityModal: !this.state.editCityModal,
    });
  }
  toggleconfirmationModal() {
    this.setState({
      confirmationModal: !this.state.confirmationModal,
    });
  }





//VALIDATION
  ValidatedCityForm = () => {
    if (
      
      this.state.newCityData.title === undefined ||
      this.state.newCityData.title === ""
    ) {
      let errmsg = "This Field is required";
      this.setState({ errorMess: errmsg });
      return false;
    }
    if (
      this.state.newCityData.rating === undefined ||
      this.state.newCityData.rating === ""
    ) {
      let errmsg = "This Field is required";
      this.setState({ errorMess: errmsg });
      return false;
    }

    return true;
  };





  //SERVICES
  async addCity() {
    const response = await CityService.addCity(this.state.newCityData);
        let { cities } = this.state;
        cities.push(response);

        this.setState({
          cities,
          newCityModal: false,
          newCityData: {
            title: "",
            rating: "",
          },
        });
        toast.success("Added Successfully!");
      
  }

  submitevent(newCityData) {
    const isvalid = this.ValidatedCityForm(this);
    if (isvalid === true) {
      this.addCity(this);
    }
  }

  async updateCity() {
    const response = await CityService.updateCity(this.state.editCityData.id,this.state.editCityData.title,this.state.editCityData.rating);
    let { cities } = this.state;
     cities.push(response);
        this._refreshcities();

        this.setState({
          editCityModal: false,
          editCityData: { id: "", title: "", rating: "" },
        });
        toast("Updated Successfully!");
      
  }
  editCity(id, title, rating) {
    this.setState({
      editCityData: { id, title, rating },
      editCityModal: !this.state.editCityModal,
    });
  }
  deleteCity(id) {
    this.setState({
      confirmationModal: !this.state.confirmationModal,
      citycityId: id,
    });
  }
  async deleteCityModal(id) {
    const response= await CityService.deleteCityModal(id);
    
    this.setState({
      confirmationModal: !this.state.confirmationModal,
    });
    this._refreshcities();
    toast.error("Deleted Successfully!");
  }
  async _refreshcities() {
    const response= await CityService.refreshcities();
      this.setState({
        cities: response,
      });
    
  }





  render() {
    let cities = this.state.cities.map((citycity) => {
      return (
        <tr key={citycity.id}>
          <td>{citycity.id}</td>
          <td>{citycity.title}</td>
          <td>{citycity.rating}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editCity.bind(
                this,
                citycity.id,
                citycity.title,
                citycity.rating
              )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteCity.bind(this, citycity.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        <Modal
          isOpen={this.state.newCityModal}
          toggle={this.togglenewCityModal.bind(this)}
        >
          <ModalHeader toggle={this.togglenewCityModal.bind(this)}>
            Add a new city
          </ModalHeader>
          <ModalBody>
            <form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.newCityData.title}
                  onChange={(e) => {
                    let { newCityData } = this.state;
                    newCityData.title = e.target.value;
                    this.setState({ newCityData, errorMess: "" });
                  }}
                />
                {this.state.errorMess && (
                  <p className="error"> {this.state.errorMess} </p>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input
                  id="rating"
                  value={this.state.newCityData.rating}
                  onChange={(e) => {
                    let { newCityData } = this.state;

                    newCityData.rating = e.target.value;

                    this.setState({ newCityData, errorMess: "" });
                  }}
                />
                {this.state.errorMess && (
                  <p className="error"> {this.state.errorMess} </p>
                )}
              </FormGroup>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              onClick={this.submitevent.bind(this, this.state.newCityData)}
            >
              Add City
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.togglenewCityModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.editCityModal}
          toggle={this.toggleeditCityModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleeditCityModal.bind(this)}>
            Edit a new city
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.editCityData.title}
                onChange={(e) => {
                  let { editCityData } = this.state;

                  editCityData.title = e.target.value;

                  this.setState({ editCityData, errorMess: "" });
                }}
              />
              
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                id="rating"
                value={this.state.editCityData.rating}
                onChange={(e) => {
                  let { editCityData } = this.state;

                  editCityData.rating = e.target.value;

                  this.setState({ editCityData, errorMess: "" });
                }}
              />
              
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateCity.bind(this)}>
              Update City
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleeditCityModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.confirmationModal}
          toggle={this.toggleconfirmationModal.bind(this)}
        >
          <ModalHeader>Delete Confirmation</ModalHeader>
          <ModalBody>Are You Sure?</ModalBody>
          <ModalFooter>
            <Button
              onClick={this.deleteCityModal.bind(this, this.state.citycityId)}
              color="primary"
            >
              Confirm
            </Button>{" "}
            <Button onClick={this.toggleconfirmationModal.bind(this)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Button
                color="primary"
                onClick={this.togglenewCityModal.bind(this)}
              >
                Add City
              </Button>
            </th>
          </thead>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>{cities}</tbody>
        </Table>
        <ToastContainer />
       </div>
    );
  }
}

export default City;
