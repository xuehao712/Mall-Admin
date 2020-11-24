import {ossServices} from 'services/oss';
import { Button, Image, message, Modal, Upload } from 'antd';
import React, { useMemo,useState } from 'react';
import './index.scss';
import {
  UploadOutlined
} from '@ant-design/icons';


function EditorImage(props){
    //Data
    const [dataObj, setDataObj] = useState({
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',
    })
    const [dialogVisible, setDialogVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [listObj, setListObj] = useState({});

    //Methods
    const checkAllSuccess=()=>{
      return Object.keys(listObj).every(item => listObj[item].hasSuccess);
    }
    const handleSubmit=()=>{
      const arr = Object.keys(listObj).map(v => listObj[v])
      if (!checkAllSuccess()) {
        message("Please wait until all picture finish uploading, or there is a problem with network!");
        return;
      }
      console.log(arr);
      setListObj({});
      setFileList([]);
      setDialogVisible(false);
    }
    const handleSuccess=(response,file)=>{
      const uid = file.uid;
      const objKeyArr = Object.keys(listObj)
      let tempObject = listObj;
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (tempObject[objKeyArr[i]].uid === uid) {
          tempObject[objKeyArr[i]].url = tempObject.host + '/' + tempObject.dir + '/' + file.name;
          tempObject[objKeyArr[i]].hasSuccess = true;
          setListObj(tempObject);
          return;
        }
      }
    }
    const handleRemove=(file)=>{
      const uid = file.uid;
      const objKeyArr = Object.keys(listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return
        }
      }
    }
    const beforeUpload=(file)=>{
        let _self = props;
        const fileName = file.uid;
        return new Promise((resolve, reject) => {
          ossServices.policy().then(response => {
            _self.dataObj.policy = response.data.policy;
            _self.dataObj.signature = response.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
            _self.dataObj.key = response.data.dir + '/${filename}';
            _self.dataObj.dir = response.data.dir;
            _self.dataObj.host = response.data.host;
            _self.listObj[fileName] = {hasSuccess: false, uid: file.uid, width: this.width, height: this.height};
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
    }
    return(
        <div className="upload-container">
          <Button icon={<UploadOutlined />} size="small" style={{background:'#1890ff',borderColor:'#1890ff'}}
          onClick={()=>setDialogVisible(true)} type="primary">
            Upload
          </Button>
          <Modal visible={dialogVisible} onOk={handleSubmit} onCancel={()=>setDialogVisible(false)}>
            <Upload className="editor-slide-upload"
              action="http://macro-oss.oss-cn-shenzhen.aliyuncs.com" data={dataObj} multiple={true}
              listType="picture-card"  fileList={fileList}  showUploadList={true}
              beforeUpload={beforeUpload} onRemove={handleRemove} 
              onChange={handleSuccess}>
                <Button size="small" type="primary">Upload</Button>
            </Upload>
          </Modal>
        </div>
        
    )
}
export default EditorImage;