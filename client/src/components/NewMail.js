import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, AutoComplete, Input, Row, Col} from 'antd';
import {sendMail} from '../actions/mail';
import { getContacts } from '../actions/contacts';
const NewMail = props => {
    const [editorState, setEditorState] = useState();
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const toRef = useRef(null);
    const subjectRef = useRef(null);
    const [toReceipent, setToReceipent] = useState('');
    const contacts = useSelector(state => state.contacts.contacts);
    const [contactsSuggest, setContactsSuggest] = useState([]);
    useEffect(() => {
        dispatch(getContacts());
    }, [])
    const onSearch = searchString => {

        let filteredContactsEmail = [];
        contacts.map(contact => {
            if(contact.email.indexOf(searchString) !== -1)
            filteredContactsEmail.push({value:contact.email})
        });
        
        setContactsSuggest(filteredContactsEmail);
    }
    const onChange = (data) => {
        setToReceipent(data);
      };
    
    const submitMail = () => {
        const subject = subjectRef.current.input.value;
        const message = editorRef.current.value;
        if(toReceipent === "") {
            alert(" Please enter To address");
            return;
        }
        dispatch(sendMail(message, toReceipent, subject));
    }
    return (
        <div style={{marginLeft: "20px"}}>
            <Row>
                <Col span={2}>
                    To:
                </Col>
                <Col span={12}>
                     <AutoComplete ref={toRef} style={{ width: 500 }} options={contactsSuggest} onSearch={(str) => onSearch(str)} placeholder="Enter EmailId" onSelect={(data) => onChange(data)} onBlur={(event) => onChange(event.target.value)}/>
                </Col>
            </Row>
            <br/><br/><br/>
            <Row>
                <Col span={2}>
                    Subject:
                </Col>
                <Col span={12}>
                     <Input ref={subjectRef} placeholder='Enter Subject' style={{ width: 500 }} />
                </Col>
            </Row>
            <br/><br/><br/>
            <Row>
                <Col span={2}>
                    Message:
                </Col>
                <Col span={12}>
                    <textarea
                        style={{width: "70%", height: "400px"}}
                        ref={editorRef}
                        onChange = {(e) => {
                            setEditorState(editorState)}
                        }
                    />
                </Col>
            </Row>
            <Row style={{marginTop:"40px"}}>
                <Col span={4} >
                    <Button onClick={() => submitMail() } type="primary"> Send</Button>
                </Col>
            </Row>
            
        </div>
    )
    return null;
}
export default NewMail;