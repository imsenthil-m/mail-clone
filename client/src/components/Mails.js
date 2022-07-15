import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMails, selectMail } from "../actions/mails";
import {
  MailOutlined,
  RollbackOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  StarOutlined,
  StarFilled,
  UploadOutlined,
  CloudUploadOutlined
} from "@ant-design/icons";
import { updateMessageMetada } from "../actions/mail";


const Mails = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const mails = useSelector((state) => state.mailbox.mails) || [];
  const folderName = useSelector((state) => state.folders.activeFolder);
  const dispatch = useDispatch();
  useEffect(() => {
    if (folderName) dispatch(getMails(folderName));
  }, [folderName]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const mailSelect = (row) => {
    dispatch(selectMail(row["message-id"]));
  };
  const columns = [
    {
      title: folderName === 'Sent' ? "To": "From",
      dataIndex: folderName === 'Sent' ? "to":"from",
    },
    {
      title: "Subject",
      dataIndex: "subject"
    },
    {
      dataIndex: "actions",
      render: (text, record) => {

         
          if(folderName === 'Trash') {
            return null;
          }
          return (
         <div>
           {
            record.starred ? <StarFilled onClick={e =>{  e.stopPropagation();
              dispatch(updateMessageMetada(record['message-id'], folderName, {starred: !record.starred}, true))}}/> : 
              <StarOutlined onClick={e =>{ e.stopPropagation();
                dispatch(updateMessageMetada(record['message-id'], folderName, {starred: !record.starred}, true))}}/>
           }
           <DeleteOutlined onClick={e =>{ e.stopPropagation();
                dispatch(updateMessageMetada(record['message-id'], folderName, {delete: true}, true))}} />
         </div>
          )   
      },
    },
    
  ];
  
  return (
    <div>
      <Table
        key={folderName}
        id={folderName}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={mails}
        rowKey="message-id"
        onRow={(record, rowIndex) => {
          return {
            onClick: () => mailSelect(record) // click row
          };
        }}
        rowClassName={(record, index) => (record.readStatus  ? "read-mail" : "unread")}
      />
    </div>
  );
};

export default Mails;
