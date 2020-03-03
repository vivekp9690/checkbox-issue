import React, { Component } from 'react';
import { Container, Input, FormGroup, Label, InputGroup, Modal, Media, ModalHeader, Form, Col, ModalFooter, ModalBody, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Button, Nav, NavItem, NavLink, TabContent, TabPane, InputGroupAddon, InputGroupText } from 'reactstrap'
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import settingsIcon from '../../../assets/img/admin/settings.png';
import filterIcon from '../../../assets/img/admin/filter.png';
import dropdownIcon from '../../../assets/img/admin/dropdown.png';

import { apiUrl } from '../../../config/constant';
import loader from '../../../assets/img/loader.gif';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import Tooltip from 'react-tooltip-lite';


class datatableDemo extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
   

    this.state = {
      activeTab: new Array(4).fill('1'),
      form: {},
      idea: [],
      valId: '',
      isChecked: false,
      settings: [],
      filter:'',
      datefrom:'',
      dateto:'',
    };

   fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(response =>{this.setState({ idea :response});} )
  }

  

  handleChange =(e) => {
    if(e.target.checked) {
        this.setState({
          valId: [ ...this.state.valId, e.target.value],
        });

    }else{
      var newvalId = this.state.valId.filter(el => el !== e.target.value);
      if (newvalId) {
        this.setState({
          valId: newvalId
        });
      }     
    }     
  }


  tab1() {

   const rows1 = this.state.idea;

    var pushArr = [];
    for(var i=0; i < rows1.length; i++){  
  
      pushArr.push({  chk:<div className="checkbox form-check">
        <div className="custom-checkbox custom-control custom-control-inline">
          <input type="checkbox" className="custom-control-input"  onChange={this.handleChange} value={rows1[i].id} id={rows1[i].id}  />
          <label class="custom-control-label" for={rows1[i].id}></label>
         </div> </div>,

               
          id:rows1[i].id,
          title: rows1[i].title
       })
    
    }
    const rows = [];

      const data = {
    columns: [
      {
        label: 'chk',
        field: 'chk',
        sort: 'asc',
        width: 150
      },
      {
        label: 'id',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'title',
        field: 'title',
        sort: 'asc',
        width: 270
      }
    ],
    rows:  pushArr
  };

  
    return (
      <>

        
         <MDBDataTable
            responsive
            hover
            data={data}    
            sortRows={[]}
          />
      
      </>
    );

  }


  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
      valId:[],
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {this.tab1()}
        </TabPane>
      
      </>
    );
  }
  render() {
  
      return (
        <React.Fragment>
          <div className="admin-layout newDessisionsStyles">
            <div className="header flex flex-justifiy-sp m-50-b decisionHeader">
              <div className="opt-bar">
                <Container>
                  <div className="flex bars admin-layout justify-content-between">
                    <Nav tabs className="align-items-end">
                      <NavItem>
                        <NavLink
                          active={this.state.activeTab[0] === '1'}
                          onClick={() => { this.toggle(0, '1'); }}
                        >
                          كل الأفكار
                  </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          active={this.state.activeTab[0] === '2'}
                          onClick={() => { this.toggle(0, '2'); }}
                        >
                          بإنتظار الموافقة
                  </NavLink>
                      </NavItem>
                    </Nav>
                    <div className="admin-layout publicSettings d-flex align-self-center">
                      <span>
                        <Link to="/admin/panel/summary/options" className="adminLinkGrey">
                          <img src={settingsIcon} alt="settings icon" className="" />
                          <span className="adminHide">
                            إعدادات الجدول
                        </span>
                        </Link>
                      </span>
                    </div>
                  </div>

                </Container>
              </div>
            </div>
            <Container>
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
              </TabContent>
            </Container>

          </div>
        </React.Fragment>
      );
    

  }
}

export default datatableDemo;
