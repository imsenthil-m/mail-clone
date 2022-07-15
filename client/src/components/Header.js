import React, {useState} from 'react';
import { PageHeader, Button } from 'antd';
import {newMail} from '../actions/mail'
import { useDispatch } from 'react-redux';
const Header = props => {
    const dispatch = useDispatch();
    return (
        <PageHeader
            ghost={false}
            title="TheMail"
            extra={[
                <Button key="3" onClick={() => dispatch(newMail(true))}>Create Mail</Button>,
                // <Button key="2">Contacts</Button>,
                // <Button key="1" >
                //     Settings
                // </Button>,
            ]}
      />
    )
}

export default Header;