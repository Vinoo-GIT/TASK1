import React, { Component } from "react";
// import axios from "axios";
import * as CityService from "./services/CityServices";
import "regenerator-runtime/runtime.js";
// import useForm from "./useForm";

import "./style.css";
import "react-toastify/dist/ReactToastify.css";
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

import { ToastContainer, toast } from "react-toastify";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],

      newCityData: {
        cityname: "",
        pincode: "",
        // value: "",
      },
      editCityData: {
        id: "",
        cityname: "",
        pincode: "",
      },
      newCityModal: false,
      editCityModal: false,
      confirmationModal: false,
      toasterUpdated: false,
      errorMess: "",
      errorMax: "",
      errorMin: "",
      oninvalid: "",
    };
    this.initialState = this.state;
    // this.ValidatedCityForm = this.ValidatedCityForm.bind(this);
  }
  //const [errorMessage, setErrorMessage] = useState("");
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
  async addCity() {
    const response = await CityService.addCity(this.state.newCityData);
    let { cities } = this.state;
    cities.push(response);

    this.setState({
      cities,
      newCityModal: false,
      newCityData: {
        cityname: "",
        pincode: "",
      },
    });
    toast.success("Added Successfully!");
  }

  ValidatedCityForm = (e) => {
    if (this.state.newCityData.cityname.length > 15) {
      this.setState({ value: e.target.value });
      let errmax = `Max length is 15`;
      this.setState({ errorMax: errmax });
    }
    if (
      this.state.newCityData.cityname === undefined ||
      this.state.newCityData.cityname === ""
    ) {
      let errmsg = "This Field is required";
      this.setState({ errorMess: errmsg });
      return false;
    }
    if (
      this.state.newCityData.pincode === undefined ||
      this.state.newCityData.pincode === ""
    ) {
      let errmsg = "This Field is required";
      this.setState({ errorMess: errmsg });
      return false;
    }

    // const re = /^[0-9\b]+$/;
    // if (e.target.value === "" || re.test(e.target.value)) {
    //   this.setState({ value: e.target.value });
    // }

    return true;
  };

  submitevent(newCityData) {
    const isvalid = this.ValidatedCityForm(this);
    if (isvalid === true) {
      this.addCity(this);
    }
  }

  async updateCity() {
    const response = await CityService.updateCity(
      this.state.editCityData.id,
      this.state.editCityData.cityname,
      this.state.editCityData.pincode
    );
    let { cities } = this.state;
    cities.push(response);
    this._refreshcities();

    this.setState({
      editCityModal: false,
      editCityData: { id: "", cityname: "", pincode: "" },
    });
    toast("Updated Successfully!");
  }
  editCity(id, cityname, pincode) {
    this.setState({
      editCityData: { id, cityname, pincode },
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
    const response = await CityService.deleteCityModal(id);

    this.setState({
      confirmationModal: !this.state.confirmationModal,
    });
    this._refreshcities();
    toast.error("Deleted Successfully!");
  }
  async _refreshcities() {
    const response = await CityService.refreshcities();
    this.setState({
      cities: response,
    });
  }

  render() {
    let cities = this.state.cities.map((citycity) => {
      return (
        <tr key={citycity.id}>
          <td>{citycity.id}</td>
          <td>{citycity.cityname}</td>
          <td>{citycity.pincode}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editCity.bind(
                this,
                citycity.id,
                citycity.cityname,
                citycity.pincode
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
                <Label for="cityname">CityName</Label>
                <Input
                  type="text"
                  minlength="3"
                  placeholden="City..max 15 char"
                  id="cityname"
                  value={this.state.newCityData.cityname}
                  onChange={(e) => {
                    let { newCityData } = this.state;
                    newCityData.cityname = e.target.value;
                    this.setState({ newCityData, errorMess: "" });
                  }}
                />
                {this.state.errorMess && (
                  <p className="error"> {this.state.errorMess} </p>
                )}
                {this.state.errorMax && (
                  <p className="error"> {this.state.errorMax} </p>
                )}
                {this.state.errorMin && (
                  <p className="error"> {this.state.errorMin} </p>
                )}
                {this.state.newCityData.cityname.length > 15 && (
                  <p className="error"> {"Max length is 15"} </p>
                )}

                {/* if (this.state.newCityData.cityname.value.length > 15) {
      let errmax = `Max length is 15`;
      this.setState({ errorMax: errmax });
    } */}
              </FormGroup>
              <FormGroup>
                <Label for="pincode">Pincode</Label>
                <Input
                  type="number"
                  minlength="3"
                  maxlength="15"
                  placeholden="pincode..max 15 char"
                  id="pincode"
                  value={this.state.newCityData.pincode}
                  onChange={(e) => {
                    let { newCityData } = this.state;

                    newCityData.pincode = e.target.value;

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
              // value={this.state.value}
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
              <Label for="cityname">cityname</Label>
              <Input
                pattern="[a-zA-Z]"
                oninvalid="setCustomValidity('Please enter on alphabets only. ')"
                id="cityname"
                value={this.state.editCityData.cityname}
                onChange={(e) => {
                  let { editCityData } = this.state;

                  editCityData.cityname = e.target.value;

                  this.setState({ editCityData, errorMess: "" });
                }}
              />
              {/* {this.state.errorMess && (
                <p className="error"> {this.state.errorMess} </p>
              )} */}
            </FormGroup>
            <FormGroup>
              <Label for="pincode">pincode</Label>
              <Input
                id="pincode"
                value={this.state.editCityData.pincode}
                onChange={(e) => {
                  let { editCityData } = this.state;

                  editCityData.pincode = e.target.value;

                  this.setState({ editCityData, errorMess: "" });
                }}
              />
              {/* {this.state.errorMess && (
                <p className="error"> {this.state.errorMess} </p>
              )} */}
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
              <th>cityname</th>
              <th>pincode</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>{cities}</tbody>
        </Table>
        <ToastContainer />
        {/* <Note /> */}
      </div>
    );
  }
}

export default City;
