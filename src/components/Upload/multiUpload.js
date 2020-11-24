import {ossServices} from 'services/oss';
import { Button, Image, Modal, Upload } from 'antd';
import React, { useMemo,useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

function MultiUpload(props){
    const {value,onChange,maxCount} = props;
    const fileList=useMemo(() => {
      if(value){
        let fileList=[];
        for(let i=0;i<value.length;i++){
          fileList.push({url:value[i]});
        }
        return fileList;
      }
    }, [value]);

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
    const [dialogImageUrl, setDialogImageUrl] = useState(null);
    const [useOss, setUseOss] = useState(true);
    const [ossUploadUrl, setossUploadUrl] = useState('http://macro-oss.oss-cn-shenzhen.aliyuncs.com');
    const [minioUploadUrl, setMinioUploadUrl] = useState('http://localhost:8080/minio/upload');

    //Methods
    const emitInput=(fileList)=>{
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
        onChange(value);
    }
    const handleRemove=(file,fileList)=>{
      onChange(fileList);
    }
    const handlePreview=(file)=>{
        setDialogVisible(true);
        setDialogImageUrl(file.url);
    }
    const beforeUpload=(file)=>{
        let _self = props;
        if(!useOss){
          return true;
        }
        return new Promise((resolve, reject) => {
          ossServices.policy().then(response => {
            _self.dataObj.policy = response.data.policy;
            _self.dataObj.signature = response.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
            _self.dataObj.key = response.data.dir + '/${filename}';
            _self.dataObj.dir = response.data.dir;
            _self.dataObj.host = response.data.host;
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
    }
    const handleUploadSuccess=(res,file)=>{
        showFileList = true;
        fileList.pop();
        let url = dataObj.host + '/' + dataObj.dir + '/' + file.name;
        if(!useOss){
          url = res.data.url;
        }
        fileList.push({name: file.name, url: url});
        emitInput(fileList[0].url);
    }
    return(
        <div>
          <Upload action={useOss?ossUploadUrl:minioUploadUrl} data={useOss?dataObj:null}
          listType="picture-card"  fileList={fileList} 
          beforeUpload={beforeUpload} onRemove={handleRemove} onPreview={handlePreview}
          onChange={handleUploadSuccess}>
              {fileList>=maxCount &&
                  <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
              }
          </Upload>
            <Modal visible={dialogVisible}>
                <Image width="100%" src={dialogImageUrl} alt=""/> 
            </Modal>
        </div>
        
    )
}
export default MultiUpload;