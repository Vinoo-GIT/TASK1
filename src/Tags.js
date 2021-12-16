import React, { Component } from "react";
import * as TagService from "./services/TagServices";
import "regenerator-runtime/runtime.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import {
  faPencilAlt,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],

      newTagData: {
        title: "",
        rating: "",
      },
      editTagData: {
        id: "",
        title: "",
        rating: "",
      },
      newTagModal: false,
      editTagModal: false,
      confirmationModal: false,
      toasterUpdated: false,
      errorMess: "",
    };
    this.initialState = this.state;
  }
  componentWillMount() {
    // React Lifecycle
    this._refreshTags(); // Call back Method
  }
  togglenewTagModal() {
    this.setState({
      newTagModal: !this.state.newTagModal,
    });
  }
  toggleeditTagModal() {
    this.setState({
      editTagModal: !this.state.editTagModal,
      toasterUpdated: true,
    });
  }
  toggleconfirmationModal() {
    this.setState({
      confirmationModal: !this.state.confirmationModal,
    });
  }

  //VALIDATION
  ValidatedTagForm = () => {
    if (
      this.state.newTagData.title === undefined ||
      this.state.newTagData.title === ""
    ) {
      let errmsg = "This Field is required";
      this.setState({ errorMess: errmsg });
      return false;
    }
    if (
      this.state.newTagData.rating === undefined ||
      this.state.newTagData.rating === ""
    ) {
      let errmsg = "This Field is required";
      this.setState({ errorMess: errmsg });
      return false;
    }

    return true;
  };

  //SERVICES
  async addTag() {
    const response = await TagService.addTag(this.state.newTagData);
    let { tags } = this.state;
    tags.push(response);

    this.setState({
      tags,
      newTagModal: false,
      newTagData: {
        title: "",
        rating: "",
      },
    });
    toast.success("Added Successfully!");
  }

  submitevent(newTagData) {
    const isvalid = this.ValidatedTagForm(this);
    if (isvalid === true) {
      this.addTag(this);
    }
  }
  async updateTag() {
    const response = await TagService.updateTag(
      this.state.editTagData.id,
      this.state.editTagData.title,
      this.state.editTagData.rating
    );
    let { tags } = this.state;
    tags.push(response);
    this._refreshTags();

    this.setState({
      editTagModal: false,
      editTagData: { id: "", title: "", rating: "" },
    });
    toast("Updated Successfully!");
  }
  editTag(id, title, rating) {
    this.setState({
      editTagData: { id, title, rating },
      editTagModal: !this.state.editTagModal,
    });
  }
  deleteTag(id) {
    this.setState({
      confirmationModal: !this.state.confirmationModal,
      tagtagId: id,
    });
  }
  async deleteTagModal(id) {
    const response = await TagService.deleteTagModal(id);

    this.setState({
      confirmationModal: !this.state.confirmationModal,
    });
    this._refreshTags();
    toast.error("Deleted Successfully!");
  }
  async _refreshTags() {
    const response = await TagService._refreshTags();
    this.setState({
      tags: response,
    });
  }

  render() {
    let tags = this.state.tags.map((tagtag) => {
      return (
        <tr key={tagtag.id}>
          <td>{tagtag.id}</td>
          <td>{tagtag.title}</td>
          <td>{tagtag.rating}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editTag.bind(
                this,
                tagtag.id,
                tagtag.title,
                tagtag.rating
              )}
            >
              <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteTag.bind(this, tagtag.id)}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className="App container">
        <Modal
          isOpen={this.state.newTagModal}
          toggle={this.togglenewTagModal.bind(this)}
        >
          <ModalHeader toggle={this.togglenewTagModal.bind(this)}>
            Add a new tag
          </ModalHeader>
          <ModalBody>
            <form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.newTagData.title}
                  onChange={(e) => {
                    let { newTagData } = this.state;

                    newTagData.title = e.target.value;

                    this.setState({ newTagData, errorMess: "" });
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
                  value={this.state.newTagData.rating}
                  onChange={(e) => {
                    let { newTagData } = this.state;

                    newTagData.rating = e.target.value;

                    this.setState({ newTagData });
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
              color="primary"
              onClick={this.submitevent.bind(this, this.state.newTagData)}
            >
              Add Tags
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.togglenewTagModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.editTagModal}
          toggle={this.toggleeditTagModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleeditTagModal.bind(this)}>
            Edit a new tag
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.editTagData.title}
                onChange={(e) => {
                  let { editTagData } = this.state;

                  editTagData.title = e.target.value;

                  this.setState({ editTagData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                id="rating"
                value={this.state.editTagData.rating}
                onChange={(e) => {
                  let { editTagData } = this.state;

                  editTagData.rating = e.target.value;

                  this.setState({ editTagData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateTag.bind(this)}>
              Update Tag
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleeditTagModal.bind(this)}
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
              onClick={this.deleteTagModal.bind(this, this.state.tagtagId)}
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
                onClick={this.togglenewTagModal.bind(this)}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tags
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

          <tbody>{tags}</tbody>
        </Table>
        <ToastContainer />
      </div>
    );
  }
}

export default Tags;
