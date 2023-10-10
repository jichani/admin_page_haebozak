import React from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const HiddenInput = styled('input')({
  display: 'none',
});

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      username: '',
      email: '',
      psword: '',
      fileName: '',
      open: false
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer()
      .then((res) => {
        console.log(res.data);
        this.props.stateRefresh();
      })
    this.setState({
      file: null,
      username: '',
      email: '',
      psword: '',
      fileName: '',
      open: false
    })
  }

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    })
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append('email', this.state.email);
    formData.append('psword', this.state.psword);
    formData.append('username', this.state.username);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    return axios.post(url, formData, config);
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      file: null,
      username: '',
      email: '',
      psword: '',
      fileName: '',
      open: false
    })
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          고객 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <HiddenInput accept='image/*' id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
            <label htmlFor='raised-button-file'>
              <Button variant='contained' color='primary' component="span" name="file">
                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField label="이메일" type='email' name='email' value={this.state.email} onChange={this.handleValueChange} /><br />
            <TextField label="패스워드" type='password' name='psword' value={this.state.psword} onChange={this.handleValueChange} /><br />
            <TextField label="이름" type='text' name='username' value={this.state.username} onChange={this.handleValueChange} /><br />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='primary' onClick={this.handleFormSubmit}>추가</Button>
            <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default CustomerAdd;